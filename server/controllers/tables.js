const pool = require("../db")

// create a table
const createTable = async (req, res) => {
	try {
		const { year, month, day, status, number } = req.body
		const response = await pool.query(
			"INSERT INTO tables (table_year, table_month, table_day, table_status, table_number) VALUES ($1, $2, $3, $4, $5)",
			[year, month, day, status, number]
		)
		res.status(200).send(response.rows)
	} catch (err) {
		console.log(err)
		res.status(400).send(err)
	}
}

// get all tables
const getTables = async (req, res) => {
	try {
		const response = await pool.query("SELECT * FROM tables")
		res.status(200).send(response.rows)
	} catch (err) {
		console.log(err)
		res.status(400).send(err)
	}
}

// get a specific table by id
const getTable = async (req, res) => {
	try {
		const { id } = req.params
		const response = await pool.query(
			"SELECT * FROM tables WHERE table_id = $1",
			[id]
		)
		res.status(200).send(response.rows[0])
	} catch (err) {
		console.log(err)
		res.status(400).send(err)
	}
}

// get active tables
const getActiveTables = async (req, res) => {
	try {
		const response = await pool.query(
			"SELECT * FROM tables WHERE table_status = 'active'"
		)
		res.status(200).send(response.rows)
	} catch (err) {
		console.log(err)
		res.status(400).send(err)
	}
}

// update a table
const updateTable = async (req, res) => {
	try {
		const { id } = req.params
		const { table_year, table_month, table_day, table_status, table_products } =
			req.body
		const response = await pool.query(
			"UPDATE tables SET table_year = $1, table_month = $2, table_day = $3, table_status = $4, table_products = $5 WHERE table_id = $6",
			[table_year, table_month, table_day, table_status, table_products, id]
		)
		res.status(200).send(response.rows)
	} catch (err) {
		console.log(err)
		res.status(400).send(err)
	}
}

// update a table status
const updateTableStatus = async (req, res) => {
	try {
		const { id } = req.params
		const { table_status, sale_id } = req.body

		let response
		if (!table_status) {
			response = await pool.query(
				"UPDATE tables SET sale_id = $1 WHERE table_id = $2",
				[sale_id, id]
			)
		} else if (!sale_id) {
			response = await pool.query(
				"UPDATE tables SET table_status = $1 WHERE table_id = $2",
				[table_status, id]
			)
		}
		res.status(200).send(response.rows)
	} catch (err) {
		console.log(err)
		res.status(400).send(err)
	}
}

// delete a table
const deleteTable = async (req, res) => {
	try {
		const { id } = req.params

		const response = await pool.query(
			"DELETE FROM tables WHERE table_id = $1",
			[id]
		)
		res.status(200).send(response.rows)
	} catch (err) {
		console.log(err)
	}
}

module.exports = {
	createTable,
	getTables,
	getTable,
	getActiveTables,
	updateTable,
	updateTableStatus,
	deleteTable,
}
