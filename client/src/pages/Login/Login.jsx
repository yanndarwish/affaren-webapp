import LoginCard from "../../components/Card/LoginCard/LoginCard.component"
import { useSelector } from "react-redux"

const Login = () => {
	const theme = useSelector((state) => state.theme.theme)

	return (
		<div>
			<LoginCard theme={theme} />
		</div>
	)
}

export default Login
