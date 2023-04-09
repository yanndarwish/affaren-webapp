const pool = require("../db")

// create a card
const createCard = async (req, res) => {
	try {
		const { id, name, price, taxe } = req.body

		const response = await pool.query(
			"INSERT INTO cards (card_id, card_name, card_price, card_taxe) VALUES ($1, $2, $3, $4)",
			[id, name, price, taxe]
		)
		res.status(200).send(response.rows)
	} catch (err) {
		console.log(err)
	}
}

// get all cards
const getCards = async (req, res) => {
	try {
		const response = await pool.query("SELECT * FROM cards")
		res.status(200).send(response.rows)
	} catch (err) {
		console.log(err)
	}
}

// delete a card
const deleteCard = async (req, res) => {
	try {
		const id = req.params.id

		const response = await pool.query("DELETE FROM cards WHERE card_id = $1", [
			id,
		])
		res.status(200).send(response.rows)
	} catch (err) {
		console.log(err)
	}
}

module.exports = { createCard, getCards, deleteCard }
