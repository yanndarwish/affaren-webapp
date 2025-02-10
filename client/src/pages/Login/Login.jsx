import { useEffect } from "react"
import { useNavigate } from "react-router-dom"

import { LoginForm } from "../../features/login/components/form"
import { useSession } from "../../lib/hooks/useSession/index.js"
import { CenterContainer } from "../../assets/common/common.styles"

const Login = () => {
	const navigate = useNavigate()
	const { isLoggedIn } = useSession()

	useEffect(() => {
		if (isLoggedIn) {
			navigate("/pos")
		}
	}, [isLoggedIn])

	return (
		<CenterContainer>
			<LoginForm />
		</CenterContainer>
	)
}

export default Login
