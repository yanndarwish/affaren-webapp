const queryGetAllProductCategories = {
	id: "get_product_categories",
	statement: "SELECT * FROM get_product_categories()",
}

const queryGetProductCategoryById = {
	id: "get_product_category_by_id",
	statement: "SELECT * FROM get_product_categories_by_id($1)",
}

const queryCreateProductCategory = {
	id: "create_product_category",
	statement: "SELECT * FROM create_product_category($1, $2)",
}

const queryDeleteProductCategory = {
	id: "delete_product_category",
	statement: "SELECT * FROM delete_product_category($1)",
}

const queryUpdateProductCategory = {
	id: "update_product_category",
	statement: "SELECT * FROM update_product_category($1, $2, $3)",
}

module.exports = {
	queryGetAllProductCategories,
	queryGetProductCategoryById,
	queryCreateProductCategory,
	queryDeleteProductCategory,
	queryUpdateProductCategory,
}
