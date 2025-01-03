export const queryCreateProduct = {
	id: "create_product",
	statement: "SELECT * FROM create_product($1, $2, $3, $4, $5)",
}

export const queryUpdateProductQuantity = {
	id: "update_product_quantity",
	statement: "SELECT * FROM update_product_quantity($1, $2)",
}

export const queryGetProducts = {
	id: "get_products",
	statement: "SELECT * FROM products",
}
