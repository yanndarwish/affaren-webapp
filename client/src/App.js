import { RouterProvider } from "react-router-dom"
import { useState, useMemo, useEffect } from "react"
import router from "./router/router"
import WebSocketProvider from "./utils/context/webSocket"
import ThemeWrapper from "./ThemeWrapper"
import RefreshDialog from "./components/Cards/RefreshCard/RefreshCard.component.jsx"

import "./App.css"

function App() {
	const [isAlreadyOpened, setIsAlreadyOpened] = useState(false)
	const channel = useMemo(() => new BroadcastChannel("couldBeAnything"), [])

	useEffect(() => {
		channel.postMessage({
			isAlreadyOpened: true,
		})
		channel.addEventListener("message", (e) => {
			setIsAlreadyOpened(e.data.isAlreadyOpened)
		})
		return channel.close
	}, [])

	return (
		<ThemeWrapper>
			{/* <WebSocketProvider> */}
			{!isAlreadyOpened ? (
				<RouterProvider router={router} />
			) : (
				<RefreshDialog />
			)}
			{/* </WebSocketProvider> */}
		</ThemeWrapper>
	)
}

export default App
