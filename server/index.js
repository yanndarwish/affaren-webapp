const http = require("http")
const WebSocket = require("ws")
const app = require("./app")
const server = http.createServer(app)

const { API_PORT } = process.env
const port = process.env.PORT || API_PORT

const socket = new WebSocket.Server({ server })

socket.on("connection", (ws) => {
	// ws.isAlive = true

	// ws.on("pong", () => {
	// 	ws.isAlive = true
	// })
	ws.on("message", (message) => {
		console.log(`received ${message}`)

		socket.clients.forEach((client) => {
			if (client != ws) {
				client.send(`Hello, broadcast message -> ${message}`)
			}
		})
	})

    // setInterval(() => {
	// 		socket.clients.forEach((client) => {
	// 			if (!client.isAlive) return client.terminate()

	// 			client.isAlive = false
	// 			client.ping(null, false, true)
	// 		})
	// 	}, 10000)

	ws.send(`Hello, you just connected to WS`)
})

server.listen(port, () => {
	console.log(`Server running on port ${port}`)
})
