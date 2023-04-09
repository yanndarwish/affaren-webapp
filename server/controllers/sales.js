const pool = require("../db")

// create a sale
const createSale = async (req, res) => {
	try {
		const { year, month, day, amount, paymentMethods, discount, taxes, user } =
			req.body

		const response = await pool.query(
			"INSERT INTO sales (sale_year, sale_month, sale_day, sale_amount, sale_payment_methods, sale_discount, sale_taxes, sale_user) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)",
			[year, month, day, amount, paymentMethods, discount, taxes, user]
		)
		res.status(200).send(response.rows)
	} catch (err) {
		console.log(err)
	}
}

// get all sales
const getSales = async (req, res) => {
	try {
		const response = await pool.query(
			"SELECT * FROM sales ORDER BY sale_id DESC"
		)
		res.status(200).send(response.rows)
	} catch (err) {
		console.log(err)
	}
}

// get a specific sale by id
const getSale = async (req, res) => {
	try {
		const id = req.params.id

		const response = await pool.query(
			"SELECT * FROM sales WHERE sale_id = $1",
			[id]
		)
		res.status(200).send(response.rows[0])
	} catch (err) {
		console.log(err)
	}
}

// update a sale
const updateSale = async (req, res) => {
	try {
		const id = req.params.id

		const { amount, paymentMethods, discount, taxes } = req.body

		const response = await pool.query(
			"UPDATE sales SET sale_amount = $1, sale_payment_methods = $2, sale_discount = $3, sale_taxes = $4 WHERE sale_id = $5",
			[amount, paymentMethods, discount, taxes, id]
		)
		res.status(200).send(response.rows)
	} catch (err) {
		console.log(err)
	}
}

// delete a sale
const deleteSale = async (req, res) => {
	try {
		const id = req.params.id

		const response = await pool.query("DELETE FROM sales WHERE sale_id = $1", [
			id,
		])
		res.status(200).send(response.rows)
	} catch (err) {
		console.log(err)
	}
}

// * SALES PRODUCTS * //
//  create a product in a sale
const createSaleProduct = async (req, res) => {
	try {
		const saleId = req.params.id

		const { products, year, month, day } = req.body
		let responses = []

		products.forEach(async (product) => {
			const { name, quantity, price, taxe, id } = product
			const response = await pool.query(
				"INSERT INTO sales_products (sale_id, product_id, product_name, product_quantity, product_price, product_taxe, sale_year, sale_month, sale_day ) VALUEs ($1, $2, $3, $4, $5, $6, $7, $8, $9)",
				[saleId, id, name, quantity, price, taxe, year, month, day]
			)

			responses.push(response.rows)
		})
		res.status(200).send(responses)
	} catch (err) {
		console.log(err)
	}
}

// get all products of a sale
const getSaleProducts = async (req, res) => {
	try {
		const id = req.params.id

		const response = await pool.query(
			"SELECT * FROM sales_products WHERE sale_id = $1",
			[id]
		)
		res.status(200).send(response.rows)
	} catch (err) {
		console.log(err)
	}
}

// delete all products from a sale
const deleteSaleProducts = async (req, res) => {
	try {
		const id = req.params.id

		const response = await pool.query(
			"DELETE FROM sales_products WHERE sale_id = $1",
			[id]
		)
		res.status(200).send(response.rows)
	} catch (err) {
		console.log(err)
	}
}

// get all products of the sales of a specific month
const getMonthSalesProducts = async (req, res) => {
	try {
		const { year, month } = req.params

		const response = await pool.query(
			"SELECT * FROM sales_products WHERE sale_year = $1 AND sale_month = $2",
			[year, month]
		)
		res.status(200).send(response.rows)
	} catch (err) {
		console.log(err)
	}
}

// get all products of the sales of a specific day
const getDaySalesProducts = async (req, res) => {
	try {
		const { year, month, day } = req.params

		const response = await pool.query(
			"SELECT * FROM sales_products WHERE sale_year = $1 AND sale_month = $2 AND sale_day = $3",
			[year, month, day]
		)
		res.status(200).send(response.rows)
	} catch (err) {
		console.log(err)
	}
}

module.exports = {
	createSale,
	getSales,
	getSale,
	updateSale,
	deleteSale,
	createSaleProduct,
	getSaleProducts,
	deleteSaleProducts,
	getMonthSalesProducts,
	getDaySalesProducts,
}
