import { useDispatch, useSelector } from "react-redux"
import { logout } from "../../../redux/features/login"
import { userLogout } from "../../../redux/features/user"
import Button from "../../Button/Button.component"
import { useNavigate } from "react-router-dom"
import { SubTitle } from "../../../assets/styles/common.styles"
import { Container, Footer, Text } from "../Card.styles"

const LogoutDialog = ({ theme }) => {
	const loggedIn = useSelector((state) => state.login.loggedIn)
	const dispatch = useDispatch()
	const navigate = useNavigate()

	const handleCancel = () => {
		navigate("/dashboard")
	}

	const handleLogout = () => {
		dispatch(logout())
		dispatch(userLogout())
		navigate("/login")
	}

	return (
		<Container theme={theme}>
			<div>
				<SubTitle>Logout</SubTitle>
			</div>
			<div>
				<Text>Are you sure you want to logout ?</Text>
			</div>
			<Footer>
				<Button title="Cancel" color="error" onPress={handleCancel}></Button>
				<Button title="Logout" color="success" onPress={handleLogout}></Button>
			</Footer>
		</Container>
	)
}

export default LogoutDialog
