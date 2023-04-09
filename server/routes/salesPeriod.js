const express = require("express")
const router = express.Router()
const auth = require("../middleware/auth")

const { getNextId, getMonthSales } = require("../controllers/salesPeriod")

router.get("/last", auth, getNextId)

router.get("/:year/:month", auth, getMonthSales)

module.exports = router
