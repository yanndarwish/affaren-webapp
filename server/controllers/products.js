const pool = require("../db")

// create a product
const createProduct = async (req, res) => {
	try {
		const { name, price, quantity, taxe, barcode } = req.body

		if (!(name, price, quantity, taxe, barcode)) {
			res.status(400).send("All inputs are required")
		}

		const response = await pool.query(
			"INSERT INTO products (product_name, product_price, product_taxe, product_quantity, product_barcode) VALUES ($1, $2, $3, $4, $5) RETURNING *",
			[name, price, taxe, quantity, barcode]
		)
		res.status(200).send(response.rows)
		return
	} catch (err) {
		console.log(err)
		return
	}
}

// get all products
const getProducts = async (req, res) => {
	try {
		const response = await pool.query("SELECT * FROM products")
		res.status(200).send(response.rows)
	} catch (err) {
		console.log(err)
	}
}

// get a product by barcode
const getProduct = async (req, res) => {
	try {
		const barcode = req.params.barcode

		const response = await pool.query(
			"SELECT * FROM products WHERE product_barcode = $1",
			[barcode]
		)
		res.status(200).send(response.rows[0])
	} catch (err) {
		console.log(err)
	}
}

// update product quantity
const patchProduct = async (req, res) => {
	try {
		const id = req.params.id
		const { quantity } = req.body

		let qty = parseInt(quantity)

		const response = await pool.query(
			`UPDATE products SET product_quantity = product_quantity - $1 WHERE product_id = $2 RETURNING *`,
			[qty, id]
		)
		res.status(200).send(response.rows)
	} catch (err) {
		console.log(err)
	}
}

// update a product fully
const updateProduct = async (req, res) => {
	try {
		const { id } = req.params
		const { name, price, quantity, taxe, barcode } = req.body

		const response = await pool.query(
			"UPDATE products SET product_name = $1, product_price = $2, product_taxe = $3, product_quantity = $4, product_barcode = $5 WHERE product_id = $6 RETURNING *",
			[name, price, taxe, quantity, barcode, id]
		)
		res.status(200).send(response.rows)
	} catch (err) {
		console.log(err)
	}
}

// delete a product by id
const deleteProduct = async (req, res) => {
	try {
		const id = req.params.id

		const response = await pool.query(
			"DELETE FROM products WHERE product_id = $1",
			[id]
		)
		res.status(200).send(response.rows)
	} catch (err) {
		console.log(err)
	}
}

module.exports = {
	createProduct,
	getProducts,
	getProduct,
	patchProduct,
	updateProduct,
	deleteProduct,
}
