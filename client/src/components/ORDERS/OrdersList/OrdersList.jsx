import * as React from "react"
import List from "@mui/material/List"
import ListItem from "@mui/material/ListItem"
import Divider from "@mui/material/Divider"
import OrdersListItem from "./OrdersListItem"
import OrdersFilter from "./OrdersFilter"
import OrdersAddButton from "./OrdersAddButton"

export default function OrdersList({
	orders,
	selected,
	setSelected,
	setAdd,
	setIsEdit,
}) {
	
	return (
		<List
			sx={{
				width: "100%",
				maxWidth: 360,
				height: "100vh",
				bgcolor: "background.paper",
			}}
		>
			<OrdersAddButton
				selected={selected}
				setSelected={setSelected}
				setAdd={setAdd}
			/>
			<Divider component="li" />
			<OrdersFilter
				selected={selected}
				setSelected={setSelected}
				setAdd={setAdd}
			/>
			<Divider component="li" />

			{orders &&
				orders.map((order) => (
					<OrdersListItem
						key={order.order_id}
						order={order}
						selected={selected}
						setSelected={setSelected}
						setAdd={setAdd}
						setIsEdit={setIsEdit}
					/>
				))}
		</List>
	)
}
