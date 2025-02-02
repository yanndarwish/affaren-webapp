const pool = require("../../db")
const logger = require("../../logger")
const {
	queryGetAllCards,
	queryCreateCard,
	queryDeleteCard,
	queryUpdateCard,
} = require("./query")

const moduleName = "cards"

// create a card
const createCard = async (req, res) => {
	const fnLogger = logger.child({
		module: moduleName,
		method: queryCreateCard.id,
	})

	try {
		fnLogger.debug("creating card")
		const { id, name, price, taxe, type, category } = req.body

		if (!id || !name || !price || !taxe || !type || !category) {
			fnLogger.error("all fields are required")
			return res.status(400).send("All fields are required")
		}

		const response = await pool.query(queryCreateCard.statement, [
			id,
			name,
			price,
			taxe,
			type,
			category,
		])

		fnLogger.debug("card created")
		res.status(200).send(response.rows)
	} catch (err) {
		fnLogger.error(err, "error creating card")
		res.status(500).send("Internal server error")
	}
}

// update a card
const updateCard = async (req, res) => {
	const fnLogger = logger.child({
		module: moduleName,
		method: queryUpdateCard.id,
	})

	try {
		fnLogger.debug("updating card")

		const uuid = req.params.uuid
		const { id, name, price, taxe, type, category } = req.body

		if (!id || !name || !price || !taxe || !type || !category) {
			fnLogger.error("all fields are required")
			return res.status(400).send("All fields are required")
		}

		const response = await pool.query(queryUpdateCard.statement, [
			uuid,
			id,
			name,
			price,
			taxe,
			type,
			category,
		])

		fnLogger.debug("card updated")
		res.status(200).send(response.rows)
	} catch (err) {
		fnLogger.error(err, "error updating card")
		res.status(500).send("Internal server error")
	}
}

// get all cards
const getCards = async (_req, res) => {
	const fnLogger = logger.child({
		module: moduleName,
		method: queryGetAllCards.id,
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
	const fnLogger = logger.child({
		module: moduleName,
		method: queryDeleteCard.id,
	})

	try {
		fnLogger.debug("deleting card")
		const uuid = req.params.uuid

		if (!uuid) {
			fnLogger.error("card uuid is required")
			return res.status(400).send("Card UUID is required")
		}

		const response = await pool.query(queryDeleteCard.statement, [uuid])

		fnLogger.debug("card deleted")
		res.status(200).send(response.rows)
	} catch (err) {
		fnLogger.error(err, "error deleting card")
		res.status(500).send("Internal server error")
	}
}

module.exports = { createCard, getCards, deleteCard, updateCard }
