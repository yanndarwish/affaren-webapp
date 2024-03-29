import { useRef, useState } from "react"
import { useSelector } from "react-redux"
import {
	Dialog,
	DialogBody,
	DialogFooter,
	DialogHeader,
	Overlay,
} from "../../POS/Sliders/Slider.styles"
import {
	FormControl,
	InputLabel,
	Checkbox,
	InputAdornment,
	IconButton,
	FormHelperText,
	Select,
	MenuItem,
	FormControlLabel,
} from "@mui/material"
import { ArtTitle, SubTitle } from "../../../assets/common/common.styles"
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined"
import Button from "../../common/Button/Button.component"
import Input from "../../common/Input/Input.component"
import {
	FormWrapper,
	DialogCard,
} from "../../POS/Sliders/NoBarcodeSlider/NoBarcodeSlider.styles"
import { useRegisterMutation } from "../../../redux/services/userApi"
import VisibilityOff from "@mui/icons-material/VisibilityOff"
import Visibility from "@mui/icons-material/Visibility"
import InfoMessage from "../../common/InfoMessage/InfoMessage"

const CreateUserSlider = ({ isOpen, setIsOpen }) => {
	const [showPassword, setShowPassword] = useState(false)
	const [firstName, setFirstName] = useState("")
	const [lastName, setLastName] = useState("")
	const [role, setRole] = useState("")
	const [email, setEmail] = useState("")
	const [password, setPassword] = useState("")
	const [confirmPass, setConfirmPass] = useState("")
	const [isAdmin, setIsAdmin] = useState(false)
	const [nameError, setNameError] = useState(false)
	const [lNameError, setLNameError] = useState(false)
	const [mailError, setMailError] = useState(false)
	const [roleError, setRoleError] = useState(false)
	const [passError, setPassError] = useState(false)
	const [register, res] = useRegisterMutation()
	const theme = useSelector((state) => state.theme.theme)
	const overlayRef = useRef()

	const closeSlider = (e) => {
		if (overlayRef.current === e.target) {
			setIsOpen(false)
		}
	}

	const handleClose = () => {
		setIsOpen(false)
	}

	const handleCreate = () => {
		!firstName ? setNameError(true) : setNameError(false)
		!lastName ? setLNameError(true) : setLNameError(false)
		!email ? setMailError(true) : setMailError(false)
		!role ? setRoleError(true) : setRoleError(false)
		!password ? setPassError(true) : setPassError(false)

		if (firstName && lastName && role && email) {
			let user = {
				firstName: firstName,
				lastName: lastName,
				role: role,
				email: email,
				password: confirmPass,
				isAdmin: isAdmin ? "true" : "false",
			}
			register(user)
		}
	}

	const handleClickShowPassword = () => setShowPassword((show) => !show)

	const handleMouseDownPassword = (event) => {
		event.preventDefault()
	}

	return isOpen ? (
		<Overlay theme={theme} onClick={closeSlider} ref={overlayRef}>
			<Dialog id="dialog" theme={theme}>
				<DialogHeader>
					<SubTitle>Create New User</SubTitle>
					<CloseOutlinedIcon onClick={() => setIsOpen(false)} />
				</DialogHeader>
				<DialogBody>
					<ArtTitle>User Informations</ArtTitle>
					<DialogCard theme={theme}>
						{res.isSuccess ? (
							<InfoMessage state="success" text="User created successfully" />
						) : res.isError ? (
							<InfoMessage state="error" text="Failed to create user" />
						) : (
							<FormControl fullWidth>
								<FormWrapper>
									<Input
										value={firstName}
										onChange={setFirstName}
										label="First Name"
										error={nameError}
										helperText={nameError && "Required"}
									/>
									<Input
										value={lastName}
										onChange={setLastName}
										label="Last Name"
										error={lNameError}
										helperText={lNameError && "Required"}
									/>
									<FormControl fullWidth>
										<InputLabel id="demo-simple-select-label">Role</InputLabel>
										<Select
											labelId="demo-simple-select-label"
											id="demo-simple-select"
											value={role}
											label="Role"
											onChange={(e) => setRole(e.target.value)}
											error={roleError}
											helpertext={roleError ? "Required" : undefined}
										>
											<MenuItem value="user">User</MenuItem>
											<MenuItem value="cook">Cook</MenuItem>
										</Select>
									</FormControl>
									<Input
										value={email}
										onChange={setEmail}
										label="Email"
										error={mailError}
										helperText={mailError && "Required"}
									/>
									<Input
										value={password}
										onChange={setPassword}
										label="Password"
										type={showPassword ? "text" : "password"}
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
										error={passError}
										helperText={passError && "Required"}
									/>
									<FormControl error={password !== confirmPass}>
										<Input
											value={confirmPass}
											onChange={setConfirmPass}
											label="Confirm Password"
											type={showPassword ? "text" : "password"}
											inputAdornment={{
												endAdornment: (
													<InputAdornment position="end">
														<IconButton
															aria-label="toggle password visibility"
															onClick={handleClickShowPassword}
															onMouseDown={handleMouseDownPassword}
															edge="end"
														>
															{showPassword ? (
																<VisibilityOff />
															) : (
																<Visibility />
															)}
														</IconButton>
													</InputAdornment>
												),
											}}
										/>
										{password !== confirmPass && (
											<FormHelperText id="component-error-text">
												Passwords don't match
											</FormHelperText>
										)}
									</FormControl>
									<FormControlLabel
										control={
											<Checkbox
												checked={isAdmin}
												onChange={() => setIsAdmin(!isAdmin)}
											/>
										}
										label="is Admin"
									/>
								</FormWrapper>
							</FormControl>
						)}
					</DialogCard>
				</DialogBody>
				<DialogFooter>
					<Button
						title={res.isSuccess ? "Close" : "Create"}
						onClick={res.isSuccess ? handleClose : handleCreate}
						disabled={password !== confirmPass}
					/>
				</DialogFooter>
			</Dialog>
		</Overlay>
	) : null
}

export default CreateUserSlider
