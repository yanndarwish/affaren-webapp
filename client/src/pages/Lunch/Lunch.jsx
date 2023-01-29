import { useEffect } from "react"
import { useState } from "react"
import { useSelector } from "react-redux"
import { FullFlex } from "../../assets/common/common.styles"

import { useNavigate } from "react-router-dom"
import LunchMain from "../../components/LUNCH/LunchMain/LunchMain"
import LunchAside from "../../components/LUNCH/LunchAside/LunchAside"
import { useGetActiveTablesProductsMutation } from "../../redux/services/tableProductsApi"
import TableRestaurantOutlinedIcon from "@mui/icons-material/TableRestaurantOutlined"
import Button from "../../components/common/Button/Button.component"
import { ButtonWrapper } from "../../components/LUNCH/LunchAside/LunchAside.styles"
import Notif from "../../assets/sound/Notif.mp3"
import InfoMessage from "../../components/common/InfoMessage/InfoMessage"

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
	const audioFile = new Audio(Notif)
	const [getActiveDishes, res] = useGetActiveTablesProductsMutation()

	const redirect = () => {
		!loggedIn && navigate("/login")
	}

	const toggleSide = () => {
		setIsSideOpen(!isSideOpen)
	}

	const playAudio = () => {
		audioFile?.play()
	}

	useEffect(() => {
		setTodoDishes(activeDishes)
		playAudio()
	}, [activeDishes])

	useEffect(() => {
		setTimeout(() => {
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
			{res.isError && (
				<InfoMessage state="error" text="Failed to fetch active dishes" />
			)}
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
