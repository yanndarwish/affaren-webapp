import LoginCard from "../../components/Cards/LoginCard/LoginCard.component"
import { useSelector } from "react-redux"
import { CenterContainer, FullCenter } from "../../assets/styles/common.styles"
import { Grid } from "@mui/material"


const Login = () => {
	const theme = useSelector((state) => state.theme.theme)

	return (
		<FullCenter>
			<LoginCard theme={theme} />
		</FullCenter>
	)
}

export default Login
