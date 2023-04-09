const express = require("express")
const router = express.Router()
const auth = require("../middleware/auth")

const {
	createSale,
	getSales,
	getSale,
	updateSale,
	deleteSale,
	createSaleProduct,
	getSaleProducts,
	deleteSaleProducts,
	getMonthSalesProducts,
	getDaySalesProducts,
} = require("../controllers/sales")

router.post("/", auth, createSale)

router.get("/", auth, getSales)

router.get("/:id", auth, getSale)

router.put("/:id", auth, updateSale)

router.delete("/:id", auth, deleteSale)

// SALES PRODUCT

router.post("/:id/products", auth, createSaleProduct)

router.get("/:id/products", auth, getSaleProducts)

router.delete("/:id/products", auth, deleteSaleProducts)

router.get("/:year/:month/products", auth, getMonthSalesProducts)

router.get("/:year/:month/:day/products", auth, getDaySalesProducts)

module.exports = router
