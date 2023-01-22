import {
	Avatar,
	Divider,
	ListItem,
	ListItemAvatar,
	ListItemText,
	Typography,
} from "@mui/material"
import { Fragment } from "react"

const OrdersListItem = ({
	order,
	selected,
	setSelected,
	setAdd,
	setIsEdit,
	toggleList,
}) => {
	const handleClick = (e) => {
		const orderId = e.target.dataset.id
			? e.target.dataset.id
			: e.target.parentNode.dataset.id
		setSelected(orderId)
		setAdd(false)
		setIsEdit(false)
		toggleList && toggleList()
	}

	return (
		<Fragment key={order.order_id}>
			<ListItem
				selected={parseInt(selected) === order.order_id}
				alignItems="flex-start"
				onClick={handleClick}
				data-id={order.order_id}
			>
				<ListItemAvatar data-id={order.order_id}>
					<Avatar
						alt={order && order.order_client_name}
						src="/static/images/avatar/1.jpg"
						data-id={order.order_id}
					/>
				</ListItemAvatar>
				<ListItemText
					data-id={order.order_id}
					primary={
						<Typography
							sx={{ display: "inline" }}
							component="span"
							variant="h6"
							color="text.primary"
							data-id={order.order_id}
						>
							{order.order_title}
						</Typography>
					}
					secondary={
						<Fragment key={order.order_id}>
							<Typography
								sx={{ display: "inline" }}
								component="span"
								variant="body2"
								color="text.primary"
								data-id={order.order_id}
							>
								{order.order_due_date} {order.order_due_time + " "}
							</Typography>
							{order.order_description &&
								order.order_description.map((item) => item + " ")}
						</Fragment>
					}
				/>
			</ListItem>
			<Divider variant="inset" component="li" />
		</Fragment>
	)
}

export default OrdersListItem
