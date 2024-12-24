import { useState } from "react"
import { useNavigate } from "react-router-dom"

import { forgotPassword } from "../../../lib/api"
import { useQuery } from "../../../lib/hooks/useQuery"
import { useNotify } from "../../../lib/hooks/useNotify"

import {
	Card,
	CardTitle,
	CardHeader,
	CardContent,
	CardDescription,
} from "../../ui/card"
import { Label } from "../../ui/label"
import { Input } from "../../ui/input"
import { Button } from "../../ui/button"
import { Stack } from "@mui/material"

export const ForgotPasswordCard = () => {
	const navigate = useNavigate()
	const { notifySuccess, notifyError } = useNotify()
	const [email, setEmail] = useState("")

	const querySubmitRecovery = useQuery({
		queryFn: forgotPassword,
		onSuccess: () => {
			notifySuccess("Recovery link sent to your email")
			navigate("/login")
		},
		onError: () => {
			notifyError("Error sending recovery link")
		},
	})

	const handleSubmit = (e) => {
		e.preventDefault()
		querySubmitRecovery.send({ email: email })
	}

	const handleCancel = () => {
		navigate("/login")
	}

	return (
		<div className="flex flex-col gap-6">
			<Card>
				<CardHeader>
					<CardTitle className="text-2xl">Password Forgotten</CardTitle>
					<CardDescription>
						Enter your email below to receive a recovery link
					</CardDescription>
				</CardHeader>
				<CardContent>
					<form onSubmit={handleSubmit}>
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
							<Stack direction="row" className="space-x-4">
								<Button
									type="button"
									variant="outline"
									className="w-full"
									onClick={handleCancel}
								>
									Login
								</Button>
								<Button type="submit" className="w-full">
									Submit
								</Button>
							</Stack>
						</div>
					</form>
				</CardContent>
			</Card>
		</div>
	)
}
