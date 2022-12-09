import LoginCard from "../../components/Cards/LoginCard/LoginCard.component"
import { useSelector } from "react-redux"
import { CenterContainer } from "../../assets/styles/common.styles"
import { Grid } from "@mui/material"


const Login = () => {
	const theme = useSelector((state) => state.theme.theme)

	return (
		<Grid item xs>
			<LoginCard theme={theme} />
		</Grid>
	)
}

export default Login
