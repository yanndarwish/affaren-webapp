import LogoutDialog from "../../components/Card/LogoutCard/LogoutCard.component.jsx"
import { useSelector } from "react-redux"
import { CenterContainer } from "../../assets/styles/common.styles.js"
import { Grid } from "@mui/material"

const Logout = () => {
	const theme = useSelector((state) => state.theme.theme)
	return (
		<Grid item xs>
			<LogoutDialog theme={theme} />
		</Grid>
	)
}
export default Logout
