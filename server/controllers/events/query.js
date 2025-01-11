const queryGetAllEvents = {
	id: "get_events",
	statement: "SELECT * FROM get_events($1, $2)",
}

const queryCreateEvent = {
	id: "create_event",
	statement: "SELECT * FROM create_event($1, $2, $3, $4, $5)",
}

const queryDeleteEvent = {
	id: "delete_event",
	statement: "SELECT * FROM delete_event($1)",
}

const queryUpdateEvent = {
	id: "update_event",
	statement: "SELECT * FROM update_event($1, $2, $3, $4, $5, $6)",
}

const queryGetAllEventTypes = {
	id: "get_event_types",
	statement: "SELECT * FROM get_event_types()",
}

const queryCreateEventType = {
	id: "create_event_type",
	statement: "SELECT * FROM create_event_type($1, $2)",
}

const queryDeleteEventType = {
	id: "delete_event_type",
	statement: "SELECT * FROM delete_event_type($1)",
}

module.exports = {
	queryGetAllEvents,
	queryCreateEvent,
	queryDeleteEvent,
	queryUpdateEvent,
	queryGetAllEventTypes,
	queryCreateEventType,
	queryDeleteEventType,
}
