import { TextField } from "@mui/material"

const Input = ({ label, value, onChange, type}) => {
	console.log(type)
	return (
		<TextField
			label={label}
			value={value}
			onChange={(e) => onChange(e.target.value)}
			type={type}
		/>
	)
}

export default Input
