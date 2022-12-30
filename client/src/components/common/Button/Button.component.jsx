import { Button as MuiButton } from "@mui/material"

const Button = ({ title, color = "primary", variant="contained", onClick }) => {
	const handleClick = () => {
		onClick()
	}

	return (
		<MuiButton variant={variant} color={color} onClick={handleClick}>
			{title}
		</MuiButton>
	)
}

export default Button
