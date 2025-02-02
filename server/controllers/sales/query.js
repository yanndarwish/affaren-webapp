const queryGetSoldProducts = {
	id: "get_sold_products",
	statement: "SELECT * FROM get_sold_products($1, $2, $3)",
}

module.exports = {
	queryGetSoldProducts,
}
