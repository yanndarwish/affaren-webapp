const express = require("express")
const router = express.Router()
const auth = require("../middleware/auth")

const {
	createEvent,
	getEvents,
	deleteEvent,
	updateEvent,
	createEventType,
	getEventTypes,
	removeEventType,
} = require("../controllers/events")

router.post("/types", auth, createEventType)

router.get("/types", auth, getEventTypes)

router.delete("/types/:id", auth, removeEventType)

router.post("/", auth, createEvent)

router.get("/", auth, getEvents)

router.put("/:id", auth, updateEvent)

router.delete("/:id", auth, deleteEvent)


module.exports = router
