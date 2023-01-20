import { createContext, useState } from "react"
import { ip } from "../../redux/ip"
import { useSelector } from "react-redux"
import { useDispatch } from "react-redux"
import { setUpdateOrder } from "../../redux/features/tableProducts"

const WebSocketContext = createContext(null)

export { WebSocketContext }

const WebSocketProvider = ({ children }) => {
	const dispatch = useDispatch()
	const loggedIn = useSelector((state) => state.login.loggedIn)

	let socket
	let ws

	const sendMessage = (message) => {
		socket.send(message)
	}

	if (!socket) {
		if (loggedIn) {
			socket = new WebSocket(`ws://${ip}:4001`)
			socket.onopen = () => {
				socket.send("connexion")
				var t = setInterval(function () {
					if (socket.readyState !== 1) {
						clearInterval(t)
						return
					}
					socket.send("ping")
				}, 55000)
			}

			if (socket.readyState === 3) {
				console.log('close')
				socket.terminate()
				socket = new WebSocket(`ws://${ip}:4001`)
			}

			socket.onmessage = (message) => {
				console.log(message.data)
				if (message.data === "TableProducts") {
					console.log("get products")
					dispatch(setUpdateOrder({ order: true }))
				}
			}

			ws = {
				socket: socket,
				sendMessage,
			}
		}
	}

	return (
		<WebSocketContext.Provider value={ws}>{children}</WebSocketContext.Provider>
	)
}

export default WebSocketProvider
