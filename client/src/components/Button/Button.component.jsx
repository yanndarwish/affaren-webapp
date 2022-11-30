const Button = ({ title, color, onPress }) => {
	const handlePress = () => {
		onPress()
	}

	return <button onClick={handlePress}>{title}</button>
}

export default Button
