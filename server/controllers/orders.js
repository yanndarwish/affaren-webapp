const pool = require("../db")

// create an order
const createOrder = async (req, res) => {
	try {
		const {
			title,
			description,
			dueDate,
			dueTime,
			clientPhone,
			clientName,
			orderLocation,
		} = req.body

		const response = await pool.query(
			"INSERT INTO orders (order_title, order_description, order_status, order_due_date, order_due_time, order_client_phone, order_client_name, order_location) VALUES ($1, $2, 'todo', $3, $4, $5, $6, $7)",
			[
				title,
				description,
				dueDate,
				dueTime,
				clientPhone,
				clientName,
				orderLocation,
			]
		)
		res.status(200).send(response.rows)
	} catch (err) {
		console.log(err)
	}
}

// get all orders
const getOrders = async (req, res) => {
	try {
		const response = await pool.query("SELECT * FROM orders")
		res.status(200).send(response.rows)
	} catch (err) {
		console.log(err)
	}
}

// get a specific order by id
const getOrder = async (req, res) => {
	try {
		const { id } = req.params
		const response = await pool.query(
			"SELECT * FROM orders WHERE order_id = $1",
			[id]
		)
		res.status(200).send(response.rows[0])
	} catch (err) {
		console.log(err)
	}
}

// update an order
const updateOrder = async (req, res) => {
	try {
		const id = req.params.id

		const {
			title,
			description,
			status,
			dueDate,
			dueTime,
			clientPhone,
			clientName,
			orderLocation,
		} = req.body

		const response = await pool.query(
			"UPDATE orders SET order_title = $1, order_description = $2, order_status = $3, order_due_date = $4, order_due_time = $5, order_client_phone = $6, order_client_name = $7, order_location = $8 WHERE order_id = $9",
			[
				title,
				description,
				status,
				dueDate,
				dueTime,
				clientPhone,
				clientName,
				orderLocation,
				id,
			]
		)
		res.status(200).send(response.rows)
	} catch (err) {
		console.log(err)
	}
}

// delete an order by id
const deleteOrder = async (req, res) => {
	try {
		const { id } = req.params

		const response = await pool.query(
			"DELETE FROM orders WHERE order_id = $1",
			[id]
		)
		res.status(200).send(response.rows)
	} catch (err) {
		console.log(err)
	}
}

module.exports = { createOrder, getOrders, getOrder, updateOrder, deleteOrder }
