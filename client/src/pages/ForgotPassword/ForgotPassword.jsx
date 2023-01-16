import { CenterContainer } from "../../assets/common/common.styles"
import ForgotPasswordCard from "../../components/Cards/ForgotPasswordCard/ForgotPasswordCard"
import { useSelector } from "react-redux"

const ForgotPassword = () => {
	const theme = useSelector((state) => state.theme.theme)

	return (
		<CenterContainer theme={theme}>
			<ForgotPasswordCard theme={theme} />
		</CenterContainer>
	)
}

export default ForgotPassword
