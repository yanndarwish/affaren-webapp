import { TextField } from "@mui/material"

const Input = ({ label, value, onChange, secure = false, theme, style }) => {
	return (
		<TextField
			label={label}
			value={value}
			onChange={(e) => onChange(e.target.value)}
			type={secure ? "password" : "text"}
		/>
	)
}

export default Input
