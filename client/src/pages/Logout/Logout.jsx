import LogoutDialog from "../../components/Cards/LogoutCard/LogoutCard.component.jsx"
import { useSelector } from "react-redux"
import { CenterContainer, FullCenter } from "../../assets/styles/common.styles.js"
import { Grid } from "@mui/material"

const Logout = () => {
	const theme = useSelector((state) => state.theme.theme)
	return (
		<FullCenter>
			<LogoutDialog theme={theme} />
		</FullCenter>
	)
}
export default Logout
