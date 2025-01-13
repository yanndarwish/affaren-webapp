export const getTablePrice = (table) => {
	return table.products.reduce(
		(acc, product) => acc + product.price * product.quantity,
		0
	)
}
