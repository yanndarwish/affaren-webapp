import { useState } from "react"
import Input from "../../common/Input/Input.component"
import Button from "../../common/Button/Button.component"
import { useGetAuthMutation } from "../../../redux/services/loginApi"
import { useNavigate } from "react-router-dom"
import {
	Column,
	ColumnCenter,
	ColumnSpace,
	SubTitle,
} from "../../../assets/styles/common.styles"
import { Container, Text, Footer } from "../Card.styles"

const LoginCard = ({ theme }) => {
	const [email, setEmail] = useState("yann.darwish@gmail.com")
	const [password, setPassword] = useState("password")
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
			<ColumnSpace>
				<SubTitle theme={theme}>Login</SubTitle>
				<Column>
				<Input
					label="Email"
					value={email}
					theme={theme}
					onChange={setEmail}
					fullWidth
					/>
				<Input
					fullWidth
					label="Password"
					value={password}
					theme={theme}
					onChange={setPassword}
					type="password"
					/>
					</Column>
				<Button title="Login" color="success" onClick={handleLogin}></Button>
			</ColumnSpace>
		</Container>
	)
}

export default LoginCard
