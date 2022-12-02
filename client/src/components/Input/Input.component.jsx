const Input = ({ value, onChange, secure = false, theme, style }) => {
	return (
		<input
			value={value}
			onChange={(e) => onChange(e.target.value)}
			type={secure ? "password" : "text"}
		/>
	)
}

export default Input
