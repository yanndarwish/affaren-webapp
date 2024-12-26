import { createTheme, ThemeProvider } from "@mui/material/styles"

const ThemeWrapper = ({children}) => {
	const actualTheme = createTheme({
		palette: {
			mode: "light",
		},
	})

	return <ThemeProvider theme={actualTheme}>
        {children}
    </ThemeProvider>
}

export default ThemeWrapper
