import { Button } from "../../ui/button"
import { CardContent, CardFooter, CardHeader, CardTitle } from "../../ui/card"
import { Input } from "../../ui/input"
import { Label } from "../../ui/label"

import { NumPad } from "../../common/NumPad/NumPad"
import { FormControl, Stack } from "@mui/material"
import BackspaceOutlinedIcon from "@mui/icons-material/BackspaceOutlined"
import { useState } from "react"

import { v4 as uuidv4 } from "uuid"
import { useSale } from "../../../lib/providers/sale"
import { Tabs, TabsList, TabsTrigger } from "../../ui/tabs"
import { useNotify } from "../../../lib/hooks/useNotify"

const tabs = [
	{ name: "Alimentation", label: "Food", value: 5.5 },
	{ name: "Magazine", label: "Press", value: 2.1 },
	{ name: "Décoration/Alcool", label: "Other", value: 20 },
]

export const CardNoBarcode = () => {
	const { notifySuccess } = useNotify()
	const sale = useSale()
	const [focusedInput, setFocusedInput] = useState("nb-price")
	const [product, setProduct] = useState({
		id: uuidv4(),
		taxe: 5.5,
		quantity: 1,
		price: "00.00",
		name: "Alimentation",
	})

	const handleChangeTab = (value) => {
		setProduct({
			...product,
			taxe: value,
			name: tabs.find((tab) => tab.value === value).name,
		})
	}

	const handleInputClick = (e) => {
		setFocusedInput(e.target.id)
	}

	const addNoBarcodeProduct = () => {
		if (product.quantity > 0 && product.price !== "00.00") {
			let data = { ...product }

			data.quantity = parseInt(product.quantity)
			data.price = parseFloat(product.price * product.quantity).toFixed(2)

			sale.updateSale({ products: [...sale.products, data] })
			reset()
			notifySuccess(`Product ${product.name} added to the cart`)
			sale.refocus()
		}
	}

	const reset = () => {
		setFocusedInput("nb-price")
		setProduct({
			id: uuidv4(),
			quantity: 1,
			price: "00.00",
			name: "Alimentation",
			taxe: 5.5,
		})
	}

	const handleTypeNumber = (value) => {
		if (focusedInput === "nb-price") {
			handlePrice(value)
		} else if (focusedInput === "nb-qty") {
			handleQuantity(value)
		}
	}

	const handlePrice = (value) => {
		const input = document.getElementById("nb-price")
		const currentValue = input.value.replace(".", "") // Remove decimal point

		// Remove leading zeros and add new digit
		let newValue = (currentValue + value).replace(/^0+/, "")

		// Pad with zeros if less than 4 digits
		while (newValue.length < 4) {
			newValue = "0" + newValue
		}

		// Insert decimal point at correct position
		newValue = newValue.slice(0, -2) + "." + newValue.slice(-2)

		setProduct({ ...product, price: newValue })
	}

	const handleQuantity = (value) => {
		if (product.quantity === 1) {
			setProduct({ ...product, quantity: value })
		} else {
			const qty = String(product.quantity)
			setProduct({ ...product, quantity: Number(qty + value) })
		}
	}

	const handleCorrectPrice = () => {
		if (product.price === "00.00") {
			setProduct({ ...product, price: "00.00" })
		} else {
			// Remove the decimal point and get all digits
			let digits = product.price.replace(".", "")

			// Remove last digit
			digits = digits.slice(0, -1)

			// Pad with zeros at the start until we have 4 digits
			while (digits.length < 4) {
				digits = "0" + digits
			}

			// Insert decimal point at correct position
			const newPrice = digits.slice(0, -2) + "." + digits.slice(-2)

			setProduct({ ...product, price: newPrice })
		}
	}

	const handleTypePrice = (e) => {
		//only the last digit
		const value = e.target.value.slice(-1)
		const input = document.getElementById("nb-price")
		const currentValue = input.value.replace(".", "").slice(0, -1) // Remove decimal point and the last digit

		// Remove leading zeros and add new digit
		let newValue = (currentValue + value).replace(/^0+/, "")

		// Pad with zeros if less than 4 digits
		while (newValue.length < 4) {
			newValue = "0" + newValue
		}

		// Insert decimal point at correct position
		newValue = newValue.slice(0, -2) + "." + newValue.slice(-2)

		setProduct({ ...product, price: newValue })
	}

	const handleCorrectQuantity = () => {
		if (product.quantity === 1) {
			setProduct({ ...product, quantity: 1 })
		} else {
			const qty = String(product.quantity)
			setProduct({ ...product, quantity: Number(qty.slice(0, -1)) })
		}
	}

	const handleAddQuantity = () => {
		setFocusedInput("nb-qty")
		setProduct({ ...product, quantity: Number(product.quantity) + 1 })
	}

	const handleSubtractQuantity = () => {
		setFocusedInput("nb-qty")
		if (product.quantity > 1) {
			setProduct({ ...product, quantity: Number(product.quantity) - 1 })
		}
	}

	const handleTypeQuantity = (e) => {
		const value = e.target.value
		setProduct({ ...product, quantity: Number(value) })
	}

	return (
		<>
			<div className="flex flex-col h-full p-4 space-y-2 justify-between overflow-hidden">
				<Stack className="overflow-hidden h-full space-y-4">
					<Tabs
						defaultValue={product.taxe}
						onValueChange={handleChangeTab}
						className="w-full"
					>
						<TabsList className="w-full p-0 bg-white">
							{tabs.map((tab) => (
								<TabsTrigger
									key={tab.value}
									value={tab.value}
									className={`w-full ${
										product.taxe === tab.value
											? "!bg-slate-900 !text-white"
											: "!bg-white"
									}`}
								>
									{tab.label}
								</TabsTrigger>
							))}
						</TabsList>
					</Tabs>
					<Stack className="space-y-4">
						<Stack className="space-y-1">
							<Label htmlFor="nb-qty">Quantity</Label>
							<div className="flex w-full max-w-sm items-center space-x-2">
								<Button
									onClick={handleSubtractQuantity}
									className="w-full"
									variant="outline"
								>
									-
								</Button>
								<Input
									id="nb-qty"
									onClick={handleInputClick}
									value={product.quantity}
									onChange={handleTypeQuantity}
									className={
										"text-center" +
										(focusedInput === "nb-qty" ? " border-2 border-black" : "")
									}
								/>
								<Button
									onClick={handleAddQuantity}
									className="w-full"
									variant="outline"
								>
									+
								</Button>
								<Button onClick={handleCorrectQuantity}>
									<BackspaceOutlinedIcon data-id="nb-qty" />
								</Button>
							</div>
						</Stack>
						<Stack className="space-y-1">
							<Label htmlFor="nb-price">Price</Label>
							<div className="flex w-full max-w-sm items-center space-x-2">
								<Input
									id="nb-price"
									onClick={handleInputClick}
									value={product.price}
									onChange={handleTypePrice}
									className={
										focusedInput === "nb-price" ? "border-2 border-black" : ""
									}
								/>
								<Button onClick={handleCorrectPrice}>
									<BackspaceOutlinedIcon data-id="nb-price" />
								</Button>
							</div>
						</Stack>
					</Stack>
				</Stack>
				<Stack className="flex flex-col w-full pt-2 space-y-8">
					<NumPad onClick={handleTypeNumber} />
					<Button onClick={addNoBarcodeProduct} className="w-full">
						Add product
					</Button>
				</Stack>
			</div>
		</>
	)
}
