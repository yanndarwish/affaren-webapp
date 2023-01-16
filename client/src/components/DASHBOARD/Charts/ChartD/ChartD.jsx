import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import {
	Body,
	SpaceHeader,
	SubTitle,
} from "../../../../assets/common/common.styles"
import AreaChart from "./AreaChart"

const ChartD = ({ theme }) => {
	const dashboard = useSelector((state) => state.dashboard)
	const users = useSelector((state) => state.user.users)
	const [sortedByUser, setSortedByUser] = useState([])

	const createUsersSalesArrays = ({ data, users }) => {
		let sortedByUser = []
		users?.forEach((user) => {
			let userSales = []
			data?.forEach((sale) => {
				if (sale.sale_user === user.user_first_name) {
					userSales.push(sale)
				}
			})
			sortedByUser.push(userSales)
		})
		return sortedByUser
	}

	useEffect(() => {
		setSortedByUser(
			createUsersSalesArrays({ data: dashboard.fullArray, users: users })
		)
	}, [dashboard.fullArray, users])

	return (
		<Body theme={theme} style={{ width: "100%", height: "100%" }}>
			<SpaceHeader>
				<SubTitle>Users Performances</SubTitle>
			</SpaceHeader>
			<AreaChart data={sortedByUser} theme={theme} />
		</Body>
	)
}

export default ChartD
