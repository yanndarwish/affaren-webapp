const express = require("express")
const pool = require("../db")
const router = express.Router()
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const auth = require("../middleware/auth")

router.post("/", auth, async (req,res) => {
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

module.exports = router