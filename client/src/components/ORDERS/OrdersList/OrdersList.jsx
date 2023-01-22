import List from "@mui/material/List"
import Divider from "@mui/material/Divider"
import OrdersListItem from "./OrdersListItem"
import OrdersFilter from "./OrdersFilter"
import OrdersAddButton from "./OrdersAddButton"
import { useSelector } from "react-redux"
import { useEffect, useState } from "react"
import { FullCenter, SubTitle } from "../../../assets/common/common.styles"
import { Wrapper } from "./OrdersList.styles"

export default function OrdersList({
	orders,
	selected,
	setSelected,
	setAdd,
	setIsEdit,
	toggleList
}) {
	const [filteredOrders, setFilteredOrders] = useState([])
	const statusFilter = useSelector((state) => state.orders.statusFilter)
	const locationFilter = useSelector((state) => state.orders.locationFilter)

	const filterOrders = ({ statusFilter, locationFilter, orders }) => {
		let filters = [
			statusFilter && statusFilter,
			locationFilter && locationFilter,
		]

		let array = orders?.filter((order) => {
			// if both filter = all return orders
			if (statusFilter === "all" && locationFilter === "all") {
				return orders
			} else if (statusFilter === "all" && locationFilter !== "all") {
				// if statusfilter = all return array filtered only by locationFilter
				return order.order_location === filters[1]
			} else if (locationFilter === "all" && statusFilter !== "all") {
				// if locationfilter = all return array filtered only by status
				return order.order_status === filters[0]
			} else {
				// else couple the filters
				return (
					order.order_status === filters[0] &&
					order.order_location === filters[1]
				)
			}
		})

		setFilteredOrders(sortOrders(array))
	}

	const sortOrders = (orders) => {
		// sort by due_date
		let sorted = orders?.sort((a, b) => {
			if (a.order_due_date < b.order_due_date) {
				return -1
			}
			if (a.order_due_date > b.order_due_date) {
				return 1
			}
			// if date is the same, sort by due_time
			if (a.order_due_date === b.order_due_date) {
				if (a.order_due_time < b.order_due_time) {
					return -1
				}
				if (a.order_due_time > b.order_due_time) {
					return 1
				}
				return 0
			}
			return 0
		})
		return sorted
	}

	useEffect(() => {
		filterOrders({ statusFilter, locationFilter, orders })
	}, [statusFilter, locationFilter, orders])
	return (
		<>
			<Wrapper id='order-sidebar'>
				<List
					sx={{
						width: "100%",
						height: "100vh",
						overflow: "auto",
						bgcolor: "background.paper",
					}}
				>
					<OrdersAddButton
						selected={selected}
						setSelected={setSelected}
						setAdd={setAdd}
						toggleList={toggleList && toggleList}
					/>
					<Divider component="li" />
					<OrdersFilter
						selected={selected}
						setSelected={setSelected}
						setAdd={setAdd}
					/>
					<Divider component="li" />

					{!filteredOrders ? (
						<FullCenter>
							<SubTitle>No Orders</SubTitle>
						</FullCenter>
					) : (
						filteredOrders &&
						filteredOrders.map((order) => (
							<OrdersListItem
								key={order.order_id}
								order={order}
								selected={selected}
								setSelected={setSelected}
								setAdd={setAdd}
								setIsEdit={setIsEdit}
								toggleList={toggleList && toggleList}
							/>
						))
					)}
				</List>
			</Wrapper>
		</>
	)
}
