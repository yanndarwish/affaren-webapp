import { useEffect } from "react"
import { useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { FullFlex } from "../../assets/common/common.styles"

import { useNavigate } from "react-router-dom"
import LunchMain from "../../components/LUNCH/LunchMain/LunchMain"
import LunchAside from "../../components/LUNCH/LunchAside/LunchAside"
import { useGetActiveTablesProductsMutation } from "../../redux/services/tableProductsApi"
import TableRestaurantOutlinedIcon from "@mui/icons-material/TableRestaurantOutlined"
import { setTargetTable } from "../../redux/features/tableProducts"
import Button from "../../components/common/Button/Button.component"
import { ButtonWrapper } from "../../components/LUNCH/LunchAside/LunchAside.styles"

const Lunch = () => {
	const navigate = useNavigate()
	const loggedIn = useSelector((state) => state.login.loggedIn)
	const theme = useSelector((state) => state.theme.theme)
	const activeDishes = useSelector(
		(state) => state.tableProducts.activeTablesProducts
	)
	const lunchUpdate = useSelector((state) => state.tableProducts.lunchUpdate)
	const [isSideOpen, setIsSideOpen] = useState(true)
	const [todoDishes, setTodoDishes] = useState([])
	const [notif, setNotif] = useState(0)
	const [getActiveDishes, res] = useGetActiveTablesProductsMutation()

	const redirect = () => {
		!loggedIn && navigate("/login")
	}

	const toggleSide = () => {
		setIsSideOpen(!isSideOpen)
	}

	useEffect(() => {
		console.log("updating state")
			setTodoDishes(activeDishes)

	}, [activeDishes])

	useEffect(() => {
		console.log(lunchUpdate)
		setTimeout(() => {
			console.log("Delayed for 1/2 second.")
			getActiveDishes()
		}, "500")
	}, [lunchUpdate])

	useEffect(() => {
		redirect()
	}, [])

	console.log(activeDishes)
	console.log(todoDishes)
	return (
		<FullFlex>
			<ButtonWrapper>
				<Button title={<TableRestaurantOutlinedIcon />} onClick={toggleSide} />
			</ButtonWrapper>
			<LunchMain
				theme={theme}
				dishes={todoDishes}
				notif={notif}
				setNotif={setNotif}
			/>
			{isSideOpen && <LunchAside theme={theme} dishes={todoDishes} />}
		</FullFlex>
	)
}

export default Lunch
