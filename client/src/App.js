import { RouterProvider } from "react-router-dom"
import router from "./router/router"
import { createTheme, ThemeProvider } from "@mui/material/styles"
import { useSelector } from "react-redux"
import "./App.css"

function App() {
	const theme = useSelector((state) => state.theme.theme)

	const actualTheme = createTheme({
		palette: {
			mode:theme,
		},
	})

	return (
		<ThemeProvider theme={actualTheme}>
			<RouterProvider router={router} />
		</ThemeProvider>
	)
}

export default App
