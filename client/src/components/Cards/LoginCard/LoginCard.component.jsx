import { useEffect, useState } from "react"
import Input from "../../common/Input/Input.component"
import Button from "../../common/Button/Button.component"
import { useGetAuthMutation } from "../../../redux/services/loginApi"
import { Link, useNavigate } from "react-router-dom"
import {
	Column,
	ColumnSpace,
	ErrorMessage,
	SubTitle,
} from "../../../assets/common/common.styles"
import { Container } from "../Card.styles"

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
	}

	const redirect = () => {
		if (res.status === "fulfilled") {
			navigate("/profile")
		}
	}

	useEffect(() => {
		redirect()
	}, [res])

	return (
		<Container theme={theme}>
			<ColumnSpace>
				<SubTitle theme={theme}>Login</SubTitle>
				{res.isError && (
					<ErrorMessage>Email or Password incorrect</ErrorMessage>
				)}
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
					<Link to="/forgot-password">Forgot you password ?</Link>
				</Column>
				<Button title="Login" color="success" onClick={handleLogin} />
			</ColumnSpace>
		</Container>
	)
}

export default LoginCard
