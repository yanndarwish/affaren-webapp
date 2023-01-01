require("dotenv").config()
const { users, sales, days, products } = require("./db.json")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const auth = require("./middleware/auth")
const authorize = require("./middleware/authorize")
const express = require("express")
const cors = require("cors")
const pool = require("./db")
const { query } = require("express")

const app = express()

app.use(express.json())
app.use(cors())

// ******************************* //
// *********** LOGIN ************* //
// ******************************* //

app.post("/login", async (req, res) => {
	try {
		// get user input
		const { email, password } = req.body
		console.log(email)
		// validate user input
		if (!(email && password)) {
			res.status(400).send("All inputs are required")
		}

		// validate if user exists in db
		// const foundUser = users.find((user) => user.email === email.toLowerCase())
		let foundUser = await pool.query(
			"SELECT * FROM users WHERE user_email = $1",
			[email.toLowerCase()]
		)

		foundUser = foundUser.rows[0]

		if (
			foundUser &&
			(await bcrypt.compare(password, foundUser.user_password))
		) {
			// create token
			const token = jwt.sign(
				{ user_id: foundUser.user_id, email },
				process.env.TOKEN_KEY,
				{
					expiresIn: "2h",
				}
			)

			// update user's token
			const user = {
				...foundUser,
				user_token: token,
			}

			// save user token
			const response = await pool.query(
				"UPDATE users SET user_token = $1 WHERE user_id = $2",
				[token, user.user_id]
			)
			console.log(response)
			res.status(200).json({ token: token })
			return
		}
		res.status(400).send("Invalid Credentials")
		return
	} catch (err) {
		console.log(err)
	}
})

// ******************************* //
// *********** USERS ************* //
// ******************************* //

// Create a new user

app.post("/register", async (req, res) => {
	try {
		// get user input
		const { firstName, lastName, email, password, isAdmin } = req.body

		// validate user input (make sure all data has been provided)
		if (!(email && password && firstName && lastName && isAdmin)) {
			res.status(400).send("All inputs are required")
		}

		// check if user already exists in db
		const oldUser = users.find((user) => user.email === email)

		if (oldUser) {
			return res.status(409).send("User already exists. Please Login.")
		}

		// encrypt password
		const encryptedPassword = await bcrypt.hash(password, 10)

		// create user in our db
		const user = {
			firstName: firstName,
			lastName: lastName,
			email: email,
			password: encryptedPassword,
			isAdmin: isAdmin,
		}

		// create token
		const token = jwt.sign(
			{ user_id: user._id, email },
			process.env.TOKEN_KEY,
			{
				expiresIn: "2h",
			}
		)

		// save user token
		user.token = token

		const newUser = await pool.query(
			"INSERT INTO users(user_first_name,user_last_name,user_email,user_password,user_is_admin,user_token) VALUES ($1,$2,$3,$4,$5,$6) RETURNING *",
			[firstName, lastName, email, encryptedPassword, isAdmin, token]
		)
		res.status(200).json(newUser.rows[0])
	} catch (err) {
		console.log(err)
	}
})

// Get a specific user by id

app.get("/user", auth, async (req, res) => {
	const response = await pool.query("SELECT * FROM users WHERE user_id = $1", [
		req.user.user_id,
	])
	const data = response.rows[0]

	let clone = Object.assign({}, data)
	delete clone.user_password
	delete clone.user_token

	res.status(200).send({ user: clone })
	return
})

// As admin, Get all users

app.post("/users", authorize, async (req, res) => {
	const response = await pool.query("SELECT * FROM users")
	const data = response.rows

	let clone = Object.assign([], data)

	clone &&
		clone.forEach((item) => {
			delete item.user_password
			delete item.user_token
		})

	res.status(200).send({ users: clone })
	return
})

// Update a user by id

app.put("/users", auth, async (req, res) => {
	try {
		// get user input
		const {
			user_id,
			user_first_name,
			user_last_name,
			user_email,
			user_password,
			user_is_admin,
		} = req.body

		// validate user input (make sure all data has been provided)
		if (
			!(
				user_email &&
				user_password &&
				user_first_name &&
				user_last_name &&
				user_is_admin
			)
		) {
			res.status(400).send("All inputs are required")
		}

		// encrypt password
		const encryptedPassword = await bcrypt.hash(user_password, 10)

		const response = await pool.query(
			"UPDATE users SET user_first_name = $2, user_last_name = $3, user_email = $4, user_password = $5, user_is_admin = $6 WHERE user_id = $1",
			[
				user_id,
				user_first_name,
				user_last_name,
				user_email,
				encryptedPassword,
				user_is_admin,
			]
		)
		res.status(200).send(response.rows)
	} catch (err) {
		console.log(err)
	}
})

// as admin, update a users role
app.patch("/users", authorize, async (req, res) => {
	try {
		const { user_id, user_is_admin } = req.body
		if (!(user_id, user_is_admin)) {
			res.status(400).send("All inputs are required")
		}

		const response = await pool.query(
			"UPDATE users SET user_is_admin = $1 WHERE user_id = $2",
			[user_is_admin, user_id]
		)
		res.status(200).send(response.rows)
	} catch (err) {
		console.log(err)
	}
})

// ******************************* //
// ********* PRODUCTS ************ //
// ******************************* //

// create a product
app.post("/products", auth, async (req, res) => {
	try {
		const { name, price, quantity, taxe, barcode, alert } = req.body

		if (!(name, price, quantity, taxe, barcode, alert)) {
			res.status(400).send("All inputs are required")
		}

		const response = await pool.query(
			"INSERT INTO products (product_name, product_price, product_taxe, product_quantity, product_barcode, product_alert) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *",
			[name, price, taxe, quantity, barcode, alert]
		)
		res.status(200).send(response.rows)
	} catch (err) {
		console.log(err)
	}
})

// update a product fully
app.put("/products/:id", auth, async (req, res) => {
	try {
		const { id } = req.params
		const { name, price, quantity, taxe, barcode, alert } = req.body

		const response = await pool.query(
			"UPDATE products SET product_name = $1, product_price = $2, product_taxe = $3, product_quantity = $4, product_barcode = $5, product_alert =$6 WHERE product_id = $7 RETURNING *",
			[name, price, taxe, quantity, barcode, alert, id]
		)
		res.status(200).send(response.rows)
	} catch (err) {
		console.log(err)
	}
})

// update product quantity
app.patch("/products/:id", auth, async (req, res) => {
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
})

// get all products
app.get("/products", auth, async (req, res) => {
	try {
		const response = await pool.query("SELECT * FROM products")
		res.status(200).send(response.rows)
	} catch (err) {
		console.log(err)
	}
})

// get a product by barcode
app.get("/products/:barcode", auth, async (req, res) => {
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
})

// delete a product by id
app.delete("/products/:id", auth, async (req, res) => {
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
})

// ******************************* //
// ************ SALES ************ //
// ******************************* //

// create a sale
app.post("/sales", auth, async (req, res) => {
	try {
		console.log(req.body)
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
})

// get all sales
app.get("/sales", auth, async (req, res) => {
	try {
		const response = await pool.query(
			"SELECT * FROM sales ORDER BY sale_id DESC"
		)
		res.status(200).send(response.rows)
	} catch (err) {
		console.log(err)
	}
})

// get all sales for a specific month
app.get("/sales-period/:year/:month", auth, async (req, res) => {
	try {
		const { year, month } = req.params
		console.log("month only")
		const response = await pool.query(
			"SELECT * FROM sales WHERE sale_year = $1 AND sale_month = $2",
			[year, month]
		)

		res.status(200).send(response.rows)
	} catch (err) {
		console.log(err)
	}
})

// get all sales for a specific year
app.get("/sales-period/:year", auth, async (req, res) => {
	try {
		const { year } = req.params

		console.log("full year")
		const response = await pool.query(
			"SELECT * FROM sales WHERE sale_year = $1",
			[year]
		)

		res.status(200).send(response.rows)
	} catch (err) {
		console.log(err)
	}
})

// get a specific sale by id
app.get("/sales/:id", auth, async (req, res) => {
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
})

// get next sale id
app.get("/sales-last", auth, async (req, res) => {
	try {
		const response = await pool.query(
			"SELECT * FROM sales ORDER BY sale_id DESC LIMIT 1"
		)

		const lastSale = response.rows[0]
		const nextSaleId = lastSale.sale_id + 1

		res.status(200).send({ nextSaleId: nextSaleId })
	} catch (err) {
		console.log(err)
	}
})

// update a sale
app.put("/sales/:id", auth, async (req, res) => {
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
})

// delete a sale
app.delete("/sales/:id", auth, async (req, res) => {
	try {
		const id = req.params.id

		const response = await pool.query("DELETE FROM sales WHERE sale_id = $1", [
			id,
		])
		res.status(200).send(response.rows)
	} catch (err) {
		console.log(err)
	}
})

// ******************************* //
// ******* SALES_PRODUCTS ******** //
// ******************************* //

//  create a product in a sale
app.post("/sales/:id/products", auth, async (req, res) => {
	try {
		const saleId = req.params.id

		const products = req.body.products
		const year = req.body.year
		const month = req.body.month
		let responses = []

		products.forEach(async (product) => {
			const { name, quantity, price, taxe, id } = product
			const response = await pool.query(
				"INSERT INTO sales_products (sale_id, product_id, product_name, product_quantity, product_price, product_taxe, sale_year, sale_month ) VALUEs ($1, $2, $3, $4, $5, $6, $7, $8)",
				[saleId, id, name, quantity, price, taxe, year, month]
			)

			responses.push(response.rows)
		})
		res.status(200).send(responses)
	} catch (err) {
		console.log(err)
	}
})

// get all products of a sale
app.get("/sales/:id/products", auth, async (req, res) => {
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
})

// get all products of the sales of a specific period
app.get("/sales/:year/:month/products", auth, async (req, res) => {
	try {
		const {year, month} = req.params

		const response = await pool.query(
			"SELECT * FROM sales_products WHERE sale_year = $1 AND sale_month = $2",
			[year, month]
		)
		res.status(200).send(response.rows)
	} catch (err) {
		console.log(err)
	}
})

// delete all products from a sale
app.delete("/sales/:id/products", auth, async (req, res) => {
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
})

// ******************************* //
// ************ CARDS ************ //
// ******************************* //

// create a card
app.post("/cards", auth, async (req, res) => {
	try {
		const { id, name, price, taxe } = req.body

		const response = await pool.query(
			"INSERT INTO cards (card_id, card_name, card_price, card_taxe) VALUES ($1, $2, $3, $4)",
			[id, name, price, taxe]
		)
		res.status(200).send(response.rows)
	} catch (err) {
		console.log(err)
	}
})

// get all cards
app.get("/cards", auth, async (req, res) => {
	try {
		const response = await pool.query("SELECT * FROM cards")
		res.status(200).send(response.rows)
	} catch (err) {
		console.log(err)
	}
})

// delete a card
app.delete("/cards/:id", auth, async (req, res) => {
	try {
		const id = req.params.id

		const response = await pool.query("DELETE FROM cards WHERE card_id = $1", [
			id,
		])
		res.status(200).send(response.rows)
	} catch (err) {
		console.log(err)
	}
})

// ******************************* //
// ************ ORDERS *********** //
// ******************************* //

// create an order
app.post("/orders", async (req, res) => {
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
})

// get all orders
app.get("/orders", auth, async (req, res) => {
	try {
		const response = await pool.query("SELECT * FROM orders")
		res.status(200).send(response.rows)
	} catch (err) {
		console.log(err)
	}
})

// get a specific order by id
app.get("/orders/:id", auth, async (req, res) => {
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
})

// update an order
app.put("/orders/:id", auth, async (req, res) => {
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
})

// delete an order by id
app.delete("/orders/:id", auth, async (req, res) => {
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
})
module.exports = app
