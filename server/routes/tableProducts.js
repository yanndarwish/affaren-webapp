const express = require("express")
const router = express.Router()
const auth = require("../middleware/auth")

const {
	createTableProduct,
	getActiveTableProducts,
	getAllTableProducts,
	getDayTableProducts,
	getMonthTableProducts,
	getTableProducts,
	updateTableProductPrice,
	updateTableProductStatus,
	updateTableStatus,
	deleteTableProduct,
	deleteTableProducts,
} = require("../controllers/tableProducts")

router.post("/", auth, createTableProduct)

router.get("/", auth, getAllTableProducts)

router.get("/active", auth, getActiveTableProducts)

router.get("/:year/:month/:day", auth, getDayTableProducts)

router.get("/:year/:month/", auth, getMonthTableProducts)

router.get("/:id", auth, getTableProducts)

router.patch("/:tableId/:personId/:dishId", auth, updateTableProductPrice)

router.patch(
	"/status/:tableId/:personId/:dishId",
	auth,
	updateTableProductStatus
)

router.patch("/table-status/:tableId", auth, updateTableStatus)

router.delete("/:tableId", auth, deleteTableProducts)

router.delete("/:tableId/:personId/:dishId", auth, deleteTableProduct)

module.exports = router
