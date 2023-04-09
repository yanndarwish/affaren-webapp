const pool = require("../db")

// as Admin, get all users
const getUsers = async (req, res) => {
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
}

// update a user by id
const updateUser = async (req, res) => {
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
}

// as Admin, update user role
const updateUserRole = async (req, res) => {
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
}

// delete user by id
const deleteUser = async (req, res) => {
	try {
		const { id } = req.params

		const response = await pool.query("DELETE FROM users WHERE user_id = $1", [
			id,
		])
		res.status(200).send(response.rows)
	} catch (err) {
		console.log(err)
	}
}

module.exports = { getUsers, updateUser, updateUserRole, deleteUser }
