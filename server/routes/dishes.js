const express = require("express")
const router = express.Router()
const auth = require("../middleware/auth")

const {
	createDish,
	getDishes,
	getDish,
	updateDish,
	deleteDish,
} = require("../controllers/dishes")

router.post("/", auth, createDish)

router.get("/", auth, getDishes)

router.get("/:id", auth, getDish)

router.put("/:id", auth, updateDish)

router.delete("/:id", auth, deleteDish)

module.exports = router
