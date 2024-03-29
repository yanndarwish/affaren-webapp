import { useState } from "react"
import {
	Column,
	ErrorMessage,
	SpaceHeader,
	SubTitle,
} from "../../../assets/common/common.styles"
import Button from "../../common/Button/Button.component"
import Input from "../../common/Input/Input.component"
import Visibility from "@mui/icons-material/Visibility"
import VisibilityOff from "@mui/icons-material/VisibilityOff"
import {
	FormControl,
	FormHelperText,
	IconButton,
	InputAdornment,
} from "@mui/material"
import { useCheckPasswordMutation } from "../../../redux/services/loginApi"
import { useEffect } from "react"
import { useUpdateUserMutation } from "../../../redux/services/userApi"
import InfoMessage from "../../common/InfoMessage/InfoMessage"

const UserProfile = ({ user }) => {
	const [isOpen, setIsOpen] = useState(false)
	const [next, setNext] = useState(false)
	const [showPassword, setShowPassword] = useState(false)
	const [passUpdated, setPassUpdated] = useState(false)
	const [pass, setPass] = useState("")
	const [confirmationPass, setConfirmationPass] = useState("")
	const [checkPassword, res] = useCheckPasswordMutation()
	const [updateUser, response] = useUpdateUserMutation()

	const handleClickShowPassword = () => setShowPassword((show) => !show)

	const handleMouseDownPassword = (event) => {
		event.preventDefault()
	}
	const handleOpen = () => {
		setIsOpen(!isOpen)
	}

	const checkPass = () => {
		checkPassword({ email: user.user_email, password: confirmationPass })
	}

	const handleNext = () => {
		// check in db if pass matches
		// if so, get to next stage
		if (res.isSuccess) {
			setNext(true)
			setPass("")
			setConfirmationPass("")
		}
	}

	const handlePassUpdate = () => {
		updateUser({
			user_id: user.user_id,
			user_first_name: user.user_first_name,
			user_last_name: user.user_last_name,
			user_email: user.user_email,
			user_password: confirmationPass,
			user_is_admin: user.user_is_admin,
		})
		setPassUpdated(true)
	}

	const handleClose = () => {
		setIsOpen(false)
		setNext(false)
		setPassUpdated(false)
		setPass("")
		setConfirmationPass("")
	}

	useEffect(() => {
		handleNext()
	}, [res])

	return (
		<>
			<SpaceHeader>
				<SubTitle>Edit</SubTitle>
				{isOpen && <Button title="Close" onClick={handleClose} />}
			</SpaceHeader>
			{isOpen &&
				(!next ? (
					<Column>
						<Input
							value={pass}
							id="outlined-adornment-password"
							type={showPassword ? "text" : "password"}
							onChange={(e) => setPass(e)}
							inputAdornment={{
								endAdornment: (
									<InputAdornment position="end">
										<IconButton
											aria-label="toggle password visibility"
											onClick={handleClickShowPassword}
											onMouseDown={handleMouseDownPassword}
											edge="end"
										>
											{showPassword ? <VisibilityOff /> : <Visibility />}
										</IconButton>
									</InputAdornment>
								),
							}}
							label="Password"
						/>
						<FormControl error={pass !== confirmationPass}>
							<Input
								error={pass !== confirmationPass}
								type={showPassword ? "text" : "password"}
								label="Confirm Actual Password"
								value={confirmationPass}
								onChange={setConfirmationPass}
								inputAdornment={{
									endAdornment: (
										<InputAdornment position="end">
											<IconButton
												aria-label="toggle password visibility"
												onClick={handleClickShowPassword}
												onMouseDown={handleMouseDownPassword}
												edge="end"
											>
												{showPassword ? <VisibilityOff /> : <Visibility />}
											</IconButton>
										</InputAdornment>
									),
								}}
							/>
							{pass !== confirmationPass && (
								<FormHelperText id="component-error-text">
									Passwords don't match
								</FormHelperText>
							)}
						</FormControl>
						{res.error && <ErrorMessage>Incorrect Password</ErrorMessage>}
					</Column>
				) : !passUpdated ? (
					<Column>
						<Input
							label="New Password"
							value={pass}
							type={showPassword ? "text" : "password"}
							onChange={(e) => setPass(e)}
							inputAdornment={{
								endAdornment: (
									<InputAdornment position="end">
										<IconButton
											aria-label="toggle password visibility"
											onClick={handleClickShowPassword}
											onMouseDown={handleMouseDownPassword}
											edge="end"
										>
											{showPassword ? <VisibilityOff /> : <Visibility />}
										</IconButton>
									</InputAdornment>
								),
							}}
						/>
						<FormControl error={pass !== confirmationPass}>
							<Input
								type={showPassword ? "text" : "password"}
								label="Confirm New Password"
								value={confirmationPass}
								onChange={setConfirmationPass}
								inputAdornment={{
									endAdornment: (
										<InputAdornment position="end">
											<IconButton
												aria-label="toggle password visibility"
												onClick={handleClickShowPassword}
												onMouseDown={handleMouseDownPassword}
												edge="end"
											>
												{showPassword ? <VisibilityOff /> : <Visibility />}
											</IconButton>
										</InputAdornment>
									),
								}}
							/>
							{pass !== confirmationPass && (
								<FormHelperText id="component-error-text">
									Passwords don't match
								</FormHelperText>
							)}
							{response.error && (
								<ErrorMessage>Failed to update password</ErrorMessage>
							)}
						</FormControl>
					</Column>
				) : (
					<InfoMessage state="success" text="Paswword changed successfully" />
				))}
			<Button
				title={
					!isOpen
						? "Change Password"
						: !next
						? "Next"
						: !passUpdated
						? "Edit Password"
						: "Quit"
				}
				onClick={
					!isOpen
						? handleOpen
						: !next
						? checkPass
						: !passUpdated
						? handlePassUpdate
						: handleClose
				}
				disabled={pass !== confirmationPass}
			/>
		</>
	)
}

export default UserProfile
