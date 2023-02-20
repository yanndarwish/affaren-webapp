import { TextField } from "@mui/material"

const Input = ({
	id,
	className,
	label,
	placeholder,
	value,
	inputAdornment,
	onChange,
	onFocus,
	type = "text",
	fullWidth,
	multiline,
	onClick,
	error,
	helperText
}) => {
	return (
		<TextField
			error={error && error}
			id={id}
			className={className}
			label={label && label}
			value={value && value}
			onChange={onChange && ((e) => onChange(e.target.value))}
			type={type}
			fullWidth={fullWidth}
			multiline={multiline}
			onClick={onClick}
			placeholder={placeholder}
			InputProps={inputAdornment && inputAdornment}
			helperText={helperText}
		/>
	)
}

export default Input
