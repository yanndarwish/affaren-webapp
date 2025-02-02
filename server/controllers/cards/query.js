const queryGetAllCards = {
	id: "get_cards",
	statement: "SELECT * FROM get_cards()",
}

const queryCreateCard = {
	id: "create_card",
	statement: "SELECT * FROM create_card($1, $2, $3, $4, $5, $6)",
}

const queryUpdateCard = {
	id: "update_card",
	statement: "SELECT * FROM update_card($1, $2, $3, $4, $5, $6, $7)",
}

const queryDeleteCard = {
	id: "delete_card",
	statement: "SELECT * FROM delete_card($1)",
}

module.exports = {
	queryGetAllCards,
	queryCreateCard,
	queryDeleteCard,
	queryUpdateCard,
}
