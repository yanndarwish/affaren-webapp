const queryAddTodayCash = {
	id: "add_today_cash",
	statement: "SELECT * FROM add_today_cash($1, $2, $3, $4)",
}

const queryGetTodayCash = {
	id: "get_today_cash",
	statement: "SELECT * FROM get_today_cash($1, $2, $3)",
}

module.exports = {
	queryAddTodayCash,
	queryGetTodayCash,
}