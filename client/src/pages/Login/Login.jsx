import LoginCard from "../../components/Cards/LoginCard/LoginCard.component"
import { useSelector } from "react-redux"
import { CenterContainer } from "../../assets/common/common.styles"

const Login = () => {
	const theme = useSelector((state) => state.theme.theme)
	return (
		<CenterContainer theme={theme}>
			<LoginCard theme={theme} />
		</CenterContainer>
	)
}

export default Login
