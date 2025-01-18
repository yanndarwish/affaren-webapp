const pool = require("../db")

// get next sale id
const getNextId = async (_req, res) => {
	try {
		// Start a transaction
		const client = await pool.connect()
		try {
			await client.query("BEGIN")

			// Get the next value without committing it
			const response = await client.query(
				"SELECT nextval('sales_sale_id_seq') as next_id"
			)
			const nextId = response.rows[0].next_id

			// Rollback the transaction to avoid claiming the ID
			await client.query("ROLLBACK")
			client.release()

			res.status(200).send({ nextSaleId: nextId })
		} catch (err) {
			await client.query("ROLLBACK")
			client.release()
			throw err
		}
	} catch (err) {
		console.log(err)
		res.status(500).send(err)
	}
}

// get all sales for a specific month
const getMonthSales = async (req, res) => {
	try {
		const { year, month } = req.params

		if (!year || !month) {
			return res.status(400).send("All fields are required")
		}

		const response = await pool.query(
			"SELECT * FROM sales WHERE sale_year = $1 AND sale_month = $2",
			[year, month]
		)

		res.status(200).send(response.rows)
	} catch (err) {
		console.log(err)
		res.status(500).send(err)
	}
}

// get all sales for a specific day
const getDaySales = async (req, res) => {
	try {
		const { year, month, day } = req.params

		if (!year || !month || !day) {
			return res.status(400).send("All fields are required")
		}

		const response = await pool.query(
			"SELECT * FROM sales WHERE sale_year = $1 AND sale_month = $2 AND sale_day = $3",
			[year, month, day]
		)

		res.status(200).send(response.rows)
	} catch (err) {
		console.log(err)
		res.status(500).send(err)
	}
}

module.exports = { getNextId, getMonthSales, getDaySales }
