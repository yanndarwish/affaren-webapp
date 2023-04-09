const express = require("express")
const router = express.Router()
const auth = require("../middleware/auth")

const { postCashValue, getCashValue } = require("../controllers/cashDrawer")

router.post("/", auth, postCashValue)

router.get("/:year/:month/:day", auth, getCashValue)

module.exports = router
