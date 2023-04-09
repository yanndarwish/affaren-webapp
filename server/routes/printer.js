const express = require("express")
const router = express.Router()
const auth = require("../middleware/auth")

const {
	printTicket,
	printCashTicket,
	openDrawer,
} = require("../controllers/printer")

router.post("/", auth, printTicket)

router.post("/cash", auth, printCashTicket)

router.post("/drawer", auth, openDrawer)

module.exports = router
