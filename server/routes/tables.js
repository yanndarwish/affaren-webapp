const express = require("express")
const router = express.Router()
const auth = require("../middleware/auth")

const {
	createTable,
	getTables,
	getTable,
	getActiveTables,
	updateTable,
	updateTableStatus,
	deleteTable,
} = require("../controllers/tables")

router.post("/", auth, createTable)

router.get("/", auth, getTables)

router.get("/active", auth, getActiveTables)

router.get("/:id", auth, getTable)

router.put("/:id", auth, updateTable)

router.patch("/:id", auth, updateTableStatus)

router.delete("/:id", auth, deleteTable)

module.exports = router