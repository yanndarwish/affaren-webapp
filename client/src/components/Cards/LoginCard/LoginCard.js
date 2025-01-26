import { Button } from "../../ui/button"
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "../../ui/card"
import CryptoJS from "crypto-js"

import { Input } from "../../ui/input"
import { Label } from "../../ui/label"
import { Checkbox } from "../../ui/checkbox"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { useQuery } from "../../../lib/hooks/useQuery"
import { useNotify } from "../../../lib/hooks/useNotify"
import { auth } from "../../../lib/api"
import { useSession } from "../../../lib/hooks/useSession"

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

export const LoginForm = ({ ...props }) => {
	const [email, setEmail] = useState("")
	const [password, setPassword] = useState("")
	const [isChecked, setIsChecked] = useState(false)

	const navigate = useNavigate()
	const { login } = useSession()
	const { notifyError, notifySuccess } = useNotify()

	const queryLogin = useQuery({
		queryFn: auth,
		onSuccess: (data) => {
			const expirationDate = new Date(
				new Date().getTime() + 1000 * 60 * 60 * 10
			)

			login(data.user, data.token, expirationDate)

			// Then navigate after a small delay to ensure state is updated
			setTimeout(() => {
				navigate("/pos?opening=true", { replace: true })
				notifySuccess("Login successful")
			}, 100)
		},
		onError: () => {
			notifyError("An error occurred while logging in")
		},
	})

	const handleLogin = async (e) => {
		e.preventDefault()

		if (isChecked && email !== "") {
			localStorage.setItem("username", encryptData(email))
			localStorage.setItem("password", encryptData(password))
			localStorage.checkbox = isChecked
		}

		const payload = {
			email: email,
			password: password,
		}

		queryLogin.send(payload)
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

	return (
		<div className="flex flex-col gap-6" {...props}>
			<Card>
				<CardHeader>
					<CardTitle className="text-2xl">Login</CardTitle>
					<CardDescription>
						Enter your email below to login to your account
					</CardDescription>
				</CardHeader>
				<CardContent>
					<form onSubmit={handleLogin}>
						<div className="flex flex-col gap-6">
							<div className="grid gap-2">
								<Label htmlFor="email">Email</Label>
								<Input
									id="email"
									type="email"
									value={email}
									onChange={(e) => setEmail(e.target.value)}
									placeholder="m@example.com"
									required
								/>
							</div>
							<div className="grid gap-2">
								<div className="flex items-center">
									<Label htmlFor="password">Password</Label>
									<a
										href="/forgot-password"
										className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
									>
										Forgot your password?
									</a>
								</div>
								<Input
									id="password"
									type="password"
									value={password}
									onChange={(e) => setPassword(e.target.value)}
									required
								/>
							</div>
							<div className="flex items-center gap-2">
								<Checkbox checked={isChecked} onCheckedChange={setIsChecked} />
								<Label htmlFor="remember">Remember me</Label>
							</div>
							<Button type="submit" className="w-full">
								Login
							</Button>
						</div>
					</form>
				</CardContent>
			</Card>
		</div>
	)
}
