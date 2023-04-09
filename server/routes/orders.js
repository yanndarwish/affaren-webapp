const express = require("express")
const router = express.Router()
const auth = require("../middleware/auth")

const {
	createOrder,
	getOrders,
	getOrder,
	updateOrder,
	deleteOrder,
} = require("../controllers/orders")

router.post("/", auth, createOrder)

router.get("/", auth, getOrders)

router.get("/:id", auth, getOrder)

router.put("/:id", auth, updateOrder)

router.delete("/:id", auth, deleteOrder)

module.exports = router