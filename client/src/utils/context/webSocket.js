// import { createContext } from "react"
// import { ip } from "../../redux/ip"
// import { useSelector } from "react-redux"
// import { useDispatch } from "react-redux"
// import {
// 	setLunchUpdate,
// } from "../../redux/features/tableProducts"
// import { setUpdate } from "../../redux/features/orders"

// const WebSocketContext = createContext(null)

// export { WebSocketContext }

// const WebSocketProvider = ({ children }) => {
// 	const loggedIn = useSelector((state) => state.login.loggedIn)
// 	const dispatch = useDispatch()
// 	let ws
// 	if (loggedIn) {
// 		let socket

// 		const sendMessage = (message) => {
// 			socket.send(JSON.stringify(message))
// 		}

// 		if (!socket) {
// 			socket = new WebSocket(`ws://${ip}:4001`)

// 			socket.addEventListener("open", (e) => {
// 				socket.send(
// 					JSON.stringify({
// 						type: "connexion",
// 					})
// 				)
// 			})

// 			socket.addEventListener("message", (message) => {
// 				let data = JSON.parse(message.data)
// 				if (data.type === "lunch") {
// 					dispatch(setLunchUpdate())
// 				}
// 				if (data.type === "order") {
// 					dispatch(setUpdate())
// 				}
// 			})

// 			ws = {
// 				socket: socket,
// 				sendMessage,
// 			}
// 		}
// 	}
// 	return (
// 		<WebSocketContext.Provider value={ws}>{children}</WebSocketContext.Provider>
// 	)
// }

// export default WebSocketProvider
