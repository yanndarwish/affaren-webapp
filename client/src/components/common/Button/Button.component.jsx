import { Button as MuiButton } from "@mui/material"

const Button = ({ title, color = "primary", variant="contained", onClick, disabled }) => {
	const handleClick = () => {
		onClick()
	}

	return (
		<MuiButton variant={variant} color={color} onClick={handleClick} disabled={disabled}>
			{title}
		</MuiButton>
	)
}

export default Button
