import { useEffect } from "react"
import { useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { FullFlex } from "../../assets/common/common.styles"

import { useNavigate } from "react-router-dom"
import LunchMain from "../../components/LUNCH/LunchMain/LunchMain"
import LunchAside from "../../components/LUNCH/LunchAside/LunchAside"
import { useGetActiveTablesProductsMutation } from "../../redux/services/tableProductsApi"
import TableRestaurantOutlinedIcon from "@mui/icons-material/TableRestaurantOutlined"
import {
	setTargetTable,
} from "../../redux/features/tableProducts"
import Button from "../../components/common/Button/Button.component"
import { ButtonWrapper } from "../../components/LUNCH/LunchAside/LunchAside.styles"

const Lunch = () => {
	const navigate = useNavigate()
	const dispatch = useDispatch()
	const loggedIn = useSelector((state) => state.login.loggedIn)
	const theme = useSelector((state) => state.theme.theme)
	const [done, setDone] = useState(false)
	const activeDishes = useSelector(
		(state) => state.tableProducts.activeTablesProducts
	)
 	const targetTable = useSelector((state) => state.tableProducts.targetTable)
	const [isSideOpen, setIsSideOpen] = useState(true)
	const [todoDishes, setTodoDishes] = useState([])
	const [notif, setNotif] = useState(0)
	const [getActiveDishes, res] = useGetActiveTablesProductsMutation()

	const toggleSide = () => {
		setIsSideOpen(!isSideOpen)
	}

	const getDishesToDo = () => {
		let todo = []
		let copy = Object.assign([], activeDishes)
		todo = copy?.filter((product) => product.dish_category !== "formula")
		if (!done && activeDishes.length > 0) {
			setTodoDishes(todo)
			setDone(true)
		}
		if (!targetTable && activeDishes.length > 0) {
			// console.log("if")
			// console.log(todo)
			// setTodoDishes(todo)
			// setDone(true)
		} else {
			const totalTodos = Object.assign([], todoDishes)
			let todos = totalTodos.filter((item) => item.table_id !== targetTable)

			todo.forEach((dish) => {
				todos.push(dish)
			})
			setTodoDishes(todos)
		}
		setNotif(todo.length)
		var mp3_url =
			"https://media.geeksforgeeks.org/wp-content/uploads/20190531135120/beep.mp3"

		new Audio(mp3_url).play()

		res.reset()
		dispatch(setTargetTable(""))
	}

	const redirect = () => {
		!loggedIn && navigate("/login")
	}

	useEffect(() => {
		console.log('heya')
		getDishesToDo()
	}, [activeDishes])

	useEffect(() => {
		getActiveDishes()
		redirect()
	}, [])

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
