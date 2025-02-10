import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

import { auth } from "../../../lib/api"
import { useQuery } from "../../../lib/hooks/useQuery"
import { useNotify } from "../../../lib/hooks/useNotify"
import { useSession } from "../../../lib/hooks/useSession"

import { encryptData, decryptData } from "../utils"

export const useLogin = () => {
	const navigate = useNavigate()
	const { login } = useSession()
	const { notifyError, notifySuccess } = useNotify()

	const [email, setEmail] = useState("")
	const [password, setPassword] = useState("")
	const [isChecked, setIsChecked] = useState(false)

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

	return {
		handleLogin,
		email,
		setEmail,
		password,
		setPassword,
		isChecked,
		setIsChecked,
	}
}
