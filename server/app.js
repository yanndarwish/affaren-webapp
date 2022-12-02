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
// *********** Users ************* //
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

// Get all users

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

		const response = await pool.query("UPDATE users SET user_is_admin = $1 WHERE user_id = $2", [user_is_admin, user_id])
		res.status(200).send(response.rows)
	} catch (err) {
		console.log(err)
	}
})

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
			// const response = await fetch(
			// 	`http://localhost:3000/users/${foundUser.user_id}`,
			// 	{
			// 		method: "PUT",
			// 		headers: {
			// 			"Content-Type": "application/json",
			// 		},
			// 		body: JSON.stringify(user),
			// 	}
			// )
			// const data = await response.json()
			// console.log(data)
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

module.exports = app
