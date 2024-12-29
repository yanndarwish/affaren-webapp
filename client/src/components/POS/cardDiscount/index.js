import { useEffect, useState } from "react"
import { NumPad } from "../../common/NumPad/NumPad"
import { Button } from "../../ui/button"
import { CardTitle, CardHeader, CardFooter, CardContent } from "../../ui/card"

import { Tabs, TabsList, TabsTrigger } from "../../ui/tabs"
import { useSale } from "../../../lib/providers/sale"
import { Stack } from "@mui/material"
import { BadgePercent, Trash2Icon } from "lucide-react"
import {
	getTotalNewPrice,
	getTotalOriginalPrice,
	getTotalReduction,
} from "../../../lib/pos"
import { useNotify } from "../../../lib/hooks/useNotify"
import { Separator } from "../../ui/separator"
import { Checkbox } from "../../ui/checkbox"

const discountTypes = [
	{ name: "percent", label: "Percent", unit: "%" },
	{ name: "amount", label: "Amount", unit: "€" },
]

export const CardDiscount = () => {
	const { notifySuccess } = useNotify()
	const sale = useSale()
	const [discountType, setDiscountType] = useState(discountTypes[0].name)
	const [discountAmount, setDiscountAmount] = useState("0")
	const [selected, setSelected] = useState(sale?.discount || [])

	const handleRemoveDiscount = (id) => {
		const updatedList = sale.discount.filter((product) => product.id !== id)
		sale.updateSale({ discount: updatedList })
	}

	const handleTypeNumber = (value) => {
		if (discountType === "percent") {
			handleTypePercent(value)
		} else {
			handlePrice(value)
		}
	}

	const handlePrice = (value) => {
		const currentValue = discountAmount.replace(".", "") // Remove decimal point

		// Remove leading zeros and add new digit
		let newValue = (currentValue + value).replace(/^0+/, "")

		// Pad with zeros if less than 4 digits
		while (newValue.length < 4) {
			newValue = "0" + newValue
		}

		// Insert decimal point at correct position
		newValue = newValue.slice(0, -2) + "." + newValue.slice(-2)

		setDiscountAmount(newValue)
	}

	const handleTypePercent = (value) => {
		const newValue = (discountAmount + value).replace(/^0+/, "")

		setDiscountAmount(newValue)
	}

	const handleCorrect = () => {
		if (discountType === "percent") {
			handleCorrectPercent()
		} else {
			handleCorrectAmount()
		}
	}

	const handleCorrectPercent = () => {
		if (discountAmount === "0" || discountAmount.length === 1) {
			setDiscountAmount("0")
		} else {
			// Remove last digit
			let digits = discountAmount.slice(0, -1)

			setDiscountAmount(digits)
		}
	}

	const handleCorrectAmount = () => {
		if (discountAmount === "00.00") {
			setDiscountAmount("00.00")
		} else {
			// Remove the decimal point and get all digits
			let digits = discountAmount.replace(".", "")

			// Remove last digit
			digits = digits.slice(0, -1)

			// Pad with zeros at the start until we have 4 digits
			while (digits.length < 4) {
				digits = "0" + digits
			}

			// Insert decimal point at correct position
			const newPrice = digits.slice(0, -2) + "." + digits.slice(-2)

			setDiscountAmount(newPrice)
		}
	}

	const handleResetDiscount = () => {
		const resettedDiscount = sale.discount.map((target) => {
			return {
				...target,
				newPrice: target.originalPrice,
				reduction: 0,
				discountAmount: "0",
				discountType: "percent",
			}
		})

		const updatedProducts = sale.products.map((product) => {
			const found = resettedDiscount.find(
				(item) => item.productId === product.id
			)
			if (found) {
				return { ...product, price: found.originalPrice }
			} else {
				return product
			}
		})

		sale.updateSale({ products: updatedProducts, discount: [] })
		notifySuccess("Discount reset")
		sale.refocus()
	}

	const handlePercentDiscount = (discountPercent) => {
		const totalReductionToApply = sale.amount * (discountPercent / 100)
		let remainingReductionToApply = totalReductionToApply

		const newDiscount = sale.discount.map((target, i) => {
			const found = sale.products.find(
				(product) => product.id === target.productId
			)

			let reduction = (found.price * Number(discountPercent)) / 100
			reduction = Math.round(reduction * 100) / 100
			let newPrice = Math.ceil((found.price - reduction) * 100) / 100

			if (i === sale.discount.length - 1) {
				newPrice =
					found.price - Math.ceil(remainingReductionToApply * 100) / 100
				reduction = Math.ceil(remainingReductionToApply * 100) / 100
			} else {
				remainingReductionToApply -= reduction
			}

			let productDiscount = {
				productId: found.id,
				discountType: discountType,
				originalPrice: target.originalPrice,
				reduction: reduction,
				newPrice: newPrice,
				productName: found.name,
			}

			return productDiscount
		})

		const updatedProducts = sale.products.map((product) => {
			const found = newDiscount.find((item) => item.productId === product.id)
			if (found) {
				return { ...product, price: found.newPrice }
			} else {
				return product
			}
		})

		sale.updateSale({ products: updatedProducts, discount: newDiscount })
	}

	const handleAmountDiscount = () => {
		const percentDiscount = (discountAmount / sale.amount) * 100

		handlePercentDiscount(percentDiscount)
	}

	const handleApplyDiscount = () => {
		if (discountType === "percent") {
			handlePercentDiscount(discountAmount)
		} else {
			handleAmountDiscount()
		}

		sale.refocus()
	}

	const handleSelect = (product) => {
		if (selected.some((p) => p.productId === product.productId)) {
			setSelected(selected.filter((p) => p.productId !== product.productId))
		} else {
			setSelected([...selected, product])
		}
	}

	useEffect(() => {
		if (discountType === "percent") {
			setDiscountAmount("0")
		} else {
			setDiscountAmount("00.00")
		}
	}, [discountType])

	return (
		<>
			<CardHeader>
				<CardTitle>
					<Stack direction="row" className="justify-between">
						Discount
						{sale.discount.length > 0 && (
							<Button onClick={handleResetDiscount} variant="destructive">
								<Trash2Icon />
							</Button>
						)}
					</Stack>
				</CardTitle>
			</CardHeader>
			<CardContent className="space-y-2">
				{sale.discount.length === 0 ? (
					<div className="flex flex-col items-center justify-center space-y-8 h-[55vh]">
						<BadgePercent className="w-10 h-10 text-gray-200" />
						<p className="text-md text-gray-500">
							No products in discount list
						</p>
					</div>
				) : (
					<div className="space-y-4 ">
						{/* <div>
							<p>Original Price: {getTotalOriginalPrice(sale.discount)} €</p>
							<p>Reduction: {getTotalReduction(sale.discount)} €</p>
							<p>New Price: {getTotalNewPrice(sale.discount)} €</p>
						</div> */}

						<article className="space-y-2 flex flex-col border border-gray-200 rounded-md p-2 overflow-y-auto max-h-[20vh]">
							{sale.discount.map((product, i) => (
								<Stack key={product.productId} className="space-y-2">
									<Stack
										direction="row"
										alignItems="center"
										justifyContent="space-between"
									>
										<Checkbox
											checked={selected.some(
												(p) => p.productId === product.productId
											)}
											onCheckedChange={() => handleSelect(product)}
											aria-label="Select row"
										/>
										<div>{product.productName}</div>
										<Stack
											direction="row"
											justifyContent="flex-end"
											alignItems="center"
											className="space-x-2"
										>
											{/* <div className="text-gray-500">
												{product.originalPrice}
											</div>
											<div className="w-[50px] text-end">
												{product.newPrice} €
											</div> */}
											<Button
												size="icon"
												onClick={() => handleRemoveDiscount(product.id)}
											>
												<Trash2Icon />
											</Button>
										</Stack>
									</Stack>
									{i !== sale.discount.length - 1 && (
										<Separator className="p-0 m-0" />
									)}
								</Stack>
							))}
						</article>
						<Tabs
							defaultValue={discountType.name}
							onValueChange={setDiscountType}
							className="w-full h-full space-y-4"
						>
							<TabsList className="w-full p-0 bg-white">
								{discountTypes.map((tab) => (
									<TabsTrigger
										key={tab.name}
										value={tab.name}
										className={`w-full ${
											discountType === tab.name
												? "!bg-black !text-white"
												: "!bg-white"
										}`}
									>
										{tab.label}
									</TabsTrigger>
								))}
							</TabsList>
						</Tabs>
						<NumPad
							display
							unit={discountTypes.find((tab) => tab.name === discountType).unit}
							value={discountAmount}
							setValue={setDiscountAmount}
							onClick={handleTypeNumber}
							onCorrect={handleCorrect}
						/>
					</div>
				)}
			</CardContent>
			<CardFooter className="flex justify-center absolute bottom-0 w-full">
				<Button
					className="w-full"
					disabled={sale.discount.length === 0}
					onClick={handleApplyDiscount}
				>
					Apply Discount
				</Button>
			</CardFooter>
		</>
	)
}
