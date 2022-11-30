import LogoutDialog from "../../components/Card/LogoutCard/LogoutCard.component.jsx"
import { useSelector } from "react-redux"
import { CenterContainer } from "../../assets/styles/common.styles.js"

const Logout = () => {
	const theme = useSelector((state) => state.theme.theme)
	return (
		<CenterContainer theme={theme}>
			<LogoutDialog theme={theme} />
		</CenterContainer>
	)
}
export default Logout
