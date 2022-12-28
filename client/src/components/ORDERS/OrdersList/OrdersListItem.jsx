import { Avatar, Divider, ListItem, ListItemAvatar, ListItemText, Typography } from "@mui/material"
import { Fragment } from "react"

const OrdersListItem = () => {
  return (
		<Fragment>
			<ListItem alignItems="flex-start">
				<ListItemAvatar>
					<Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
				</ListItemAvatar>
				<ListItemText
					primary="Brunch this weekend?"
					secondary={
						<Fragment>
							<Typography
								sx={{ display: "inline" }}
								component="span"
								variant="body2"
								color="text.primary"
							>
								Ali Connors
							</Typography>
							{" — I'll be in your neighborhood doing errands this…"}
						</Fragment>
					}
				/>
			</ListItem>
			<Divider variant="inset" component="li" />
		</Fragment>
	)
}

export default OrdersListItem
