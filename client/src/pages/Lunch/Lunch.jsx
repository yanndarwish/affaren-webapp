import { useEffect } from "react"
import { useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import {
	FullFlex, Notification,
} from "../../assets/common/common.styles"

import { useNavigate } from "react-router-dom"
import LunchMain from "../../components/LUNCH/LunchMain/LunchMain"
import LunchAside from "../../components/LUNCH/LunchAside/LunchAside"
import { useGetActiveTablesQuery } from "../../redux/services/tablesApi"
import { useGetActiveTablesProductsQuery } from "../../redux/services/tableProductsApi"
import { setUpdateOrder } from "../../redux/features/tableProducts"

const Lunch = () => {
	const dispatch = useDispatch()
	const loggedIn = useSelector((state) => state.login.loggedIn)
	const theme = useSelector((state) => state.theme.theme)
	const updateProducts = useSelector(state => state.tableProducts.updateOrder)
	const [tableIds, setTableIds] = useState([])
	const [skip, setSkip] = useState(true)
	const [notif, setNotif] = useState(0)
	const { data } = useGetActiveTablesQuery()
	useGetActiveTablesProductsQuery({}, {skip})

	const getActiveTablesIds = (data) => {
		let ids = []
		data?.forEach((table) => {
			ids.push(table.table_id)
		})
		setTableIds(ids)
	}

	const navigate = useNavigate()

	const redirect = () => {
		!loggedIn && navigate("/login")
	}

	useEffect(() => {
		if (data?.length > 0) {
			getActiveTablesIds(data)
		}
	}, [data])

	useEffect(() => {
		setSkip(!updateProducts)
		if (updateProducts) {
			setNotif(notif+1)
			dispatch(setUpdateOrder({order:false}))
			var mp3_url =
				"https://media.geeksforgeeks.org/wp-content/uploads/20190531135120/beep.mp3"

			new Audio(mp3_url).play()
		}
	}, [updateProducts])

	useEffect(() => {
		redirect()
	}, [])

	return (
		<FullFlex>
			<Notification>{notif}</Notification>
			<LunchMain theme={theme} ids={tableIds} />
			<LunchAside theme={theme} ids={tableIds} setNotif={setNotif} notif={notif}/>
		</FullFlex>
	)
}

export default Lunch
