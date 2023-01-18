import { RouterProvider } from "react-router-dom"
import router from "./router/router"
import { createTheme, ThemeProvider } from "@mui/material/styles"
import WebSocketProvider from "./utils/context/webSocket"
import { useSelector } from "react-redux"
import { useContext } from "react"
import { WebSocketContext } from "./utils/context/webSocket"

import "./App.css"

function App() {
	const theme = useSelector((state) => state.theme.theme)
	const ws = useContext(WebSocketContext)

	const actualTheme = createTheme({
		palette: {
			mode: theme,
		},
	})

	ws?.on("ping", () => {
		console.log('ping received, sending pong')
		ws.pong(true)
	})

	return (
		<ThemeProvider theme={actualTheme}>
			<WebSocketProvider>
				<RouterProvider router={router} />
			</WebSocketProvider>
		</ThemeProvider>
	)
}

export default App
