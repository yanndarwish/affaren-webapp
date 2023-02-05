require("dotenv").config()
const { users } = require("./db.json")
const bcrypt = require("bcryptjs")
const nodemailer = require("nodemailer")
const jwt = require("jsonwebtoken")
const auth = require("./middleware/auth")
const authorize = require("./middleware/authorize")
const express = require("express")
const cors = require("cors")
const pool = require("./db")
const path = require("path")
const { query, urlencoded } = require("express")
const app = express()
const ThermalPrinter = require("node-thermal-printer").printer
const PrinterTypes = require("node-thermal-printer").types

app.set("view engine", "ejs")
app.use(express.static(path.join(__dirname, "public")))
app.use(express.urlencoded({ extended: false }))

app.use(express.json())
app.use(cors())

// ******************************* //
// *********** LOGIN ************* //
// ******************************* //

// login
app.post("/login", async (req, res) => {
	try {
		// get user input
		const { email, password } = req.body
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
					expiresIn: "10h",
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
			res.status(200).json({ token: token })
			return
		}
		res.status(400).send("Invalid Credentials")
		return
	} catch (err) {
		console.log(err)
	}
})

// check password match
app.post("/password", async (req, res) => {
	try {
		// get user input
		const { email, password } = req.body
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
			res.status(200).json({ match: true })
			return
		}
		res.status(400).send("Invalid Credentials")
		return
	} catch (err) {
		console.log(err)
	}
})

// forgot password
app.post("/forgot-password", async (req, res) => {
	const { email } = req.body
	try {
		const response = await pool.query(
			"SELECT * FROM users WHERE user_email = $1",
			[email.toLowerCase()]
		)

		let oldUser = response.rows[0]

		if (!oldUser) {
			return res.send("User does not exist")
		}

		const secret = process.env.TOKEN_KEY + oldUser.user_password
		const token = jwt.sign(
			{ email: oldUser.user_email, id: oldUser.user_id },
			secret,
			{ expiresIn: "15m" }
		)
		const link = `http://localhost:4001/reset-password/${oldUser.user_id}/${token}`

		let transporter = nodemailer.createTransport({
			service: "gmail",
			auth: {
				user: "svenskaaffarenparis@gmail.com",
				pass: "ibiueuqqffrvaonf",
			},
		})

		let mailOptions = {
			from: "svenskaaffarenparis@gmail.com",
			to: email,
			subject: "Affaren password reset",
			text: `Here is your link to reset your password: ${link}`,
		}

		transporter.sendMail(mailOptions, function (error, info) {
			if (error) {
				console.log(error)
			} else {
				console.log("Email sent: " + info.response)
			}
		})

		res.status(200).send()
	} catch (err) {
		console.log(err)
	}
})

app.get("/reset-password/:id/:token", async (req, res) => {
	const { id, token } = req.params
	const response = await pool.query("SELECT * FROM users WHERE user_id = $1", [
		id,
	])

	let oldUser = response.rows[0]
	if (!oldUser) {
		return res.send("User does not exist")
	}
	const secret = process.env.TOKEN_KEY + oldUser.user_password
	try {
		const verify = jwt.verify(token, secret)
		res.render("index", { email: verify.email, status: "Not Verified" })
	} catch (error) {
		res.send("Not verified")
	}
})

app.post("/reset-password/:id/:token", async (req, res) => {
	const { id, token } = req.params
	const { password } = req.body

	const response = await pool.query("SELECT * FROM users WHERE user_id = $1", [
		id,
	])

	let oldUser = response.rows[0]
	if (!oldUser) {
		return res.send("User does not exist")
	}
	const secret = process.env.TOKEN_KEY + oldUser.user_password
	try {
		const verify = jwt.verify(token, secret)
		const encryptedPassword = await bcrypt.hash(password, 10)

		const response = await pool.query(
			"UPDATE users SET user_first_name = $2, user_last_name = $3, user_email = $4, user_password = $5, user_is_admin = $6 WHERE user_id = $1",
			[
				oldUser.user_id,
				oldUser.user_first_name,
				oldUser.user_last_name,
				oldUser.user_email,
				encryptedPassword,
				oldUser.user_is_admin,
			]
		)

		// res.json({ status: "Password Updated" })
		res.render("index", { email: verify.email, status: "verified" })
	} catch (error) {
		res.json({ status: "Something went wrong" })
	}
})

// ******************************* //
// *********** USERS ************* //
// ******************************* //

// Create a new user

app.post("/register", auth, async (req, res) => {
	try {
		// get user input
		const { firstName, lastName, role, email, password, isAdmin } = req.body

		// validate user input (make sure all data has been provided)
		if (!(email && password && firstName && lastName && role && isAdmin)) {
			res.status(400).send("All inputs are required")
		}

		// check if user already exists in db
		let foundUser = await pool.query(
			"SELECT * FROM users WHERE user_email = $1",
			[email.toLowerCase()]
		)

		foundUser = foundUser.rows[0]

		if (foundUser) {
			return res.status(409).send("User already exists. Please Login.")
		}

		// encrypt password
		const encryptedPassword = await bcrypt.hash(password, 10)

		// create user in our db
		const user = {
			firstName: firstName,
			lastName: lastName,
			role: role,
			email: email,
			password: encryptedPassword,
			isAdmin: isAdmin,
		}

		// create token
		const token = jwt.sign(
			{ user_id: user._id, email },
			process.env.TOKEN_KEY,
			{
				expiresIn: "10h",
			}
		)

		// save user token
		user.token = token

		const newUser = await pool.query(
			"INSERT INTO users(user_first_name,user_last_name, user_role,user_email,user_password,user_is_admin,user_token) VALUES ($1,$2,$3,$4,$5,$6, $7) RETURNING *",
			[firstName, lastName, role, email, encryptedPassword, isAdmin, token]
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
		const { id, isAdmin, role } = req.body
		if (!(id, isAdmin, role)) {
			res.status(400).send("All inputs are required")
		}

		const response = await pool.query(
			"UPDATE users SET user_is_admin = $1, user_role = $2 WHERE user_id = $3",
			[isAdmin, role, id]
		)
		res.status(200).send(response.rows)
	} catch (err) {
		console.log(err)
	}
})

app.delete("/users/:id", authorize, async (req, res) => {
	try {
		const { id } = req.params

		const response = await pool.query("DELETE FROM users WHERE user_id = $1", [
			id,
		])
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
		const nextSaleId = lastSale ? lastSale.sale_id + 1 : 1

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

// get all products of the sales of a specific month
app.get("/sales/:year/:month/products", auth, async (req, res) => {
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
})

// get all products of the sales of a specific day
app.get("/sales/:year/:month/:day/products", auth, async (req, res) => {
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
app.post("/orders", auth, async (req, res) => {
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

// ******************************* //
// *********** DISHES ************ //
// ******************************* //

// create a dish
app.post("/dishes", auth, async (req, res) => {
	try {
		const { dishName, dishIngredients, dishCategory, dishPrice, dishActive } =
			req.body
		const response = await pool.query(
			"INSERT INTO dishes (dish_name, dish_ingredients, dish_category, dish_price, dish_active, product_taxe) VALUES ($1, $2, $3, $4, $5, 5.5)",
			[dishName, dishIngredients, dishCategory, dishPrice, dishActive]
		)
		res.status(200).send(response.rows)
	} catch (err) {
		console.log(err)
		res.status(400).send(err)
	}
})

// update a dish
app.put("/dishes/:id", auth, async (req, res) => {
	try {
		const { id } = req.params
		const {
			dishName,
			dishIngredients,
			dishCategory,
			dishPrice,
			dishActive,
			dishTaxe,
		} = req.body
		const response = await pool.query(
			"UPDATE dishes SET dish_name = $1, dish_ingredients = $2, dish_category = $3, dish_price = $4, dish_active = $5, product_taxe = $6 WHERE dish_id = $7",
			[
				dishName,
				dishIngredients,
				dishCategory,
				dishPrice,
				dishActive,
				dishTaxe,
				id,
			]
		)
		res.status(200).send(response.rows)
	} catch (err) {
		console.log(err)
		res.status(400).send(err)
	}
})

// get all dishes
app.get("/dishes", auth, async (req, res) => {
	try {
		const response = await pool.query("SELECT * FROM dishes")
		res.status(200).send(response.rows)
	} catch (err) {
		console.log(err)
		res.status(400).send(err)
	}
})

// get a specific dish by id
app.get("/dishes/:id", auth, async (req, res) => {
	try {
		const { id } = req.params
		const response = await pool.query(
			"SELECT * FROM dishes WHERE dish_id = $1",
			[id]
		)
		res.status(200).send(response.rows[0])
	} catch (err) {
		console.log(err)
		res.status(400).send(err)
	}
})

// delete a dish by id
app.delete("/dishes/:id", auth, async (req, res) => {
	try {
		const { id } = req.params

		const response = await pool.query("DELETE FROM dishes WHERE dish_id = $1", [
			id,
		])
		res.status(200).send(response.rows)
	} catch (err) {
		console.log(err)
	}
})

// ******************************* //
// *********** Tables ************ //
// ******************************* //

// create a table
app.post("/tables", auth, async (req, res) => {
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
})

// update a table
app.put("/tables/:id", auth, async (req, res) => {
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
})

// update a table status
app.patch("/tables/:id", auth, async (req, res) => {
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
})

// get all tables
app.get("/tables", auth, async (req, res) => {
	try {
		const response = await pool.query("SELECT * FROM tables")
		res.status(200).send(response.rows)
	} catch (err) {
		console.log(err)
		res.status(400).send(err)
	}
})

// get all active tables
app.get("/tables/active", auth, async (req, res) => {
	try {
		const response = await pool.query(
			"SELECT * FROM tables WHERE table_status = 'active'"
		)
		res.status(200).send(response.rows)
	} catch (err) {
		console.log(err)
		res.status(400).send(err)
	}
})

// get a specific table by id
app.get("/tables/:id", auth, async (req, res) => {
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
})

// delete a table by id
app.delete("/tables/:id", auth, async (req, res) => {
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
})

// ******************************* //
// ******* TABLE PRODUCTS ******** //
// ******************************* //

// create a table_product
app.post("/table-products", auth, async (req, res) => {
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
})

// patch a table_product price
app.patch(
	"/table-products/:tableId/:personId/:dishId",
	auth,
	async (req, res) => {
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
)

// patch a product status
app.patch(
	"/table-products/status/:tableId/:personId/:dishId",
	auth,
	async (req, res) => {
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
)

// patch a table status
app.patch("/table-products/table-status/:tableId", auth, async (req, res) => {
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
})

// get all tables products
app.get("/table-products", auth, async (req, res) => {
	try {
		const response = await pool.query("SELECT * FROM table_products")
		res.status(200).send(response.rows)
	} catch (err) {
		console.log(err)
		res.status(400).send(err)
	}
})

// get all tables products
app.get("/table-products/active", auth, async (req, res) => {
	try {
		const response = await pool.query(
			"SELECT * FROM table_products WHERE table_status = 'active'"
		)
		res.status(200).send(response.rows)
	} catch (err) {
		console.log(err)
		res.status(400).send(err)
	}
})

// get all tables products from specific day
app.get("/table-products/:year/:month/:day", auth, async (req, res) => {
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
})

// get all paid tables products from specific month
app.get("/table-products/:year/:month", auth, async (req, res) => {
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
})

// get a products of a specific table
app.get("/table-products/:id", auth, async (req, res) => {
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
})

// delete all products from table
app.delete("/table-products/:tableId", auth, async (req, res) => {
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
})

// delete a table product by id
app.delete(
	"/table-products/:tableId/:personId/:dishId",
	auth,
	async (req, res) => {
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
)

// ******************************* //
// ********** PRINTER ************ //
// ******************************* //
app.post("/print", auth, async (req, res) => {
	const {
		amount,
		day,
		discount,
		id,
		month,
		paymentMethods,
		products,
		taxes,
		user,
		year,
	} = req.body

	try {
		let printer = new ThermalPrinter({
			type: PrinterTypes.EPSON,
			interface: "tcp://192.168.1.71",
		})

		let isConnected = await printer.isPrinterConnected()

		if (isConnected) {
			const getTime = () => {
				const date = new Date()
				const time = date.toLocaleTimeString()
				return time
			}

			let sortedTaxe = Object.keys(taxes).sort()
			let cashDiscount = discount.filter(
				(product) => product.discountType === "cash"
			)
			let percentDiscount = discount.filter(
				(product) => product.discountType === "percent"
			)
			let cashDiscountAmount = 0
			let percentDiscountAmount = 0
			cashDiscount.forEach((discount) => {
				cashDiscountAmount += discount.reduction
			})
			percentDiscount.forEach((discount) => {
				percentDiscountAmount += discount.reduction
			})

			printer.alignCenter()
			printer.println("Bienvenue chez")
			printer.setTextSize(2, 2)
			printer.println("AFFÄREN")
			printer.setTextNormal()
			printer.println("Välkommen")
			printer.newLine()
			printer.println("80 rue de Saussure 75017 Paris")
			printer.println("svenskaaffarenparis@gmail.com")
			printer.println("0142819175")
			printer.println("Mardi au samedi de 11h à 18h30")
			printer.println("Dimanche de 12h à 17h")
			printer.newLine()
			printer.println(`Date: ${day}/${month}/${year} ${getTime()}`)
			printer.println(`Caissier: ${user}`)
			printer.println("--------------------------------------")
			printer.alignCenter()
			printer.bold(true)
			printer.println(id)
			printer.newLine()
			printer.alignLeft()
			printer.bold(false)
			printer.tableCustom([
				{ text: "n°", align: "LEFT", width: 0.1, bold: true },
				{ text: "Produit", width: 0.5, bold: true },
				{ text: "Qté", width: 0.1, bold: true },
				{ text: "Prix", align: "RIGHT", width: 0.2, bold: true },
			])
			products.forEach((product, i) => {
				printer.tableCustom([
					{ text: `${i + 1}`, align: "LEFT", width: 0.1 },
					{
						text: `${
							product.name.length > 20
								? product.name.slice(0, 19) + "..."
								: product.name
						} `,
						width: 0.5,
					},
					{ text: `${product.quantity}`, width: 0.1 },
					{ text: `${product.price}`, align: "RIGHT", width: 0.2 },
				])
			})
			printer.newLine()
			printer.alignCenter()
			printer.println("--------------------------------------")
			printer.newLine()
			printer.alignLeft()
			printer.tableCustom([
				{ text: "", align: "LEFT", width: 0.1, bold: true },
				{
					text: `${
						products.length > 1
							? products.length + " articles"
							: products.length + " article"
					}`,
					width: 0.5,
					bold: true,
				},
			])
			printer.newLine()
			if (cashDiscount.length > 0) {
				printer.tableCustom([
					{ text: "", align: "LEFT", width: 0.2, bold: true },
					{
						text: `Réduction: ${cashDiscountAmount.toFixed(2)} €`,
						width: 0.5,
						bold: true,
					},
				])
			}
			if (percentDiscount.length > 0) {
				printer.tableCustom([
					{ text: "", align: "LEFT", width: 0.2, bold: true },
					{
						text: `Réduction: ${percentDiscountAmount.toFixed(2)} €`,
						width: 0.5,
						bold: true,
					},
				])
			}
			printer.setTextSize(1, 1)
			printer.tableCustom([
				{ text: "", align: "LEFT", width: 0.1, bold: true },
				{
					text: `TOTAL ${amount} €`,
					width: 0.5,
					bold: true,
				},
			])
			printer.setTextNormal()
			printer.tableCustom([
				{ text: "", align: "LEFT", width: 0.1, bold: true },
				{
					text: `Payé en ${
						Object.keys(paymentMethods).length > 1
							? Object.keys(paymentMethods)[0] === "cash"
								? "ESPÈCES: " +
								  paymentMethods[Object.keys(paymentMethods)[0]] +
								  " €"
								: Object.keys(paymentMethods)[0] === "card"
								? "CARTE: " +
								  paymentMethods[Object.keys(paymentMethods)[0]] +
								  " €"
								: "CHÈQUE: " +
								  paymentMethods[Object.keys(paymentMethods)[0]] +
								  " €"
							: Object.keys(paymentMethods)[0] === "cash"
							? "ESPÈCES"
							: Object.keys(paymentMethods)[0] === "card"
							? "CARTE"
							: "CHÈQUE"
					}`,
					width: 0.5,
					bold: true,
				},
			])
			if (Object.keys(paymentMethods).length > 1) {
				printer.tableCustom([
					{ text: "", align: "LEFT", width: 0.1, bold: true },
					{
						text: `Payé en ${
							Object.keys(paymentMethods)[1] === "cash"
								? "ESPÈCES: " +
								  paymentMethods[Object.keys(paymentMethods)[1]] +
								  " €"
								: Object.keys(paymentMethods)[1] === "card"
								? "CARTE: " +
								  paymentMethods[Object.keys(paymentMethods)[1]] +
								  " €"
								: "CHÈQUE: " +
								  paymentMethods[Object.keys(paymentMethods)[1]] +
								  " €"
						}`,
						width: 0.5,
						bold: true,
					},
				])
			}
			printer.alignCenter()
			printer.println("--------------------------------------")
			printer.newLine()
			printer.alignLeft()
			sortedTaxe.forEach((key) => {
				let prop
				if (key === "total1") {
					prop = "Total alimentation"
				} else if (key === "total2") {
					prop = "Total magazine"
				} else if (key === "total3") {
					prop = "Total décoration"
				}
				if (key === "ht1") {
					prop = "HT alimentation"
				} else if (key === "ht2") {
					prop = "HT magazine"
				} else if (key === "ht3") {
					prop = "HT décoration"
				}
				if (key === "tva1") {
					prop = "TVA 5.5%"
				} else if (key === "tva2") {
					prop = "TVA 2.1%"
				} else if (key === "tva3") {
					prop = "TVA 20%"
				}
				if (key === "totalTva") {
					prop = "Total TVA"
				}
				if (key === "totalHt") {
					prop = "Total HT"
				}
				printer.tableCustom([
					{ text: "", align: "LEFT", width: 0.1 },
					{ text: prop, width: 0.5 },
					{ text: taxes[key], width: 0.3 },
				])
			})
			printer.newLine()
			printer.alignCenter()
			printer.println("--------------------------------------")
			printer.println("Merci de votre visite et à bientôt !")
			printer.println("Hejdå !")

			printer.cut()

			try {
				let execute = printer.execute()
				console.error("Print done!")
				res.status(200).send()
			} catch (error) {
				console.log("Print failed:", error)
				res.status(400).send("Print failed")
			}
		} else {
			res.status(400).send("Printer not connected")
		}
	} catch (err) {
		console.log(err)
		res.status(400).send("Print failed")
	}
})

// open drawer
app.post("/drawer", auth, async (req, res) => {
	try {
		let printer = new ThermalPrinter({
			type: PrinterTypes.EPSON,
			interface: "tcp://192.168.1.71",
		})

		let isConnected = await printer.isPrinterConnected()

		if (isConnected) {
			printer.openCashDrawer()
			try {
				let execute = printer.execute()
				res.status(200).send()
			} catch (error) {
				console.log("Print failed:", error)
				res.status(400).send("Failed to open Drawer")
			}
		} else {
			console.log("Drawer not connected")
			res.status(400).send("Drawer not connected")
		}
	} catch (err) {
		console.log(err)
		res.status(400).send("Failed to open Drawer")
	}
})

module.exports = app
