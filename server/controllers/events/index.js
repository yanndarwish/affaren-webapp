const pool = require("../../db")
const logger = require("../../logger")
const {
	queryGetAllEvents,
	queryCreateEvent,
	queryDeleteEvent,
	queryUpdateEvent,
	queryGetAllEventTypes,
	queryCreateEventType,
	queryDeleteEventType,
} = require("./query")

const moduleName = "events"

const createEventType = async (req, res) => {
	const fnLogger = logger.child({
		module: moduleName,
		method: queryCreateEventType.id,
	})

	try {
		fnLogger.debug("creating event type")
		const { name, color } = req.body

		if (!name || !color) {
			fnLogger.error("name and color are required")
			return res.status(400).send("Name and color are required")
		}

		const response = await pool.query(queryCreateEventType.statement, [
			name,
			color,
		])
		fnLogger.debug("event type created")
		res.status(200).send(response.rows)
	} catch (err) {
		fnLogger.error(err, "error creating event type")
		res.status(500).send("Internal server error")
	}
}

const getEventTypes = async (req, res) => {
	const fnLogger = logger.child({
		module: moduleName,
		method: queryGetAllEventTypes.id,
	})

	try {
		fnLogger.debug("getting event types")
		const response = await pool.query(queryGetAllEventTypes.statement)
		fnLogger.debug("event types fetched")
		res.status(200).send(response.rows)
	} catch (err) {
		fnLogger.error(err, "error fetching event types")
		res.status(500).send("Internal server error")
	}
}

const removeEventType = async (req, res) => {
	const fnLogger = logger.child({
		module: moduleName,
		method: queryDeleteEventType.id,
	})

	try {
		fnLogger.debug("removing event type")
		const { id } = req.params

		const response = await pool.query(queryDeleteEventType.statement, [id])
		const result = response.rows[0]

		if (!result.success) {
			fnLogger.warn(`Failed to delete event type: ${result.message}`)
			return res.status(400).json({
				success: false,
				message: result.message,
			})
		}

		fnLogger.debug("event type removed")
		res.status(200).json({
			success: true,
			message: result.message,
		})
	} catch (err) {
		fnLogger.error(err, "error removing event type")
		res.status(500).send("Internal server error")
	}
}

// create an event
const createEvent = async (req, res) => {
	const fnLogger = logger.child({
		module: moduleName,
		method: queryCreateEvent.id,
	})

	try {
		fnLogger.debug("creating event")
		const { title, start, end, description, type } = req.body

		if (!title || !start || !end || !description || !type) {
			fnLogger.error("all fields are required")
			return res.status(400).send("All fields are required")
		}

		const response = await pool.query(queryCreateEvent.statement, [
			title,
			start,
			end,
			description,
			type,
		])

		fnLogger.debug("event created")
		res.status(200).send(response.rows)
	} catch (err) {
		fnLogger.error(err, "error creating event")
		res.status(500).send("Internal server error")
	}
}

const getEvents = async (req, res) => {
	const fnLogger = logger.child({
		module: moduleName,
		method: queryGetAllEvents.id,
	})

	try {
		const { start_date, end_date } = req.query

		// Validate date parameters
		if (!start_date || !end_date) {
			fnLogger.warn("missing date parameters")
			return res.status(400).json({
				success: false,
				message: "start_date and end_date are required query parameters",
			})
		}

		fnLogger.debug({ start_date, end_date }, "getting events")
		const response = await pool.query(queryGetAllEvents.statement, [
			start_date,
			end_date,
		])

		fnLogger.debug("events fetched")
		res.status(200).send(response.rows)
	} catch (err) {
		fnLogger.error(err, "error fetching events")
		res.status(500).send("Internal server error")
	}
}

const updateEvent = async (req, res) => {
	const fnLogger = logger.child({
		module: moduleName,
		method: queryUpdateEvent.id,
	})

	try {
		fnLogger.debug("updating event")
		const { id } = req.params
		const { title, start, end, description, type } = req.body

		if (!id || !title || !start || !end || !description || !type) {
			fnLogger.error("all fields are required")
			return res.status(400).send("All fields are required")
		}

		const response = await pool.query(queryUpdateEvent.statement, [
			id,
			title,
			start,
			end,
			description,
			type,
		])

		fnLogger.debug("event updated")
		res.status(200).send(response.rows)
	} catch (err) {
		fnLogger.error(err, "error updating event")
		res.status(500).send("Internal server error")
	}
}

const deleteEvent = async (req, res) => {
	const fnLogger = logger.child({
		module: moduleName,
		method: queryDeleteEvent.id,
	})

	try {
		fnLogger.debug("deleting event")
		const { id } = req.params

		if (!id) {
			fnLogger.error("id is required")
			return res.status(400).send("Id is required")
		}

		const response = await pool.query(queryDeleteEvent.statement, [id])
		fnLogger.debug("event deleted")
		res.status(200).send(response.rows)
	} catch (err) {
		fnLogger.error(err, "error deleting event")
		res.status(500).send("Internal server error")
	}
}

module.exports = {
	createEventType,
	getEventTypes,
	removeEventType,
	createEvent,
	getEvents,
	updateEvent,
	deleteEvent,
}
