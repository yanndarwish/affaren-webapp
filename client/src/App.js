import { RouterProvider } from "react-router-dom"
import router from "./router/router"
import WebSocketProvider from "./utils/context/webSocket"
import ThemeWrapper from "./ThemeWrapper"

import "./App.css"

function App() {
	return (
		<ThemeWrapper>
			<WebSocketProvider>
				<RouterProvider router={router} />
			</WebSocketProvider>
		</ThemeWrapper>
	)
}

export default App
