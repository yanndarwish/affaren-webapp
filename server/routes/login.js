const express = require("express")
const pool = require("../db")
const router = express.Router()
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

router.post("/", async (req, res) => {
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

module.exports = router
