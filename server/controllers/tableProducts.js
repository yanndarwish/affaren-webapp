const pool = require("../db")

// POST

// create a table product
const createTableProduct = async (req, res) => {
	try {
		const { products } = req.body
		let responses = []

		products.forEach(async (product) => {
			const {
				table_id,
				table_person,
				dish_id,
				dish_name,
				dish_category,
				dish_quantity,
				dish_price,
				dish_taxe,
				table_year,
				table_month,
				table_day,
				dish_status,
				table_number,
			} = product
			const response = await pool.query(
				"INSERT INTO table_products (table_id, table_person, dish_id, dish_name, dish_category, dish_quantity, dish_price, dish_taxe, table_year, table_month, table_day, dish_status, table_status, table_number) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, 'active', $13)",
				[
					table_id,
					table_person,
					dish_id,
					dish_name,
					dish_category,
					dish_quantity,
					dish_price,
					dish_taxe,
					table_year,
					table_month,
					table_day,
					dish_status,
					table_number,
				]
			)

			responses.push(response.rows)
		})

		res.status(200).send(responses)
	} catch (err) {
		console.log(err)
		res.status(400).send(err)
	}
}

// GET

// get all tables products
const getAllTableProducts = async (req, res) => {
	try {
		const response = await pool.query("SELECT * FROM table_products")
		res.status(200).send(response.rows)
	} catch (err) {
		console.log(err)
		res.status(400).send(err)
	}
}

// get all products from specific table by id
const getTableProducts = async (req, res) => {
	try {
		const { id } = req.params
		const response = await pool.query(
			"SELECT * FROM table_products WHERE table_id = $1",
			[id]
		)
		res.status(200).send(response.rows)
	} catch (err) {
		console.log(err)
		res.status(400).send(err)
	}
}

// get all active table products
const getActiveTableProducts = async (req, res) => {
	try {
		const response = await pool.query(
			"SELECT * FROM table_products WHERE table_status = 'active'"
		)
		res.status(200).send(response.rows)
	} catch (err) {
		console.log(err)
		res.status(400).send(err)
	}
}

// get all table products from specific day
const getDayTableProducts = async (req, res) => {
	try {
		const { year, month, day } = req.params
		const response = await pool.query(
			"SELECT * FROM table_products WHERE table_year = $1 AND table_month = $2 AND table_day = $3",
			[year, month, day]
		)
		res.status(200).send(response.rows)
	} catch (err) {
		console.log(err)
		res.status(400).send(err)
	}
}

// get all paid table products from specific month
const getMonthTableProducts = async (req, res) => {
	try {
		const { year, month } = req.params
		const response = await pool.query(
			"SELECT * FROM table_products WHERE table_year = $1 AND table_month = $2 AND table_status = 'paid'",
			[year, month]
		)
		res.status(200).send(response.rows)
	} catch (err) {
		console.log(err)
		res.status(400).send(err)
	}
}

// UPDATE

// patch a table product price
const updateTableProductPrice = async (req, res) => {
	try {
		const { tableId, personId, dishId } = req.params

		const response = await pool.query(
			"UPDATE table_products SET dish_price = 0 WHERE table_id = $1 AND table_person = $2 AND dish_id = $3",
			[tableId, personId, dishId]
		)

		res.status(200).send(response)
	} catch (err) {
		console.log(err)
		res.status(400).send(err)
	}
}

// patch a product status
const updateTableProductStatus = async (req, res) => {
	try {
		const { tableId, personId, dishId } = req.params
		const { status } = req.body
		const response = await pool.query(
			"UPDATE table_products SET dish_status = $1 WHERE table_id = $2 AND table_person = $3 AND dish_id = $4",
			[status, tableId, personId, dishId]
		)

		res.status(200).send(response)
	} catch (err) {
		console.log(err)
		res.status(400).send(err)
	}
}

// patch a table status
const updateTableStatus = async (req, res) => {
	try {
		const { tableId } = req.params
		const response = await pool.query(
			"UPDATE table_products SET table_status = 'paid' WHERE table_id = $1",
			[tableId]
		)

		res.status(200).send(response)
	} catch (err) {
		console.log(err)
		res.status(400).send(err)
	}
}

// DELETE

// delete all products from a table
const deleteTableProducts = async (req, res) => {
	try {
		const { tableId } = req.params

		const response = await pool.query(
			"DELETE FROM table_products WHERE table_id = $1",
			[tableId]
		)
		res.status(200).send(response.rows)
	} catch (err) {
		console.log(err)
	}
}

// delete a table product by id
const deleteTableProduct = async (req, res) => {
	try {
		const { tableId, personId, dishId } = req.params

		const response = await pool.query(
			"DELETE FROM table_products WHERE table_id = $1 AND table_person = $2 AND dish_id = $3",
			[tableId, personId, dishId]
		)
		res.status(200).send(response.rows)
	} catch (err) {
		console.log(err)
	}
}

module.exports = {
	createTableProduct,
	getActiveTableProducts,
	getAllTableProducts,
	getDayTableProducts,
	getMonthTableProducts,
	getTableProducts,
	updateTableProductPrice,
	updateTableProductStatus,
	updateTableStatus,
	deleteTableProduct,
	deleteTableProducts,
}
