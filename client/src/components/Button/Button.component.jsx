import {
	StyledButton,
	SuccessButton,
	WarningButton,
	DangerButton,
} from "./Button.styles"

const Button = ({ title, color, onPress }) => {
	const handlePress = () => {
		onPress()
	}

	if (color === "green") {
		return <SuccessButton onClick={handlePress}>{title}</SuccessButton>
	}

	if (color === "yellow") {
		return <WarningButton onClick={handlePress}>{title}</WarningButton>
	}

	if (color === "red") {
		return <DangerButton onClick={handlePress}>{title}</DangerButton>
	}

	return <StyledButton onClick={handlePress}>{title}</StyledButton>
}

export default Button
