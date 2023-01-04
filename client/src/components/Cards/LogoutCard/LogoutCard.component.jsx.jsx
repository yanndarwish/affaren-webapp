import { useDispatch, useSelector } from "react-redux"
import { logout } from "../../../redux/features/login"
import { userLogout } from "../../../redux/features/user"
import Button from "../../common/Button/Button.component"
import { useNavigate } from "react-router-dom"
import { ColumnSpace, SpaceHeader, SubTitle } from "../../../assets/styles/common.styles"
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
			<ColumnSpace>
				<SubTitle>Logout</SubTitle>
				<Text>Are you sure you want to logout ?</Text>
			<SpaceHeader>
				<Button title="Cancel" color="error" onClick={handleCancel}></Button>
				<Button title="Logout" color="success" onClick={handleLogout}></Button>
			</SpaceHeader>
			</ColumnSpace>
		</Container>
	)
}

export default LogoutDialog
