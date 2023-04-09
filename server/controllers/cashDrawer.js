const pool = require("../db")

// add today's cash value
const postCashValue = async (req, res) => {
	try {
		const { year, month, day, amount } = req.body

		const response = await pool.query(
			"INSERT INTO drawer (year, month, day, drawer) VALUES ($1, $2, $3, $4)",
			[year, month, day, amount]
		)

		res.status(200).send(response.rows)
	} catch (err) {
		console.log(err)
	}
}

// get today's cash value
const getCashValue = async (req, res) => {
	try {
		const { year, month, day } = req.params

		const response = await pool.query(
			"SELECT * FROM drawer WHERE year = $1 AND month = $2 AND day = $3",
			[year, month, day]
		)

		res.status(200).send(response.rows[0])
	} catch (err) {
		console.log(err)
	}
}

module.exports = { postCashValue, getCashValue }
