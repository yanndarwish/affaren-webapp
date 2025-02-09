import { useEffect, useState } from "react"

import { useSale } from "../../../lib/providers/sale"
import { useConfig } from "../../../lib/hooks/useConfig"
import { useNotify } from "../../../lib/hooks/useNotify"

import { discountTypes } from "../utils"

export const useDiscount = () => {
	const sale = useSale()
	const { config } = useConfig()
	const { notifySuccess } = useNotify()

	const types = discountTypes(config.general.currency)

	const [discountType, setDiscountType] = useState(types[0].name)

	const [discountAmount, setDiscountAmount] = useState("0")
	const [selected, setSelected] = useState(sale?.discount || [])

	const handleRemoveDiscount = (id) => {
		const discountedProduct = sale.discount.find(
			(product) => product.productId.toString() === id.toString()
		)

		const updatedDiscount = sale.discount.filter(
			(product) => product.productId.toString() !== id.toString()
		)

		const updatedProducts = sale.products.map((product) => {
			if (product.id.toString() === id.toString()) {
				return {
					...product,
					price: discountedProduct.originalPrice,
				}
			} else {
				return product
			}
		})

		sale.updateSale({ discount: updatedDiscount, products: updatedProducts })
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
		// Convert to number and validate
		const percentValue = Number(discountPercent)
		if (percentValue < 0 || percentValue > 100) {
			console.error("Invalid discount percentage")
			return
		}

		// Calculate total selected products amount
		const selectedAmount = selected.reduce((sum, target) => {
			// First check in discount array
			const discountedProduct = sale.discount.find(
				(d) => d.productId === target.productId
			)
			if (discountedProduct) {
				return sum + discountedProduct.originalPrice
			} else {
				// If not found in discount array, check products array
				const product = sale.products.find((p) => p.id === target.productId)
				return sum + (product?.price || 0)
			}
		}, 0)

		const totalReductionToApply =
			Math.round(selectedAmount * (percentValue / 100) * 100) / 100
		let appliedReduction = 0

		const newDiscountedProducts = selected
			.map((target, i) => {
				// First check in discount array
				const discountedProduct = sale.discount.find(
					(d) => d.productId === target.productId
				)

				// Then check in products array
				const found = sale.products.find(
					(product) => product.id === target.productId
				)

				if (!found) return null

				// Use originalPrice from discount if exists, otherwise use product price
				const basePrice = discountedProduct
					? discountedProduct.originalPrice
					: found.price

				// Calculate proportional reduction for this item
				const itemProportion = basePrice / selectedAmount
				let reduction =
					i === selected.length - 1
						? Math.round((totalReductionToApply - appliedReduction) * 100) / 100
						: Math.round(totalReductionToApply * itemProportion * 100) / 100

				// Ensure we don't reduce more than the item's price
				reduction = Math.min(reduction, basePrice)

				if (i !== selected.length - 1) {
					appliedReduction += reduction
				}

				const newPrice = Math.max(
					0,
					Math.round((basePrice - reduction) * 100) / 100
				)

				return {
					productId: found.id,
					discountType: discountType,
					originalPrice: discountedProduct
						? discountedProduct.originalPrice
						: found.price,
					reduction,
					newPrice,
					productName: found.name,
				}
			})
			.filter(Boolean) // Remove null entries

		const updatedProducts = sale.products.map((product) => {
			const found = newDiscountedProducts.find(
				(item) => item.productId === product.id
			)
			return found ? { ...product, price: found.newPrice } : product
		})

		// check existing discount
		const newDiscount = [
			// Keep existing discounts that aren't in newDiscountedProducts
			...sale.discount.filter(
				(oldItem) =>
					!newDiscountedProducts.some(
						(newItem) => newItem.productId === oldItem.productId
					)
			),
			// Add new/updated discounts
			...newDiscountedProducts,
		]

		sale.updateSale({ products: updatedProducts, discount: newDiscount })
	}

	const handleAmountDiscount = () => {
		const totalAmount = selected.reduce((sum, target) => {
			// First check in discount array
			const discountedProduct = sale.discount.find(
				(d) => d.productId === target.productId
			)
			if (discountedProduct) {
				return sum + discountedProduct.originalPrice
			}

			// If not found in discount array, check products array
			const product = sale.products.find((p) => p.id === target.productId)
			return sum + (product?.price || 0)
		}, 0)

		const percentDiscount = (discountAmount / totalAmount) * 100

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

	useEffect(() => {
		setSelected(sale.discount)
	}, [sale.discount])

	return {
		discountAmount,
		selected,
		setDiscountAmount,
		discountType,
		setDiscountType,
		types,
		handleRemoveDiscount,
		handleTypeNumber,
		handleCorrect,
		handleResetDiscount,
		handleApplyDiscount,
		handleSelect,
	}
}
