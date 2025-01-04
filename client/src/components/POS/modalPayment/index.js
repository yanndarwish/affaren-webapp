import { Banknote, CreditCard, Tag } from "lucide-react"
import { useEffect, useState } from "react"
import { NumPad } from "../../common/NumPad/NumPad"
import { Modal } from "../../shared/modal"
import { Tabs, TabsList, TabsTrigger } from "../../ui/tabs"
import { Button } from "../../ui/button"
import { useSale } from "../../../lib/providers/sale"
import { useQuery } from "../../../lib/hooks/useQuery"
import {
	getDaySales,
	openDrawer,
	postSale,
	postSaleProducts,
	updateProduct,
} from "../../../lib/api"
import { useDailyTotal } from "../../../lib/providers/dailyTotal"
import { formatDailyTotals } from "../../../lib/sales"
import { Stack } from "@mui/material"
import { useNotify } from "../../../lib/hooks/useNotify"
import { SaleDetails } from "../../SALES/details"
import { useConfig } from "../../../lib/hooks/useConfig"

const PAYMENT_TABS = [
	{ name: "cash", label: "Cash", icon: Banknote },
	{ name: "card", label: "Card", icon: CreditCard },
	{ name: "check", label: "Check", icon: Tag },
]

export const ModalPayment = ({ controller }) => {
	const sale = useSale()
	const { notifySuccess, notifyError } = useNotify()
	const { setCash, setCredit, setCheck, setTotal } = useDailyTotal()
	const { config } = useConfig()

	// Local state
	const [paymentState, setPaymentState] = useState({
		paid: 0,
		amount: "00.00",
		selectedTab: config.general.paymentMethods.options.filter(
			(option) => option.active
		)[0].name,
		giveBack: 0,
		actualSale: {},
		paymentCompleted: false,
	})

	// Queries
	const queries = usePaymentQueries({
		sale,
		notifySuccess,
		notifyError,
		setCash,
		setCredit,
		setCheck,
		setTotal,
	})

	// Payment handlers
	const handlePrice = (value) => {
		let currentValue = paymentState.amount.replace(".", "")
		if (
			paymentState.amount ===
			(paymentState.actualSale.amount - paymentState.paid).toFixed(2)
		) {
			currentValue = "00.00".replace(".", "")
		}

		currentValue = currentValue.replace(".", "")
		let newValue = (currentValue + value).replace(/^0+/, "")
		while (newValue.length < 4) {
			newValue = "0" + newValue
		}
		newValue = newValue.slice(0, -2) + "." + newValue.slice(-2)

		setPaymentState((prev) => ({ ...prev, amount: newValue }))
	}

	const handleCorrectPrice = () => {
		if (paymentState.amount === "00.00") return

		let digits = paymentState.amount.replace(".", "")
		digits = digits.slice(0, -1)
		while (digits.length < 4) {
			digits = "0" + digits
		}
		const newPrice = digits.slice(0, -2) + "." + digits.slice(-2)

		setPaymentState((prev) => ({ ...prev, amount: newPrice }))
	}

	const handlePayment = () => {
		const paymentMethod = paymentState.selectedTab
		processPayment(paymentState.amount, paymentMethod)
	}

	// Payment processing
	const processPayment = (paymentAmount, paymentMethod) => {
		const remainingAmount = parseFloat(sale.amount - getPaidAmount(sale))
		const currentPayment = parseFloat(paymentAmount)

		if (currentPayment >= remainingAmount) {
			handleFullPayment(paymentMethod, remainingAmount, currentPayment)
		} else {
			handlePartialPayment(paymentMethod, currentPayment)
		}
	}

	const handleFullPayment = async (
		paymentMethod,
		remainingAmount,
		currentPayment
	) => {
		const updatedPaymentMethods = updatePaymentMethods(
			paymentMethod,
			remainingAmount
		)
		updatePaymentState(currentPayment, remainingAmount)

		const saleWithTimestamp = createSaleWithTimestamp(updatedPaymentMethods)
		await finalizeSale(saleWithTimestamp)
	}

	const handlePartialPayment = (paymentMethod, amount) => {
		const updatedPaymentMethods = updatePaymentMethods(paymentMethod, amount)
		sale.updateSale({ paymentMethods: updatedPaymentMethods })
		updatePaymentState(amount)
		notifySuccess("Partial payment confirmed")
	}

	// Helper functions
	const updatePaymentMethods = (method, amount) => {
		const currentAmount = sale.paymentMethods[method] || 0
		return {
			...sale.paymentMethods,
			[method]:
				Math.round((Number(currentAmount) + Number(amount)) * 100) / 100,
		}
	}

	const updatePaymentState = (currentPayment, remainingAmount = 0) => {
		setPaymentState((prev) => ({
			...prev,
			paid: (getPaidAmount(sale) + currentPayment).toFixed(2),
			amount: (sale.amount - getPaidAmount(sale) - currentPayment).toFixed(2),
			giveBack:
				paymentState.selectedTab === "cash"
					? Math.round((currentPayment - remainingAmount) * 100) / 100
					: 0,
		}))
	}

	const createSaleWithTimestamp = (paymentMethods) => ({
		...sale,
		year: new Date().getFullYear(),
		month: new Date().getMonth() + 1,
		day: new Date().getDate(),
		paymentMethods,
	})

	const finalizeSale = async (confirmedSale) => {
		try {
			await queries.postSale.send({
				sale: {
					...confirmedSale,
					products: productsToUpdate(confirmedSale),
					date: new Date().toISOString(),
				},
			})
			await updateInventory(confirmedSale)
			await queries.postSaleProducts.send({
				products: productsToUpdate(confirmedSale),
				year: confirmedSale.year,
				month: confirmedSale.month,
				day: confirmedSale.day,
				id: parseInt(confirmedSale.id),
			})

			setPaymentState((prev) => ({
				...prev,
				actualSale: {
					...confirmedSale,
					products: productsToUpdate(confirmedSale),
				},
				paymentCompleted: true,
			}))

			notifySuccess("Payment completed")
			handleSaleCompletion(confirmedSale)
			queries.openDrawer.send()
		} catch (error) {
			notifyError("An error occurred while finalizing the sale")
		}
	}

	const handleSaleCompletion = (confirmedSale) => {
		sale.updateSale({ paidProducts: newPaidProducts(confirmedSale) })

		if (sale.bookmarkId) {
			sale.removeBookmark(sale.bookmarkId)
		}

		sale.queryGetNextSaleId.send()
	}

	const updateInventory = async (confirmedSale) => {
		const physicalProducts = productsToUpdate(confirmedSale).filter(
			(product) => typeof product.id === "number"
		)

		for (const product of physicalProducts) {
			await queries.updateProduct.send({
				body: { quantity: product.quantity },
				id: product.id,
			})
		}
	}

	const productsToUpdate = (sale) => {
		// First determine which products to use as base
		const baseProducts =
			sale.selectedProducts.length > 0 ? sale.selectedProducts : sale.products

		// Filter out fully paid products and adjust quantities for partially paid ones
		return baseProducts.reduce((acc, product) => {
			// Find if product has been paid
			const paidProduct = sale.paidProducts.find((p) => p.id === product.id)
			const originalProduct = sale.products.find((p) => p.id === product.id)

			// Skip if product is fully paid
			if (paidProduct && paidProduct.quantity >= originalProduct.quantity) {
				return acc
			}

			// If product is partially paid, adjust quantity
			if (paidProduct) {
				const remainingQuantity =
					originalProduct.quantity - paidProduct.quantity
				// Only include if there's remaining quantity
				if (remainingQuantity > 0) {
					return [
						...acc,
						{
							...product,
							quantity: Math.min(product.quantity, remainingQuantity),
						},
					]
				}
				return acc
			}

			// If not paid at all, include as is
			return [...acc, product]
		}, [])
	}

	const newPaidProducts = (confirmedSale) => {
		const newProducts = productsToUpdate(confirmedSale)

		// Start with existing paid products
		const updatedPaidProducts = [...sale.paidProducts]

		newProducts.forEach((newProduct) => {
			// Find if product already exists in paid products
			const existingPaidProductIndex = updatedPaidProducts.findIndex(
				(p) => p.id === newProduct.id
			)

			if (existingPaidProductIndex !== -1) {
				// Update quantity if product exists
				updatedPaidProducts[existingPaidProductIndex] = {
					...updatedPaidProducts[existingPaidProductIndex],
					quantity:
						updatedPaidProducts[existingPaidProductIndex].quantity +
						newProduct.quantity,
				}
			} else {
				// Add new product if it doesn't exist
				updatedPaidProducts.push(newProduct)
			}
		})

		return updatedPaidProducts
	}

	// Modal handlers
	const handleModalClose = () => {
		if (paymentState.paymentCompleted) {
			resetModalStates()
			queries.getDaySales.send({
				year: new Date().getFullYear(),
				month: new Date().getMonth() + 1,
				day: new Date().getDate(),
			})
		}
		controller.closeModal()
	}

	const resetModalStates = () => {
		const activePaymentMethod = config.general.paymentMethods.options.filter(
			(option) => option.active
		)

		const hasCardPaymentMethod = activePaymentMethod.some(
			(option) => option.name === "card"
		)

		setPaymentState({
			paid: 0,
			amount: "00.00",
			selectedTab: hasCardPaymentMethod ? "card" : activePaymentMethod[0].name,
			giveBack: 0,
			actualSale: {},
			paymentCompleted: false,
		})
	}

	// Effects
	useEffect(() => {
		const activeSale = {
			...sale,
			products: productsToUpdate(sale),
		}

		const activePaymentMethod = config.general.paymentMethods.options.filter(
			(option) => option.active
		)

		const hasCashPaymentMethod = activePaymentMethod.some(
			(option) => option.name === "cash"
		)

		const hasCardPaymentMethod = activePaymentMethod.some(
			(option) => option.name === "card"
		)

		setPaymentState((prev) => ({
			...prev,
			actualSale: activeSale,
			amount: (sale.amount - getPaidAmount(sale)).toFixed(2),
			paid: getPaidAmount(sale),
			selectedTab:
				sale.isRefund && hasCashPaymentMethod
					? "cash"
					: hasCardPaymentMethod
					? "card"
					: activePaymentMethod[0].name,
		}))
	}, [controller.data, sale.isRefund])

	return (
		<PaymentModalContent
			state={paymentState}
			setState={setPaymentState}
			handlePrice={handlePrice}
			handleCorrectPrice={handleCorrectPrice}
			handlePayment={handlePayment}
			handleModalClose={handleModalClose}
			controller={controller}
		/>
	)
}

// Extracted components
const PaymentModalContent = ({
	state,
	setState,
	handlePrice,
	handleCorrectPrice,
	handlePayment,
	handleModalClose,
	controller,
}) => {
	const sale = useSale()

	return (
		<Modal
			open={controller.open}
			title="Payment"
			handleClose={handleModalClose}
			className="!w-[50vw]"
		>
			{state.paymentCompleted ? (
				<CompletedPaymentView
					giveBack={state.giveBack}
					actualSale={state.actualSale}
				/>
			) : (
				<ActivePaymentView
					sale={sale}
					state={state}
					setState={setState}
					handlePrice={handlePrice}
					handleCorrectPrice={handleCorrectPrice}
					handlePayment={handlePayment}
				/>
			)}
		</Modal>
	)
}

const CompletedPaymentView = ({ giveBack, actualSale }) => {
	return (
		<Stack direction="column" spacing={4}>
			{giveBack > 0 && (
				<h1 className="text-2xl font-extrabold text-center">
					Give back : {giveBack} €
				</h1>
			)}
			<SaleDetails sale={actualSale} />
		</Stack>
	)
}

const ActivePaymentView = ({
	sale,
	state,
	setState,
	handlePrice,
	handleCorrectPrice,
	handlePayment,
}) => (
	<>
		<h1 className="text-2xl font-extrabold text-center">
			Total : {sale.amount} €
		</h1>
		<Stack direction="column" spacing={4}>
			<PaymentTabs
				selectedTab={state.selectedTab}
				onTabChange={(tab) =>
					setState((prev) => ({ ...prev, selectedTab: tab }))
				}
			/>
			<PaymentDetails
				state={state}
				handlePrice={handlePrice}
				handleCorrectPrice={handleCorrectPrice}
			/>
			<PaymentButton
				selectedTab={state.selectedTab}
				onPayment={handlePayment}
			/>
		</Stack>
	</>
)

const PaymentTabs = ({ selectedTab, onTabChange }) => {
	const { config } = useConfig()
	const paymentMethods = config.general.paymentMethods.options.filter(
		(option) => option.active
	)

	return (
		<Tabs
			defaultValue={selectedTab}
			onValueChange={onTabChange}
			className="w-full h-full space-y-4"
		>
			<TabsList className="w-full">
				{paymentMethods.map((tab) => (
					<TabsTrigger key={tab.name} value={tab.name} className="w-full">
						{tab.label}
					</TabsTrigger>
				))}
			</TabsList>
		</Tabs>
	)
}

const PaymentDetails = ({ state, handlePrice, handleCorrectPrice }) => (
	<Stack className="w-full space-y-4">
		<Stack direction="row" className="w-full space-x-4" alignItems="center">
			<PaymentStat label="Paid" value={state.paid} />
			<PaymentStat
				label="Remaining"
				value={(state.actualSale.amount - state.paid).toFixed(2)}
			/>
		</Stack>
		<NumPad
			display
			value={state.amount}
			onClick={handlePrice}
			onCorrect={handleCorrectPrice}
			unit="€"
		/>
	</Stack>
)

const PaymentButton = ({ selectedTab, onPayment }) => {
	const { config } = useConfig()
	const tab = config.general.paymentMethods.options
		.filter((option) => option.active)
		.find((t) => t.name === selectedTab)
	const Icon = tab.icon

	return (
		<Button onClick={onPayment}>
			<span>Confirm {tab.label} Payment</span>
			<Icon />
		</Button>
	)
}

const PaymentStat = ({ label, value }) => (
	<article className="rounded-lg border border-gray-100 bg-white p-6 w-full">
		<div>
			<p className="text-sm text-gray-500 text-center">{label}</p>
			<p className="text-2xl font-medium text-gray-900 text-center">
				{value} €
			</p>
		</div>
	</article>
)

// Utility functions
const getPaidAmount = (sale) =>
	Math.round(
		Object.values(sale.paymentMethods).reduce((acc, curr) => acc + curr, 0) *
			100
	) / 100

// Custom hooks
const usePaymentQueries = ({
	sale,
	notifySuccess,
	notifyError,
	setCash,
	setCredit,
	setCheck,
	setTotal,
}) => {
	return {
		getDaySales: useQuery({
			queryFn: getDaySales,
			onSuccess: (data) => {
				const dailyTotals = formatDailyTotals(data)
				setCash(dailyTotals.cash)
				setCredit(dailyTotals.card)
				setCheck(dailyTotals.check)
				setTotal(dailyTotals.total)
			},
			onError: () =>
				notifyError("An error occurred while updating today's sales"),
		}),
		postSale: useQuery({
			queryFn: postSale,
			onError: () => notifyError("An error occurred while posting the sale"),
		}),
		postSaleProducts: useQuery({
			queryFn: postSaleProducts,
			onError: () =>
				notifyError("An error occurred while posting the sale products"),
		}),
		updateProduct: useQuery({
			queryFn: updateProduct,
			onError: () =>
				notifyError("An error occurred while updating the product"),
		}),
		openDrawer: useQuery({
			queryFn: openDrawer,
			onSuccess: () => notifySuccess("Drawer opened"),
			onError: () => notifyError("An error occurred while opening the drawer"),
		}),
	}
}
