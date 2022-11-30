import LogoutDialog from "../../components/Card/LogoutCard/LogoutCard.component.jsx"
import { useSelector } from "react-redux"

const Logout = () => {
	const theme = useSelector((state) => state.theme.theme)
	return (
		<div>
			<LogoutDialog theme={theme} />
		</div>
	)
}
export default Logout
