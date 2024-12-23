const express = require("express")
const router = express.Router()
const auth = require("../middleware/auth")

const { getNextId, getMonthSales, getDaySales } = require("../controllers/salesPeriod")

router.get("/last", auth, getNextId)

router.get("/:year/:month", auth, getMonthSales)

router.get("/:year/:month/:day", auth, getDaySales)

module.exports = router
