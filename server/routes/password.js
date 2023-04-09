const express = require("express")
const router = express.Router()

const {
	checkPassword,
	SendRecoveryLink,
	verifyToken,
	setNewPassword,
} = require("../controllers/password")

router.post("/", checkPassword)

router.post("/forgot", SendRecoveryLink)

router.get("/reset/:id/:token", verifyToken)

router.post("/reset/:id/:token", setNewPassword)

module.exports = router
