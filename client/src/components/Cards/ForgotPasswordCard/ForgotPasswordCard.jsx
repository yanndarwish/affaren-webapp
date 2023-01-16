import { Container, Text } from "../Card.styles"
import { useState } from "react"
import {
	ColumnCenter,
	ColumnSpace,
	SubTitle,
} from "../../../assets/common/common.styles"
import Button from "../../common/Button/Button.component"
import Input from "../../common/Input/Input.component"
import { useForgotPasswordMutation } from "../../../redux/services/loginApi"
import { Link } from "react-router-dom"

const ForgotPasswordCard = ({ theme }) => {
	const [email, setEmail] = useState("")
	const [forgotPassword, res] = useForgotPasswordMutation()

	const handleSubmit = () => {
		forgotPassword({ email: email })
	}
	return (
		<Container theme={theme}>
			<ColumnSpace>
				<SubTitle theme={theme}>Password Forgotten</SubTitle>
				{res.isSuccess ? (
					<>
						<Text>A mail has been sent to your email</Text>
						<Link to="/">Sign in</Link>
					</>
				) : res.isError ? (
					<>
						<Text>{res.error.data}</Text>
						<Link to="/">Sign in</Link>
					</>
				) : (
					<>
						<ColumnCenter>
							<Text>Enter your email to receive a recovery link</Text>
							<Input
								label="Email"
								value={email}
								theme={theme}
								onChange={setEmail}
								fullWidth
							/>
							<Link to="/">Sign in</Link>
						</ColumnCenter>
						<Button title="Submit" color="success" onClick={handleSubmit} />
					</>
				)}
			</ColumnSpace>
		</Container>
	)
}

export default ForgotPasswordCard
