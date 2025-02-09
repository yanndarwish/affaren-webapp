import { useState } from "react"
import { v4 as uuidv4 } from "uuid"

import { useSale } from "../../../lib/providers/sale"
import { useNotify } from "../../../lib/hooks/useNotify"

import { categories, tabs } from "../utils"

export const useNoBarcode = () => {
	const sale = useSale()
	const { notifySuccess } = useNotify()

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
			let data = {
				...product,
				category:
					product.taxe !== 20 ? categories.SHOP_FOOD : categories.SHOP_DECO,
			}

			data.quantity = parseInt(product.quantity)
			data.price = parseFloat(product.price).toFixed(2)

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

	return {
		product,
		focusedInput,
		handleChangeTab,
		handleInputClick,
		addNoBarcodeProduct,
		handleSubtractQuantity,
		handleAddQuantity,
		handleTypeQuantity,
		handleTypePrice,
		handleTypeNumber,
		handleCorrectQuantity,
		handleCorrectPrice,
	}
}
