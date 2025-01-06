const pool = require("../db")

const roundUpToTwoDecimals = (number) => {
	return Math.ceil(number * 100) / 100
}

// create a sale
const createSale = async (req, res) => {
	try {
		const { year, month, day, amount, paymentMethods, discount, taxes, user } =
			req.body

		if (
			!year ||
			!month ||
			!day ||
			!amount ||
			!paymentMethods ||
			!discount ||
			!taxes ||
			!user
		) {
			return res.status(400).send("All fields are required")
		}

		const response = await pool.query(
			"INSERT INTO sales (sale_year, sale_month, sale_day, sale_amount, sale_payment_methods, sale_discount, sale_taxes, sale_user) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)",
			[year, month, day, amount, paymentMethods, discount, taxes, user]
		)
		res.status(200).send(response.rows)
	} catch (err) {
		console.log(err)
		res.status(500).send("Internal server error")
	}
}

// get all sales
const getSales = async (req, res) => {
	try {
		// pagination (default return all sales)
		const offset = Number(req.query.offset) || ""
		const limit = Number(req.query.limit) || ""

		const paymentMethod = req.query.paymentMethod || ""

		if (offset === undefined || limit === undefined) {
			return res.status(400).send("All fields are required")
		}

		const { year, month, day } = req.query

		if (!year || !month || !day) {
			return res.status(400).send("All fields are required")
		}

		const allSalesRequest = `SELECT * FROM sales WHERE sale_year = ${year} AND sale_month = ${month} AND sale_day = ${day} ORDER BY sale_id DESC`

		const allSalesResponse = await pool.query(allSalesRequest)

		const allSales = allSalesResponse.rows

		const totalCash = roundUpToTwoDecimals(
			allSales.reduce(
				(acc, sale) =>
					acc +
					(sale.sale_payment_methods.cash ? sale.sale_payment_methods.cash : 0),
				0
			)
		)
		const totalCard = roundUpToTwoDecimals(
			allSales.reduce(
				(acc, sale) =>
					acc +
					(sale.sale_payment_methods.card ? sale.sale_payment_methods.card : 0),
				0
			)
		)
		const totalCheck = roundUpToTwoDecimals(
			allSales.reduce(
				(acc, sale) =>
					acc +
					(sale.sale_payment_methods.check
						? sale.sale_payment_methods.check
						: 0),
				0
			)
		)

		const total = roundUpToTwoDecimals(totalCash + totalCard + totalCheck)

		const pageTotal = Math.ceil(allSales.length / limit)

		// build request string based on pagination if necessary
		let request = `SELECT * FROM sales WHERE sale_year = ${year} AND sale_month = ${month} AND sale_day = ${day} ORDER BY sale_id DESC ${
			limit ? "LIMIT " + limit : ""
		} ${offset ? "OFFSET " + offset : ""}`

		const response = await pool.query(request)

		let sales = response.rows

		if (paymentMethod) {
			sales = sales.filter((sale) => {
				return sale.sale_payment_methods[paymentMethod]
			})
		}

		const data = {
			data: sales,
			totalCash,
			totalCard,
			totalCheck,
			total,
			pageTotal,
		}

		res.status(200).send(data)
	} catch (err) {
		console.log(err)
		res.status(500).send(err)
	}
}

const getMonthSales = async (req, res) => {
	try {
		const { year, month } = req.query

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

// get a specific sale by id
const getSale = async (req, res) => {
	try {
		const id = req.params.id

		if (!id) {
			return res.status(400).send("All fields are required")
		}

		const response = await pool.query(
			"SELECT * FROM sales WHERE sale_id = $1",
			[id]
		)
		res.status(200).send(response.rows[0])
	} catch (err) {
		console.log(err)
		res.status(500).send(err)
	}
}

// update a sale
const updateSale = async (req, res) => {
	try {
		const id = req.params.id

		if (!id) {
			return res.status(400).send("All fields are required")
		}

		const { amount, paymentMethods, discount, taxes } = req.body

		if (!amount || !paymentMethods || !discount || !taxes) {
			return res.status(400).send("All fields are required")
		}

		const response = await pool.query(
			"UPDATE sales SET sale_amount = $1, sale_payment_methods = $2, sale_discount = $3, sale_taxes = $4 WHERE sale_id = $5",
			[amount, paymentMethods, discount, taxes, id]
		)
		res.status(200).send(response.rows)
	} catch (err) {
		console.log(err)
		res.status(500).send(err)
	}
}

// delete a sale
const deleteSale = async (req, res) => {
	try {
		const id = req.params.id

		if (!id) {
			return res.status(400).send("All fields are required")
		}

		const response = await pool.query("DELETE FROM sales WHERE sale_id = $1", [
			id,
		])

		await pool.query("DELETE FROM sales_products WHERE sale_id = $1", [id])

		res.status(200).send(response.rows)
	} catch (err) {
		console.log(err)
		res.status(500).send(err)
	}
}

// * SALES PRODUCTS * //
//  create a product in a sale
const createSaleProduct = async (req, res) => {
	try {
		const saleId = req.params.id

		const { products, year, month, day } = req.body

		if (!products || !year || !month || !day) {
			return res.status(400).send("All fields are required")
		}

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
		res.status(500).send(err)
	}
}

// get all products of a sale
const getSaleProducts = async (req, res) => {
	try {
		const id = req.params.id

		if (!id) {
			return res.status(400).send("All fields are required")
		}

		const response = await pool.query(
			"SELECT * FROM sales_products WHERE sale_id = $1",
			[id]
		)
		res.status(200).send(response.rows)
	} catch (err) {
		console.log(err)
		res.status(500).send(err)
	}
}

// delete all products from a sale
const deleteSaleProducts = async (req, res) => {
	try {
		const id = req.params.id

		if (!id) {
			return res.status(400).send("All fields are required")
		}

		const response = await pool.query(
			"DELETE FROM sales_products WHERE sale_id = $1",
			[id]
		)
		res.status(200).send(response.rows)
	} catch (err) {
		console.log(err)
		res.status(500).send(err)
	}
}

// get all products of the sales of a specific month
const getMonthSalesProducts = async (req, res) => {
	try {
		const { year, month } = req.params

		if (!year || !month) {
			return res.status(400).send("All fields are required")
		}

		const response = await pool.query(
			"SELECT * FROM sales_products WHERE sale_year = $1 AND sale_month = $2",
			[year, month]
		)
		res.status(200).send(response.rows)
	} catch (err) {
		console.log(err)
		res.status(500).send(err)
	}
}

// get all products of the sales of a specific day
const getDaySalesProducts = async (req, res) => {
	try {
		const { year, month, day } = req.params

		if (!year || !month || !day) {
			return res.status(400).send("All fields are required")
		}

		const response = await pool.query(
			"SELECT * FROM sales_products WHERE sale_year = $1 AND sale_month = $2 AND sale_day = $3",
			[year, month, day]
		)

		res.status(200).send(response.rows)
	} catch (err) {
		console.log(err)
		res.status(500).send(err)
	}
}

module.exports = {
	createSale,
	getSales,
	getMonthSales,
	getSale,
	updateSale,
	deleteSale,
	createSaleProduct,
	getSaleProducts,
	deleteSaleProducts,
	getMonthSalesProducts,
	getDaySalesProducts,
}
