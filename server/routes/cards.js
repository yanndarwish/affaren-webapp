const express = require("express")
const router = express.Router()
const auth = require("../middleware/auth")

const { createCard, getCards, deleteCard, updateCard } = require("../controllers/cards")

router.post("/", auth, createCard)

router.get("/", auth, getCards)

router.delete("/:uuid", auth, deleteCard)

router.put("/:uuid", auth, updateCard)

module.exports = router

