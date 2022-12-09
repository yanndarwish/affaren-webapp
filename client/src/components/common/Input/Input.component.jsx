import { TextField } from "@mui/material"

const Input = ({ label, value, onChange, type, fullWidth}) => {
	return (
		<TextField
			label={label}
			value={value}
			onChange={(e) => onChange(e.target.value)}
			type={type}
			fullWidth={fullWidth}
		/>
	)
}

export default Input
