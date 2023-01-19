import { useEffect } from "react"
import { useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { FullFlex, Notification } from "../../assets/common/common.styles"

import { useNavigate } from "react-router-dom"
import LunchMain from "../../components/LUNCH/LunchMain/LunchMain"
import LunchAside from "../../components/LUNCH/LunchAside/LunchAside"
import { useGetActiveTablesProductsMutation } from "../../redux/services/tableProductsApi"

import { setUpdateOrder } from "../../redux/features/tableProducts"

const Lunch = () => {
	const navigate = useNavigate()
	const dispatch = useDispatch()
	const loggedIn = useSelector((state) => state.login.loggedIn)
	const theme = useSelector((state) => state.theme.theme)
	const updateProducts = useSelector((state) => state.tableProducts.updateOrder)
	const activeDishes = useSelector(
		(state) => state.tableProducts.activeTablesProducts
	)
	const [todoDishes, setTodoDishes] = useState([])
	const [notif, setNotif] = useState(0)
	const [getActiveDishes, res] = useGetActiveTablesProductsMutation()

	const getDishesToDo = () => {
		if (activeDishes?.length > 0) {
			let copy = Object.assign([], activeDishes)
			const todo = copy?.filter(
				(product) =>
					product.dish_status !== "done" && product.dish_category !== "formula"
			)
			setTodoDishes(todo)
			setNotif(todo.length)
			var mp3_url =
				"https://media.geeksforgeeks.org/wp-content/uploads/20190531135120/beep.mp3"

			new Audio(mp3_url).play()
		}
	}

	const redirect = () => {
		!loggedIn && navigate("/login")
	}

	useEffect(() => {
		if (updateProducts) {
			getActiveDishes()
			dispatch(setUpdateOrder({ order: false }))
		}
	}, [updateProducts])

	useEffect(() => {
		getDishesToDo()
	}, [activeDishes])

	useEffect(() => {
		getActiveDishes()
		redirect()
	}, [])

	return (
		<FullFlex>
			<Notification>{notif}</Notification>
			<LunchMain theme={theme} dishes={todoDishes} />
			<LunchAside
				theme={theme}
				dishes={todoDishes}
			/>
		</FullFlex>
	)
}

export default Lunch
