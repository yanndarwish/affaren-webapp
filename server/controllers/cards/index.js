const pool = require("../../db")
const logger = require("../../logger")
const { queryGetAllCards } = require("./query")

// create a card
const createCard = async (req, res) => {
	try {
		const { id, name, price, taxe, type } = req.body

		if (!id || !name || !price || !taxe || !type) {
			return res.status(400).send("All fields are required")
		}

		const response = await pool.query(
			"INSERT INTO cards (card_id, card_name, card_price, card_taxe, card_type) VALUES ($1, $2, $3, $4, $5)",
			[id, name, price, taxe, type]
		)
		res.status(200).send(response.rows)
	} catch (err) {
		console.log(err)
		res.status(500).send("Internal server error")
	}
}

// get all cards
const getCards = async (_req, res) => {
	const fnLogger = logger.child({
		module: "cards",
		method: "getCards",
	})

	try {
		fnLogger.trace("getting cards")

		const response = await pool.query(queryGetAllCards.statement)

		fnLogger.trace("cards fetched")
		res.status(200).send(response.rows)
	} catch (err) {
		fnLogger.error(err, "error fetching cards")
		res.status(500).send("Internal server error")
	}
}

// delete a card
const deleteCard = async (req, res) => {
	try {
		const id = req.params.id

		if (!id) {
			return res.status(400).send("Card ID is required")
		}

		const response = await pool.query("DELETE FROM cards WHERE card_id = $1", [
			id,
		])
		res.status(200).send(response.rows)
	} catch (err) {
		console.log(err)
		res.status(500).send("Internal server error")
	}
}

module.exports = { createCard, getCards, deleteCard }
