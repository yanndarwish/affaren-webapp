const pool = require("../db")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcryptjs")
const nodemailer = require("nodemailer")

// check password match
const checkPassword = async (req, res) => {
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
}

// forgot password
const SendRecoveryLink = async (req, res) => {
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
		const link = `http://localhost:4001/password/reset/${oldUser.user_id}/${token}`

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
}

// verify token match
const verifyToken = async (req, res) => {
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
}

// set new password
const setNewPassword = async (req, res) => {
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
}

module.exports = {
	checkPassword,
	SendRecoveryLink,
	verifyToken,
	setNewPassword,
}
