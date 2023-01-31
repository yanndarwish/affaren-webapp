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

wss.on("connection", (ws) => {
	ws.isAlive = true
	ws.on("pong", heartbeat)

	ws.on("message", function incoming(data) {
		let myData = `${data}`
		let dataObject = JSON.parse(myData)
		try {
			wss.clients.forEach((client) => {
				if (dataObject.type === "connexion") {
					let message = {
						type: "connexion",
						id: wss.clients.size,
						message: `Client n°${wss.clients.size} just connected`,
					}
					client.send(JSON.stringify(message))
				} 
				// else if (dataObject.type === "lunch") {
				// 	if (ws !== clientSender) {
				// 		client.send(myData)
				// 	}
				// } 
				else {
					client.send(myData)
				}
			})
		} catch (e) {
			console.log(`Something went wrong with the message: ${e.message}`)
		}
	})
})

const interval = setInterval(function ping() {
	wss.clients.forEach(function each(ws) {
		if (ws.isAlive === false) return ws.terminate()

		ws.isAlive = false
		ws.ping()
	})
}, 55000)

wss.on("close", function close() {
	clearInterval(interval)
})

server.listen(port, () => {
	console.log(`Server running on port ${port}`)
})
