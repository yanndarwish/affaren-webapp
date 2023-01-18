import { createContext } from "react"
import { ip } from "../../redux/ip"
import { useSelector } from "react-redux"
const WebSocketContext = createContext(null)

export { WebSocketContext }

const WebSocketProvider = ({ children }) => {
	const loggedIn = useSelector((state) => state.login.loggedIn)

	let socket
	let ws

	const sendMessage = (message) => {
		const payload = {
			data: message,
		}
		socket.send(JSON.stringify(payload))
	}

	if (!socket) {
		if (loggedIn) {
			socket = new WebSocket(`ws://${ip}:4001`)
			socket.onopen = () => {
				socket.send("connexion")
			}

			ws = {
				socket: socket,
                sendMessage
			}
		}
	}

	return (
		<WebSocketContext.Provider value={ws}>{children}</WebSocketContext.Provider>
	)
}

export default WebSocketProvider
