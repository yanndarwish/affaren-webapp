const express = require("express")
const router = express.Router()
const auth = require("../middleware/auth")
const authorize = require("../middleware/authorize")

const {
	getUsers,
	updateUser,
	updateUserRole,
	deleteUser,
} = require("../controllers/users")

router.post("/", [auth, authorize], getUsers)

router.put("/", auth, updateUser)

router.patch("/", [auth, authorize], updateUserRole)

router.delete("/", [auth, authorize], deleteUser)

module.exports = router
