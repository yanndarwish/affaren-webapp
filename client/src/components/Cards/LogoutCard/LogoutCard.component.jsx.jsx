import { useDispatch, useSelector } from "react-redux"
import { logout } from "../../../redux/features/login"
import { userLogout } from "../../../redux/features/user"
import Button from "../../common/Button/Button.component"
import { useNavigate } from "react-router-dom"
import {
	ColumnSpace,
	FixedSpaceHeader,
	SubTitle,
} from "../../../assets/common/common.styles"
import { Container, Text } from "../Card.styles"
import { useEffect } from "react"
import { resetSale } from "../../../redux/features/sale"
import { resetCards } from "../../../redux/features/cards"
import { resetDashboard } from "../../../redux/features/dashboard"
import { resetOrders } from "../../../redux/features/orders"

const LogoutDialog = ({ theme }) => {
	const loggedIn = useSelector((state) => state.login.loggedIn)
	const dispatch = useDispatch()
	const navigate = useNavigate()

	const redirect = () => {
		!loggedIn && navigate("/login")
	}

	const handleCancel = () => {
		navigate("/dashboard")
	}

	const handleLogout = () => {
		dispatch(logout())
		dispatch(userLogout())
		dispatch(resetSale())
		dispatch(resetCards())
		dispatch(resetDashboard())
		dispatch(resetOrders())
		navigate("/login")
		window.location.reload()
	}

	useEffect(() => {
		redirect()
	}, [])

	return (
		<Container theme={theme}>
			<ColumnSpace>
				<SubTitle>Logout</SubTitle>
				<Text>Are you sure you want to logout ?</Text>
				<FixedSpaceHeader>
					<Button title="Cancel" color="error" onClick={handleCancel}></Button>
					<Button
						title="Logout"
						color="success"
						onClick={handleLogout}
					></Button>
				</FixedSpaceHeader>
			</ColumnSpace>
		</Container>
	)
}

export default LogoutDialog
