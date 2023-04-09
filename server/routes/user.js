const express = require("express")
const router = express.Router()
const auth = require("../middleware/auth")
const pool = require("../db")

router.get("/", auth, async (req, res) => {
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

module.exports = router
