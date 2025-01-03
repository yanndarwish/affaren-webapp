const pool = require("../../db")
const logger = require("../../logger")
const { queryAddTodayCash, queryGetTodayCash } = require("./query")

const moduleName = "today_cash"

// add today's cash value
const postCashValue = async (req, res) => {
	const fnLogger = logger.child({
		module: moduleName,
		method: queryAddTodayCash.id,
	})

	try {
		fnLogger.debug("adding today's cash")

		const { year, month, day, amount } = req.body

		if (!year || !month || !day || !amount) {
			fnLogger.error("All fields are required")
			return res.status(400).send("All fields are required")
		}

		const response = await pool.query(queryAddTodayCash.statement, [
			year,
			month,
			day,
			amount,
		])

		fnLogger.debug("today's cash added")
		res.status(200).send(response.rows)
	} catch (err) {
		fnLogger.error(err, "error adding today's cash")
		res.status(500).send("Internal server error")
	}
}

// get today's cash value
const getCashValue = async (req, res) => {
	const fnLogger = logger.child({
		module: moduleName,
		method: queryGetTodayCash.id,
	})

	try {
		fnLogger.debug("getting today's cash")
		const { year, month, day } = req.params

		if (!year || !month || !day) {
			fnLogger.error("All fields are required")
			return res.status(400).send("All fields are required")
		}

		const response = await pool.query(queryGetTodayCash.statement, [
			year,
			month,
			day,
		])

		if (response.rows.length === 0) {
			fnLogger.debug("no cash drawer found")
			res.status(200).send({ drawer: 0 })
		} else {
			fnLogger.debug("cash drawer found")
			res.status(200).send(response.rows[0])
		}
	} catch (err) {
		fnLogger.error(err, "error getting today's cash")
		res.status(500).send("Internal server error")
	}
}

module.exports = { postCashValue, getCashValue }
