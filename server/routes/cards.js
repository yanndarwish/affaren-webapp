const express = require("express")
const router = express.Router()
const auth = require("../middleware/auth")

const { createCard, getCards, deleteCard } = require("../controllers/cards")

router.post("/", auth, createCard)

router.get("/", auth, getCards)

router.delete("/:id", auth, deleteCard)

module.exports = router
