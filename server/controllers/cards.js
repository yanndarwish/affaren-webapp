const pool = require("../db")

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
	try {
		const response = await pool.query("SELECT * FROM cards")
		res.status(200).send(response.rows)
	} catch (err) {
		console.log(err)
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
