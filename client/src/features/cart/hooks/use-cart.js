import { useSale } from "../../../lib/providers/sale"
import { useNotify } from "../../../lib/hooks/useNotify"

import {
	findProduct,
	updateProduct,
	removeFromDiscount,
	findDiscountedProduct,
} from "../utils"

export const useCart = () => {
	const sale = useSale()
	const { notifySuccess, notifyInfo } = useNotify()

	const handleQuantityUpdate = (id, value) => {
		const product = findProduct(sale, id)
		if (!product) return

		const updatedQuantity = product.quantity + value
		if (updatedQuantity === 0) {
			removeProduct(id)
			return
		}

		updateProduct(sale, id, updatedQuantity)
		notifyInfo(`Product ${product.name} quantity updated`)
		sale.refocus()
	}

	const handleSelectedQuantityUpdate = (id, value) => {
		const product = sale.selectedProducts.find((p) => p.id === id)
		if (!product) return

		const updatedQuantity = product.quantity + value
		updateSelectedProduct(id, updatedQuantity)
		sale.refocus()
	}

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

	const updateSelectedProduct = (id, quantity) => {
		const updated = sale.selectedProducts.map((product) =>
			product.id.toString() === id.toString()
				? { ...product, quantity }
				: product
		)
		sale.updateSale({ selectedProducts: updated })
	}

	const removeProduct = (id) => {
		const product = findProduct(sale, id)
		if (!product) return

		const discountedProduct = findDiscountedProduct(sale, id)
		if (discountedProduct) {
			removeFromDiscount(sale, id)
		}

		const updatedProducts = sale.products.filter(
			(p) => p.id.toString() !== id.toString()
		)
		sale.updateSale({ products: updatedProducts })
		sale.refocus()
		notifySuccess(`Product ${product.name} removed from cart`)
	}

	const handleClearCart = () => {
		sale.resetSale()
		sale.refocus()
		notifySuccess("Cart cleared")
	}

	return {
		handleQuantityUpdate,
		handleSelectedQuantityUpdate,
		handleSelect,
		handleClearCart,
		removeProduct,
	}
}
