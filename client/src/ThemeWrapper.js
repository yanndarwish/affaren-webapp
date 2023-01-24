import { createTheme, ThemeProvider } from "@mui/material/styles"
import { useSelector } from "react-redux"

const ThemeWrapper = ({children}) => {
	const theme = useSelector((state) => state.theme.theme)

	const actualTheme = createTheme({
		palette: {
			mode: theme,
		},
	})

	return <ThemeProvider theme={actualTheme}>
        {children}
    </ThemeProvider>
}

export default ThemeWrapper
