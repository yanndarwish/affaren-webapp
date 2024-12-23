import { useSelector } from "react-redux"
import { CenterContainer } from "../../assets/common/common.styles"
import { useNavigate } from "react-router-dom"
import { useEffect } from "react"
import { LoginForm } from "../../components/Cards/LoginCard/LoginCard.js"
import { useSession } from "../../lib/hooks/useSession/index.js"

const Login = () => {
	const navigate = useNavigate()
	const { isLoggedIn } = useSession()

	const theme = useSelector((state) => state.theme.theme)

	useEffect(() => {
		if (isLoggedIn) {
			navigate("/pos")
		}
	}, [isLoggedIn])

	return (
		<CenterContainer theme={theme}>
			<LoginForm theme={theme} />
		</CenterContainer>
	)
}

export default Login
