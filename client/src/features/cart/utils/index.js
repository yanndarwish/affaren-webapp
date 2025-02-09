export const findProduct = (sale, id) =>
	sale.products.find((p) => p.id.toString() === id.toString())

export const updateProduct = (sale, id, quantity) => {
	const updated = sale.products.map((product) =>
		product.id.toString() === id.toString() ? { ...product, quantity } : product
	)
	sale.updateSale({ products: updated })
}

export const findDiscountedProduct = (sale, id) => {
	return sale.discount.find((p) => p.productId.toString() === id.toString())
}

export const removeFromDiscount = (sale, id) => {
	const updatedDiscount = sale.discount.filter(
		(p) => p.productId.toString() !== id.toString()
	)
	sale.updateSale({ discount: updatedDiscount })
}
