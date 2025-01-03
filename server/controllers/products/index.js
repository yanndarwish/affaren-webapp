const pool = require("../../db")
const logger = require("../../logger")
const { queryCreateProduct } = require("./query")

const moduleName = "products"

// create a product
const createProduct = async (req, res) => {
	const fnLogger = logger.child({
		module: moduleName,
		method: queryCreateProduct.id,
	})

	try {
		fnLogger.debug("creating product")
		const { name, price, quantity, taxe, barcode } = req.body

		if (!(name, price, quantity, taxe, barcode)) {
			fnLogger.error("All inputs are required")
			res.status(400).send("All inputs are required")
		}

		const response = await pool.query(queryCreateProduct.statement, [
			name,
			price,
			taxe,
			quantity,
			barcode,
		])

		fnLogger.debug("product created")
		res.status(200).send(response.rows)
	} catch (err) {
		fnLogger.error(err, "error creating product")
		res.status(500).send("Internal server error")
	}
}

// getproducts with all the query filters possible
const getProducts = async (req, res) => {
	try {
		// pagination (default return all products)
		const offset = Number(req.query.offset) || ""
		const limit = Number(req.query.limit) || ""

		if (offset === undefined || limit === undefined) {
			return res.status(400).send("All fields are required")
		}

		let pageTotal = 1

		let request = `SELECT * FROM products ORDER BY product_id DESC ${
			limit ? "LIMIT " + limit : ""
		} ${offset ? "OFFSET " + offset : ""}`

		// filter by name
		if (req.query.name) {
			const name = req.query.name.toLowerCase()
			const string = `%${name}%`
			request = `SELECT * FROM products WHERE LOWER(product_name) LIKE '${string}' ORDER BY product_id DESC ${
				limit ? "LIMIT " + limit : ""
			} ${offset ? "OFFSET " + offset : ""}`

			const allProductsRequest = `SELECT * FROM products WHERE LOWER(product_name) LIKE '${string}' ORDER BY product_id DESC`

			const allProductsResponse = await pool.query(allProductsRequest)

			pageTotal = Math.ceil(allProductsResponse.rows.length / limit)
		} else if (req.query.barcode) {
			// filter by barcode
			const barcode = req.query.barcode
			request = `SELECT * FROM products WHERE product_barcode = '${barcode}' ORDER BY product_id DESC ${
				limit ? "LIMIT " + limit : ""
			} ${offset ? "OFFSET " + offset : ""}`

			const allProductsRequest = `SELECT * FROM products WHERE product_barcode = '${barcode}' ORDER BY product_id DESC`

			const allProductsResponse = await pool.query(allProductsRequest)

			pageTotal = Math.ceil(allProductsResponse.rows.length / limit)
		} else {
			const allProductsRequest = `SELECT * FROM products ORDER BY product_id DESC`

			const allProductsResponse = await pool.query(allProductsRequest)

			pageTotal = Math.ceil(allProductsResponse.rows.length / limit)
		}

		const response = await pool.query(request)

		const data = {
			data: response.rows,
			pageTotal: pageTotal,
		}

		res.status(200).send(data)
	} catch (err) {
		console.log(err)
		res.status(500).send("Internal server error")
	}
}

// update product quantity
const patchProduct = async (req, res) => {
	try {
		const id = req.params.id
		const { quantity } = req.body

		if (!id || !quantity) {
			return res.status(400).send("All fields are required")
		}

		let qty = parseInt(quantity)

		const response = await pool.query(
			`UPDATE products SET product_quantity = product_quantity - $1 WHERE product_id = $2 RETURNING *`,
			[qty, id]
		)
		res.status(200).send(response.rows)
	} catch (err) {
		console.log(err)
		res.status(500).send("Internal server error")
	}
}

// update a product fully
const updateProduct = async (req, res) => {
	try {
		const { id } = req.params
		const { name, price, quantity, taxe, barcode } = req.body

		if (!id || !name || !price || !quantity || !taxe || !barcode) {
			return res.status(400).send("All fields are required")
		}

		const response = await pool.query(
			"UPDATE products SET product_name = $1, product_price = $2, product_taxe = $3, product_quantity = $4, product_barcode = $5 WHERE product_id = $6 RETURNING *",
			[name, price, taxe, quantity, barcode, id]
		)
		res.status(200).send(response.rows)
	} catch (err) {
		console.log(err)
		res.status(500).send("Internal server error")
	}
}

// delete a product by id
const deleteProduct = async (req, res) => {
	try {
		const id = req.params.id

		if (!id) {
			return res.status(400).send("Product ID is required")
		}

		const response = await pool.query(
			"DELETE FROM products WHERE product_id = $1",
			[id]
		)
		res.status(200).send(response.rows)
	} catch (err) {
		console.log(err)
		res.status(500).send("Internal server error")
	}
}

module.exports = {
	createProduct,
	getProducts,
	patchProduct,
	updateProduct,
	deleteProduct,
}
