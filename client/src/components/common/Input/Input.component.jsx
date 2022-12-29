import { TextField } from "@mui/material"

const Input = ({ id, className,label, placeholder, value, inputAdornment, onChange, onFocus, type="text", fullWidth, multiline, onClick}) => {
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
			placeholder={placeholder}
			InputProps={inputAdornment && inputAdornment}
		/>
	)
}

export default Input
