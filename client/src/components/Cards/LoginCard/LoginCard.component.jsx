import { useState } from "react"
import Input from "../../common/Input/Input.component"
import Button from "../../common/Button/Button.component"
import { useGetAuthMutation } from "../../../redux/services/loginApi"
import { useNavigate } from "react-router-dom"
import { SubTitle } from "../../../assets/styles/common.styles"
import { Container, Text, Footer } from "../Card.styles"

const LoginCard = ({ theme }) => {
	const [email, setEmail] = useState("")
	const [password, setPassword] = useState("")
	const [getAuth, res] = useGetAuthMutation()
	const navigate = useNavigate()

	const handleLogin = async () => {
		const payload = {
			email: email,
			password: password,
		}
		await getAuth(payload)
		navigate("/profile")
	}

	return (
		<Container theme={theme}>
			<div>
				<SubTitle theme={theme}>Login</SubTitle>
			</div>
			<div>
				<Input label="Email" value={email} theme={theme} onChange={setEmail} />
				<Input
					label="Password"
					value={password}
					theme={theme}
					onChange={setPassword}
					type="password"
				/>
			</div>
			<Footer>
				<Button title="Login" color="success" onClick={handleLogin}></Button>
			</Footer>
		</Container>
	)
}

export default LoginCard
