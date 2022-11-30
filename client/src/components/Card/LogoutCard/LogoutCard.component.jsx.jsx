import { useDispatch, useSelector } from "react-redux"
import { logout } from "../../../redux/features/login"
import { userLogout } from "../../../redux/features/user"
import Button from "../../Button/Button.component"
import { useNavigate } from "react-router-dom"

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
		<div>
			<div>
				<h1>Logout</h1>
			</div>
			<div>
				<p>Are you sure you want to logout ?</p>
			</div>
			<div>
				<Button title="Cancel" color="red" onPress={handleCancel}></Button>
				<Button title="Logout" color="green" onPress={handleLogout}></Button>
			</div>
		</div>
	)
}

export default LogoutDialog
