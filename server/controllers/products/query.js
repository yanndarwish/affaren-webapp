const queryCreateProduct = {
	id: "create_product",
	statement: "SELECT * FROM create_product($1, $2, $3, $4, $5, $6)",
}

const queryUpdateProductQuantity = {
	id: "update_product_quantity",
	statement: "SELECT * FROM update_product_quantity($1, $2)",
}

const queryUpdateProduct = {
	id: "update_product",
	statement: "SELECT * FROM update_product($1, $2, $3, $4, $5, $6, $7)",
}

const queryGetProducts = {
	id: "get_products",
	statement: "SELECT * FROM products",
}

module.exports = {
	queryCreateProduct,
	queryUpdateProductQuantity,
	queryGetProducts,
	queryUpdateProduct,
}
