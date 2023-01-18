import { createContext, useState } from "react"
import { ip } from "../../redux/ip"
import { useSelector } from "react-redux"
import { useGetActiveTablesProductsQuery } from "../../redux/services/tableProductsApi"
import { useDispatch } from "react-redux"
import { setUpdateOrder } from "../../redux/features/tableProducts"

const WebSocketContext = createContext(null)

export { WebSocketContext }

const WebSocketProvider = ({ children }) => {
	const dispatch = useDispatch()
	const loggedIn = useSelector((state) => state.login.loggedIn)
	// const [skip, setSkip] = useState(true)
	let skip = true

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
			}

			socket.onmessage = (message) => {
				console.log(message.data)
				if (message.data === "TableProducts") {
					console.log("get products")
					dispatch(setUpdateOrder({order: true}))
				}
			}

			ws = {
				socket: socket,
				sendMessage,
			}
		}
	}
	useGetActiveTablesProductsQuery({}, { skip })

	return (
		<WebSocketContext.Provider value={ws}>{children}</WebSocketContext.Provider>
	)
}

export default WebSocketProvider
