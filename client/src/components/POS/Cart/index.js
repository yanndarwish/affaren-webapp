import { useSale } from "../../../lib/providers/sale"
import AddIcon from "@mui/icons-material/Add"
import RemoveIcon from "@mui/icons-material/Remove"
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "../../ui/table"
import { Checkbox } from "../../ui/checkbox"
import { Card, CardContent, CardHeader, CardTitle } from "../../ui/card"
import { Button } from "../../ui/button"
import { Stack } from "@mui/material"
import {
	BadgePercent,
	BookmarkPlus,
	ShoppingCart,
	Trash2Icon,
	Undo2,
} from "lucide-react"
import { useNotify } from "../../../lib/hooks/useNotify"
import { useEffect, useState } from "react"
import { Modal, useModal } from "../../shared/modal"
import { NumPad } from "../../common/NumPad/NumPad"
import { Label } from "../../ui/label"
import { Input } from "../../ui/input"
import { useConfig } from "../../../lib/hooks/useConfig"
import { cn } from "../../../lib/utils"
import { Typography } from "../../ui/typography"

const COLUMNS = [
	{ label: "Name", field: "name", className: "" },
	{ label: "Qty", field: "quantity", className: "text-center" },
	{ label: "Price", field: "price", className: "text-right" },
]

const Cart = ({ onDiscount, onBookmark }) => {
	const sale = useSale()
	const { notifySuccess, notifyInfo } = useNotify()
	const modalRefund = useModal()
	const modalBookmark = useModal()
	// Product Management
	const handleQuantityUpdate = (id, value) => {
		const product = findProduct(id)
		if (!product) return

		const updatedQuantity = product.quantity + value
		if (updatedQuantity === 0) {
			removeProduct(id)
			return
		}

		const updatedPrice = calculateUpdatedPrice(product, updatedQuantity)
		updateProduct(id, updatedQuantity, updatedPrice)
		notifyInfo(`Product ${product.name} quantity updated`)
		refocusBarcode()
	}

	const handleSelectedQuantityUpdate = (id, value) => {
		const product = sale.selectedProducts.find((p) => p.id === id)
		if (!product) return

		const updatedQuantity = product.quantity + value
		updateSelectedProduct(id, updatedQuantity)
		refocusBarcode()
	}

	const updateSelectedProduct = (id, quantity) => {
		const updated = sale.selectedProducts.map((product) =>
			product.id.toString() === id.toString()
				? { ...product, quantity }
				: product
		)
		sale.updateSale({ selectedProducts: updated })
	}

	const removeProduct = (id) => {
		const product = findProduct(id)
		if (!product) return

		const discountedProduct = findDiscountedProduct(id)
		if (discountedProduct) {
			removeFromDiscount(id)
		}

		const updatedProducts = sale.products.filter(
			(p) => p.id.toString() !== id.toString()
		)
		sale.updateSale({ products: updatedProducts })
		refocusBarcode()
		notifySuccess(`Product ${product.name} removed from cart`)
	}

	// Discount Management
	const handleAddToDiscountList = (products) => {
		const alreadyInDiscountList = sale.discount.filter((p) =>
			products.some((product) => product.id === p.productId)
		)

		const newList = products.filter(
			(product) =>
				!alreadyInDiscountList.some((p) => p.productId === product.id)
		)

		const newDiscount = newList.map((product) => ({
			productId: product.id,
			productName: product.name,
			discountType: "percent",
			discountAmount: "0",
			originalPrice: product.price,
			reduction: 0,
			newPrice: product.price,
		}))

		sale.updateSale({ discount: [...sale.discount, ...newDiscount] })
		notifySuccess("Product added to discount list")
		onDiscount()
	}

	// Cart Actions
	const handleClearCart = () => {
		sale.resetSale()
		refocusBarcode()
		notifySuccess("Cart cleared")
	}

	const handleBookmark = () => {
		modalBookmark.openModal()
	}

	const handleSaveToBookmarks = (name, number) => {
		sale.saveToBookmarks({ name, number })
		notifyInfo("Sale saved to bookmarks")
		onBookmark()
		sale.resetSale()
	}

	const handleRefund = () => {
		modalRefund.openModal()
	}

	// Product Selection
	const handleSelect = (product) => {
		const isSelected = sale.selectedProducts.some((p) => p.id === product.id)

		if (isSelected) {
			// If already selected, remove it
			const updated = sale.selectedProducts.filter((p) => p.id !== product.id)
			sale.updateSale({ selectedProducts: updated })
		} else {
			// If not selected, add it with quantity 1
			const newProduct = { ...product, quantity: 1 }
			sale.updateSale({
				selectedProducts: [...sale.selectedProducts, newProduct],
			})
		}
	}

	// Helpers
	const findProduct = (id) =>
		sale.products.find((p) => p.id.toString() === id.toString())

	const calculateUpdatedPrice = (product, newQuantity) =>
		Math.floor((product.price / product.quantity) * newQuantity * 100) / 100

	const updateProduct = (id, quantity, price) => {
		const updated = sale.products.map((product) =>
			product.id.toString() === id.toString()
				? { ...product, quantity }
				: product
		)
		sale.updateSale({ products: updated })
	}

	const findDiscountedProduct = (id) => {
		return sale.discount.find((p) => p.productId.toString() === id.toString())
	}

	const removeFromDiscount = (id) => {
		const updatedDiscount = sale.discount.filter(
			(p) => p.productId.toString() !== id.toString()
		)
		sale.updateSale({ discount: updatedDiscount })
	}

	const refocusBarcode = () => {
		document.getElementById("barcode-input")?.focus()
	}

	// Effects
	useEffect(() => {
		const updatedSelectedProducts = sale.selectedProducts.filter(
			(product) => !sale.paidProducts.some((p) => p.id === product.id)
		)
		sale.updateSale({ selectedProducts: updatedSelectedProducts })
	}, [sale.paidProducts])

	return (
		<Card className="h-full flex flex-col relative">
			<CartHeader
				sale={sale}
				onRefund={handleRefund}
				onBookmark={handleBookmark}
				onDiscount={() => handleAddToDiscountList(sale.products)}
				onClear={handleClearCart}
			/>
			<CartContent
				sale={sale}
				onSelect={handleSelect}
				onQuantityUpdate={handleQuantityUpdate}
				onSelectedQuantityUpdate={handleSelectedQuantityUpdate}
				onRemove={removeProduct}
				onAddToDiscount={handleAddToDiscountList}
			/>
			<ModalRefund
				controller={modalRefund}
				onRefund={(value) => {
					const newProduct = {
						id: "refund",
						name: "Refund",
						quantity: 1,
						price: -value,
						taxe: 0,
					}
					sale.updateSale({
						products: [...sale.products, newProduct],
						isRefund: true,
					})
				}}
			/>
			<ModalBookmark
				controller={modalBookmark}
				onSubmit={handleSaveToBookmarks}
			/>
		</Card>
	)
}

// Subcomponents
const CartHeader = ({ sale, onRefund, onBookmark, onDiscount, onClear }) => {
	const { isActiveComponent } = useConfig()

	return (
		<CardHeader className="sticky top-0">
			<Stack direction="row" className="space-x-4 justify-between">
				<CardTitle>Shopping Cart</CardTitle>
				<Stack direction="row" spacing={2}>
					{isActiveComponent("pos", "refund") && (
						<Button
							onClick={onRefund}
							variant="outline"
							disabled={sale.products.length > 0}
						>
							<Undo2 />
						</Button>
					)}
					{isActiveComponent("pos", "bookmarks") && (
						<Button
							onClick={onBookmark}
							variant="outline"
							disabled={sale.products.length === 0}
						>
							<BookmarkPlus />
						</Button>
					)}
					{isActiveComponent("pos", "discount") && (
						<Button
							onClick={onDiscount}
							disabled={sale.products.length === 0}
							variant="outline"
						>
							<BadgePercent />
						</Button>
					)}
					<Button onClick={onClear} variant="destructive">
						<Trash2Icon />
					</Button>
				</Stack>
			</Stack>
		</CardHeader>
	)
}

const CartContent = ({
	sale,
	onSelect,
	onQuantityUpdate,
	onSelectedQuantityUpdate,
	onRemove,
	onAddToDiscount,
}) => (
	<CardContent className="h-full overflow-hidden">
		{sale.products.length === 0 ? (
			<EmptyCart />
		) : (
			<CartTable
				sale={sale}
				onSelect={onSelect}
				onQuantityUpdate={onQuantityUpdate}
				onSelectedQuantityUpdate={onSelectedQuantityUpdate}
				onRemove={onRemove}
				onAddToDiscount={onAddToDiscount}
			/>
		)}
	</CardContent>
)

const EmptyCart = () => (
	<div className="flex flex-col items-center justify-center space-y-8 h-full">
		<ShoppingCart className="w-10 h-10 text-gray-200" />
		<p className="text-md text-gray-500">No products in cart</p>
	</div>
)

const CartTable = ({
	sale,
	onSelect,
	onQuantityUpdate,
	onSelectedQuantityUpdate,
	onRemove,
	onAddToDiscount,
}) => (
	<div className="h-full flex flex-col relative">
		<Table>
			<TableHeader className="sticky top-0 bg-white z-10 border-b">
				<TableRow>
					<TableHead className="text-left">Select</TableHead>
					<TableHead className="text-left">N°</TableHead>
					{COLUMNS.map((column, index) => (
						<TableHead key={index} className={column.className}>
							{column.label}
						</TableHead>
					))}
					<TableHead className="text-right"></TableHead>
				</TableRow>
			</TableHeader>
			<TableBody className="h-full overflow-y-auto">
				{sale.products.map((product, i) => (
					<CartRow
						key={i}
						index={i}
						product={product}
						sale={sale}
						onSelect={onSelect}
						onQuantityUpdate={onQuantityUpdate}
						onSelectedQuantityUpdate={onSelectedQuantityUpdate}
						onRemove={onRemove}
						onAddToDiscount={onAddToDiscount}
					/>
				))}
			</TableBody>
		</Table>
	</div>
)

const CartRow = ({
	index,
	product,
	sale,
	onSelect = () => null,
	onQuantityUpdate = () => null,
	onSelectedQuantityUpdate = () => null,
	onRemove = () => null,
	onAddToDiscount = () => null,
}) => {
	const getProductInfo = (product, sale) => {
		const paidProduct = sale.paidProducts.find((p) => p.id === product.id)
		const selectedProduct = sale.selectedProducts.find(
			(p) => p.id === product.id
		)
		const isSelected = !!selectedProduct
		const discountedProduct = sale.discount.find(
			(p) => p.productId === product.id
		)

		const info = {
			isSelected,
			selectedProduct,
			discountedProduct,
			paidProduct,
			isFullyPaid: false,
			isPartiallyPaid: false,
			displayQuantity: product.quantity - (paidProduct?.quantity || 0),
			price: product.price * product.quantity,
			addIsDisabled: false,
			removeIsDisabled: false,
		}

		// Update paid status
		if (paidProduct) {
			info.isFullyPaid = paidProduct.quantity === product.quantity
			info.isPartiallyPaid = paidProduct.quantity < product.quantity
			info.displayQuantity = product.quantity - paidProduct.quantity
			info.price = product.price * info.displayQuantity
		}

		// Update quantity and price if selected
		if (selectedProduct) {
			// info.displayQuantity = selectedProduct.quantity
			info.price = selectedProduct.price * selectedProduct.quantity
		}

		// Update disabled states
		info.addIsDisabled =
			info.isFullyPaid || selectedProduct?.quantity === info.displayQuantity
		info.removeIsDisabled = info.isFullyPaid || selectedProduct?.quantity === 1

		return info
	}

	const {
		isSelected,
		isFullyPaid,
		price,
		addIsDisabled,
		removeIsDisabled,
		discountedProduct,
	} = getProductInfo(product, sale)

	const handleQuantityUpdate = (id, value) => {
		const handler = isSelected ? onSelectedQuantityUpdate : onQuantityUpdate
		handler(id, value)
	}

	return (
		<TableRow
			className={isFullyPaid ? "opacity-50 line-through bg-green-300/50" : ""}
		>
			<TableCell className="font-medium">
				<Checkbox
					checked={isSelected}
					disabled={isFullyPaid}
					onCheckedChange={() => onSelect(product)}
					aria-label="Select row"
				/>
			</TableCell>
			<TableCell className="font-medium">{index + 1}</TableCell>
			<TableCell>{product.name}</TableCell>
			<TableCell>
				<QuantityControl
					product={product}
					productInfo={getProductInfo(product, sale)}
					addIsDisabled={addIsDisabled}
					removeIsDisabled={removeIsDisabled}
					onUpdate={handleQuantityUpdate}
				/>
			</TableCell>
			<TableCell className="text-right">
				{discountedProduct ? (
					<Stack
						direction="row"
						spacing={2}
						alignItems="center"
						justifyContent="flex-end"
					>
						<Typography variant="muted" className="text-gray-400">
							{(
								Math.round(discountedProduct.originalPrice * 100) / 100
							).toFixed(2)}
						</Typography>
						<Typography variant="small" className="w-10">
							{(Math.round(discountedProduct.newPrice * 100) / 100).toFixed(2)}
						</Typography>
					</Stack>
				) : (
					<Typography variant="small" className="w-10">
						{(Math.round(price * 100) / 100).toFixed(2)}
					</Typography>
				)}
			</TableCell>
			<TableCell className="text-right">
				<ProductActions
					product={product}
					sale={sale}
					isSelected={isSelected}
					disabled={isFullyPaid}
					onRemove={onRemove}
					onAddToDiscount={onAddToDiscount}
				/>
			</TableCell>
		</TableRow>
	)
}

const QuantityControl = ({
	product,
	productInfo,
	onUpdate,
	addIsDisabled,
	removeIsDisabled,
}) => {
	return (
		<div className="flex items-center gap-8 justify-center">
			<RemoveIcon
				className={cn(
					"cursor-pointer",
					removeIsDisabled && "opacity-50 cursor-not-allowed"
				)}
				onClick={() => !removeIsDisabled && onUpdate(product.id, -1)}
			/>
			<span className="text-sm text-gray-500">
				{productInfo.isSelected
					? productInfo.selectedProduct?.quantity +
					  " / " +
					  productInfo.displayQuantity
					: productInfo.displayQuantity}
				{productInfo.isPartiallyPaid && (
					<span className="text-xs text-orange-500 ml-1">
						({productInfo.paidProduct.quantity} paid)
					</span>
				)}
			</span>
			<AddIcon
				className={cn(
					"cursor-pointer",
					addIsDisabled && "opacity-50 cursor-not-allowed"
				)}
				onClick={() => !addIsDisabled && onUpdate(product.id, 1)}
			/>
		</div>
	)
}

const ProductActions = ({ product, disabled, onRemove, onAddToDiscount }) => {
	const { isActiveComponent } = useConfig()

	return (
		<Stack direction="row" justifyContent="flex-end" spacing={2}>
			{isActiveComponent("pos", "discount") && (
				<Button
					variant="outline"
					size="icon"
					onClick={() => onAddToDiscount([product])}
					disabled={disabled}
				>
					<BadgePercent />
				</Button>
			)}
			<Button
				size="icon"
				onClick={() => onRemove(product.id)}
				disabled={disabled}
			>
				<Trash2Icon />
			</Button>
		</Stack>
	)
}

export default Cart

// Refund Modal Component
const ModalRefund = ({ controller, onRefund }) => {
	const { config } = useConfig()
	const [refundValue, setRefundValue] = useState("00.00")

	const handleChange = (value) => {
		let currentValue = refundValue.replace(".", "")

		let newValue = (currentValue + value).replace(/^0+/, "")

		while (newValue.length < 4) {
			newValue = "0" + newValue
		}

		newValue = newValue.slice(0, -2) + "." + newValue.slice(-2)

		setRefundValue(newValue)
	}

	const handleCorrect = () => {
		if (refundValue === "00.00") return

		let digits = refundValue.replace(".", "")
		digits = digits.slice(0, -1)
		while (digits.length < 4) {
			digits = "0" + digits
		}
		const newPrice = digits.slice(0, -2) + "." + digits.slice(-2)
		setRefundValue(newPrice)
	}

	const handleApplyRefund = () => {
		onRefund(refundValue)
		handleClose()
	}

	const handleClose = () => {
		controller.closeModal()
		setRefundValue("00.00")
	}

	return (
		<Modal open={controller.open} title="Refund" handleClose={handleClose}>
			<NumPad
				display
				value={refundValue}
				unit={<config.general.currency.symbol className="w-5 h-5" />}
				onClick={handleChange}
				onCorrect={handleCorrect}
			/>
			<Button onClick={handleApplyRefund}>Apply Refund</Button>
		</Modal>
	)
}

const ModalBookmark = ({ controller, onSubmit = () => null }) => {
	const sale = useSale()
	const [name, setName] = useState("")
	const [number, setNumber] = useState("")

	const handleSubmit = () => {
		onSubmit(name, number)
		handleClose()
	}

	const handleChange = (value) => {
		setNumber(number + value)
	}

	const handleCorrect = () => {
		if (number === "") return

		let digits = number.slice(0, -1)

		setNumber(digits)
	}

	const handleClose = () => {
		controller.closeModal()
		setName("")
		setNumber("")
	}

	useEffect(() => {
		setNumber(String(Object.keys(sale.bookmarks).length + 1))
	}, [sale.bookmarks])

	return (
		<Modal
			open={controller.open}
			title="Save to Bookmarks"
			handleClose={handleClose}
		>
			<div className="grid gap-2">
				<Label htmlFor="name">Name</Label>
				<Input
					id="name"
					type="text"
					value={name}
					onChange={(e) => setName(e.target.value)}
					placeholder="Bookmark Name"
					required
					autoFocus
				/>
			</div>
			<div className="grid gap-2">
				<Label htmlFor="number">Number</Label>
				<NumPad
					display
					value={number}
					onClick={handleChange}
					onCorrect={handleCorrect}
				/>
			</div>
			<Button onClick={handleSubmit}>Save</Button>
		</Modal>
	)
}
