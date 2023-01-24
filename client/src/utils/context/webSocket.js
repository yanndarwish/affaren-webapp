import { createContext } from "react"
import { ip } from "../../redux/ip"
import { useSelector } from "react-redux"
import { useDispatch } from "react-redux"
import { setTargetTable, updateActiveTablesProducts } from "../../redux/features/tableProducts"
import { setUpdate } from "../../redux/features/orders"

const WebSocketContext = createContext(null)

export { WebSocketContext }

const WebSocketProvider = ({ children }) => {
	const loggedIn = useSelector((state) => state.login.loggedIn)
	const dispatch = useDispatch()
	let ws
	if (loggedIn) {

		let socket

		const sendMessage = (message) => {
			socket.send(JSON.stringify(message))
		}

		if (!socket) {
			socket = new WebSocket(`ws://${ip}:4001`)

			socket.addEventListener("open", (e) => {
				socket.send(
					JSON.stringify({
						type: "connexion",
					})
				)
			})

			socket.addEventListener("message", (message) => {
				let data = JSON.parse(message.data)
				console.log(data)
				if (data.type === "lunch") {
					dispatch(setTargetTable(data.table))
					dispatch(updateActiveTablesProducts(data.products))
				}

				if (data.type === "order") {
					dispatch(setUpdate())
				}
			})
			// socket.onopen = () => {
			// 	socket.send("connexion")
			// 	var t = setInterval(function () {
			// 		if (socket.readyState !== 1) {
			// 			clearInterval(t)
			// 			return
			// 		}
			// 		socket.send("ping" )
			// 	}, 55000)
			// }

			// if (socket.readyState === 3) {
			// 	console.log('close')
			// 	socket.terminate()
			// 	socket = new WebSocket(`ws://${ip}:4001`)
			// }

			// socket.onmessage = (message) => {
			// 	console.log(message)
			// 	if (message.data === "TableProducts") {
			// 		console.log(JSON.parse(message?.data))
			// 		console.log("get products")
			// 		dispatch(setUpdateOrder({ order: true }))
			// 	}
			// }

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
