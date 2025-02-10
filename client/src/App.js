import { RouterProvider } from "react-router-dom"
import { useState, useMemo, useEffect } from "react"

import router from "./router/router"
import ThemeWrapper from "./ThemeWrapper"
import { RefreshDialog } from "./features/refresh"

import "./App.css"
import "toastify-js/src/toastify.css"

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
			{!isAlreadyOpened ? (
				<RouterProvider router={router} />
			) : (
				<RefreshDialog />
			)}
		</ThemeWrapper>
	)
}

export default App
