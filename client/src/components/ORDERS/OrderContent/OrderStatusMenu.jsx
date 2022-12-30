import { Menu, MenuItem, Button } from "@mui/material"
import { useState } from "react"
import { useUpdateOrderMutation } from "../../../redux/services/orderApi"

const OrderStatusMenu = ({ order }) => {
	const [anchorEl, setAnchorEl] = useState(null)
    const [status, setStatus] = useState(order && order.order_status)
	const allStatus = ["todo", "pending", "done", "picked-up"]
	const [updateOrder] = useUpdateOrderMutation()
	const open = Boolean(anchorEl)
	const handleClick = (e) => {
		setAnchorEl(e.currentTarget)
	}
	const handleClose = () => {
		setAnchorEl(null)
	}

	const handleUpdateStatus = (status) => {
		const newOrder = {
			title: order.order_title,
			description: order.order_description,
			status: status,
			dueDate: order.order_due_date,
			dueTime: order.order_due_time,
			clientPhone: order.order_client_phone,
			clientName: order.order_client_name,
			orderLocation: order.order_location,
		}
		console.log(newOrder)
        setStatus(status)
		updateOrder({ payload: newOrder, id: order.order_id })
		setAnchorEl(null)
	}
	return (
		<div>
			<Button variant="contained" onClick={(e) => handleClick(e)}>
				{status}
			</Button>
			<Menu
				anchorEl={anchorEl}
				open={open}
				onClose={handleClose}
				anchorOrigin={{
					vertical: "top",
					horizontal: "left",
				}}
				transformOrigin={{
					vertical: "top",
					horizontal: "left",
				}}
			>
				{allStatus
					.filter((item) => order && item !== status)
					.map((item) => (
						<MenuItem key={item} onClick={() => handleUpdateStatus(item)}>
							{item}
						</MenuItem>
					))}
			</Menu>
		</div>
	)
}

export default OrderStatusMenu
