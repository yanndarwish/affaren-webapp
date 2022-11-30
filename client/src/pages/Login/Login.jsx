import LoginCard from "../../components/Card/LoginCard/LoginCard.component"
import { useSelector } from "react-redux"
import { CenterContainer } from "../../assets/styles/common.styles"

const Login = () => {
	const theme = useSelector((state) => state.theme.theme)

	return (
		<CenterContainer theme={theme}>
			<LoginCard theme={theme} />
		</CenterContainer>
	)
}

export default Login
