import { useEffect } from "react"
import { useState } from "react"
import { useSelector } from "react-redux"
import {
	FullFlex,
} from "../../assets/common/common.styles"

import { useNavigate } from "react-router-dom"
import LunchMain from "../../components/LUNCH/LunchMain/LunchMain"
import LunchAside from "../../components/LUNCH/LunchAside/LunchAside"
import { useGetActiveTablesQuery } from "../../redux/services/tablesApi"

const Lunch = () => {
	const loggedIn = useSelector((state) => state.login.loggedIn)
	const theme = useSelector((state) => state.theme.theme)
	const [tableIds, setTableIds] = useState([])
	const { data } = useGetActiveTablesQuery()

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
		redirect()
	}, [])

	return (
		<FullFlex>
			<LunchMain theme={theme} ids={tableIds} />
			<LunchAside theme={theme} ids={tableIds} />
		</FullFlex>
	)
}

export default Lunch
