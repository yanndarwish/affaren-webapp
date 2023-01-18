const http = require("http")
const WebSocket = require("ws")
const app = require("./app")
const server = http.createServer(app)

const { API_PORT } = process.env
const port = process.env.PORT || API_PORT

function heartbeat() {
	this.isAlive = true
}

const wss = new WebSocket.Server({ server })

wss.on("connection", function connection(ws) {
	ws.isAlive = true
	ws.on("pong", heartbeat)

	ws.on("message", (message) => {
		console.log(`received ${message}`)

		wss.clients.forEach((client) => {
			if (client != ws) {
				client.send(`${message}`)
			}
		})
	})

		ws.send(`Hello, you just connected to WS`)
})

const interval = setInterval(function ping() {
	wss.clients.forEach(function each(ws) {
		if (ws.isAlive === false) return ws.terminate()

		ws.isAlive = false
		ws.ping()
	})
}, 10000)

wss.on("close", function close() {
	clearInterval(interval)
})

// wss.on("connection", (ws) => {
// 	ws.isAlive = true

// 	ws.on("pong", () => {
// 		console.log("pong received")
// 		ws.isAlive = true
// 	})
// 	ws.on("message", (message) => {
// 		console.log(`received ${message}`)

// 		wss.clients.forEach((client) => {
// 			if (client != ws) {
// 				client.send(`Hello, broadcast message -> ${message}`)
// 			}
// 		})
// 	})

// 	ws.send(`Hello, you just connected to WS`)
// })

server.listen(port, () => {
	console.log(`Server running on port ${port}`)
})
