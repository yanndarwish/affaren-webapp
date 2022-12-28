import * as React from "react"
import List from "@mui/material/List"
import ListItem from "@mui/material/ListItem"
import Divider from "@mui/material/Divider"
import ListItemText from "@mui/material/ListItemText"
import ListItemAvatar from "@mui/material/ListItemAvatar"
import Avatar from "@mui/material/Avatar"
import Typography from "@mui/material/Typography"
import OrdersListItem from "./OrdersListItem"
import { useState } from "react"
import AddIcon from "@mui/icons-material/Add"
import Add from "@mui/icons-material/Add"

export default function OrdersList({ orders, selected, setSelected, setAdd }) {
	const handleClick = () => {
		setAdd(true)
	}
	return (
		<List
			sx={{
				width: "100%",
				maxWidth: 360,
				height: "100vh",
				bgcolor: "background.paper",
			}}
		>
			<ListItem
				alignItems="center"
				sx={{ justifyContent: "center", paddingBlock: 2.5 }}
				onClick={handleClick}
			>
				<AddIcon />
			</ListItem>
			<Divider component="li" />

			{orders &&
				orders.map((order) => (
					<OrdersListItem
						key={order.order_id}
						order={order}
						selected={selected}
						setSelected={setSelected}
						setAdd={setAdd}
					/>
				))}
		</List>
	)
}
