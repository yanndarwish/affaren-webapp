import { TextField } from "@mui/material"

const Input = ({ id, label, value, inputAdornment, onChange, type, fullWidth, onClick}) => {
	return (
		<TextField
			id={id}
			label={label}
			value={value}
			onChange={onChange && ((e) => onChange(e.target.value))}
			type={type}
			fullWidth={fullWidth}
			onClick={onClick}
			InputProps={
				inputAdornment && inputAdornment
			}
		/>
	)
}

export default Input
