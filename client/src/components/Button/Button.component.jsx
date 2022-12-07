import { Button as MuiButton } from "@mui/material"

const Button = ({ title, color="primary", onPress }) => {
	const handleClick = () => {
		onPress()
	}

	return <MuiButton variant="contained" color={color} onClick={handleClick}>{title}</MuiButton>
}

export default Button
