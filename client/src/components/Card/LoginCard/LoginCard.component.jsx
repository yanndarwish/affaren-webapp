import { useState } from "react"
import Input from "../../Input/Input.component"
import Button from "../../Button/Button.component"
import { useGetAuthMutation } from "../../../redux/services/api"
import { useNavigate } from "react-router-dom"

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
		<div>
			<div>
				<h1>Login</h1>
			</div>
			<div>
				<Input value={email} theme={theme} onChange={setEmail} />
				<Input value={password} theme={theme} onChange={setPassword} secure />
			</div>
			<div>
				<Button title="Login" color="green" onPress={handleLogin}></Button>
			</div>
		</div>
	)
}

export default LoginCard
