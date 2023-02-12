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
import { Checkbox, FormControlLabel, FormGroup } from "@mui/material"

const LoginCard = ({ theme }) => {
	const [email, setEmail] = useState("")
	const [password, setPassword] = useState("")
	const [isChecked, setIsChecked] = useState(false)
	const [getAuth, res] = useGetAuthMutation()
	const navigate = useNavigate()

	const handleLogin = async () => {
		if (isChecked && email !== "") {
			localStorage.username = email
			localStorage.password = password
			localStorage.checkbox = isChecked
		}
		const payload = {
			email: email,
			password: password,
		}
		await getAuth(payload)
	}

	const redirect = () => {
		if (res.status === "fulfilled") {
			navigate("/opening")
		}
	}

	useEffect(() => {
		if (localStorage.checkbox && localStorage.email !== "") {
			setIsChecked(true)
			setEmail(localStorage.username)
			setPassword(localStorage.password)
		}
	}, [])

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
					<FormGroup>
						<FormControlLabel
							control={
								<Checkbox
									checked={isChecked}
									onChange={(e) => setIsChecked(e.target.checked)}
								/>
							}
							label="Remember me"
						/>
					</FormGroup>
					<Link to="/forgot-password">Forgot you password ?</Link>
				</Column>
				<Button title="Login" color="success" onClick={handleLogin} />
			</ColumnSpace>
		</Container>
	)
}

export default LoginCard
