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
import CryptoJS from "crypto-js"

// Encryption key (you should store this securely)
const ENCRYPTION_KEY = process.env.REACT_APP_ENCRYPTION_KEY

// Encryption and decryption functions
const encryptData = (text) => {
	try {
		return CryptoJS.AES.encrypt(text, ENCRYPTION_KEY).toString()
	} catch (error) {
		console.error("Encryption error:", error)
		return ""
	}
}

const decryptData = (encryptedText) => {
	try {
		const bytes = CryptoJS.AES.decrypt(encryptedText, ENCRYPTION_KEY)
		return bytes.toString(CryptoJS.enc.Utf8)
	} catch (error) {
		console.error("Decryption error:", error)
		return ""
	}
}

const LoginCard = ({ theme }) => {
	const [email, setEmail] = useState("")
	const [password, setPassword] = useState("")
	const [isChecked, setIsChecked] = useState(false)
	const [getAuth, res] = useGetAuthMutation()
	const navigate = useNavigate()

	const handleLogin = async () => {
		if (isChecked && email !== "") {
			localStorage.setItem("username", encryptData(email))
			localStorage.setItem("password", encryptData(password))
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
			localStorage.setItem("token", res.data.token)
			navigate("/opening")
		}
	}

	useEffect(() => {
		if (localStorage.checkbox && localStorage.email !== "") {
			setIsChecked(true)
			const decryptedUsername = decryptData(localStorage.getItem("username"))
			const decryptedPassword = decryptData(localStorage.getItem("password"))
			setEmail(decryptedUsername)
			setPassword(decryptedPassword)
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
