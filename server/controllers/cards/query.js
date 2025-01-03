export const queryGetAllCards = {
	id: "get_cards",
	statement: "SELECT * FROM get_cards()",
}

export const queryCreateCard = {
	id: "create_card",
	statement: "SELECT * FROM create_card($1, $2, $3, $4, $5)",
}

export const queryDeleteCard = {
	id: "delete_card",
	statement: "SELECT * FROM delete_card($1)",
}
