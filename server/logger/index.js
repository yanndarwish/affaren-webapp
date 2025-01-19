const pino = require("pino")

const errorTransport = pino.transport({
	target: "pino/file",
	level: "error",
	options: {
		destination: `${__dirname}/errors.log`,
	},
})

const warnTransport = pino.transport({
	target: "pino/file",
	level: "warn",
	options: {
		destination: `${__dirname}/warnings.log`,
	},
})

// Create a transport for console logging
const consoleTransport = pino.transport({
	target: "pino-pretty",
	options: {
		colorize: true, // Enable colors in the console
		translateTime: "dd/mm/yyyy HH:MM:ss", // Format timestamps
		ignore: "pid,hostname", // Remove unnecessary fields from the output
	},
})

const logger = pino(
	{
		level: process.env.PINO_LOG_LEVEL || "info",
		formatters: {
			level: (label) => {
				return { severity: label.toUpperCase() }
			},
		},
		redact: {
			paths: ["email", "password"],
			censor: "[REDACTED]",
		},
	},
	pino.multistream([
		{ stream: errorTransport, level: "error" },
		{ stream: warnTransport, level: "warn" },
		{ stream: consoleTransport, level: "info" },
	])
)

module.exports = logger
