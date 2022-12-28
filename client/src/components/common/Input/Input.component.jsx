import { TextField } from "@mui/material"

const Input = ({ id, className,label, value, inputAdornment, onChange, type="text", fullWidth, multiline, onClick}) => {
	return (
		<TextField
			id={id}
			className={className}
			label={label && label}
			value={value}
			onChange={onChange && ((e) => onChange(e.target.value))}
			type={type}
			fullWidth={fullWidth}
			multiline={multiline}
			onClick={onClick}
			InputProps={inputAdornment && inputAdornment}
		/>
	)
}

export default Input
