import React from "react"
import Drawer from "@mui/material/Drawer"
import List from "@mui/material/List"
import Divider from "@mui/material/Divider"
import ListItem from "@mui/material/ListItem"
import ListItemButton from "@mui/material/ListItemButton"
import ListItemIcon from "@mui/material/ListItemIcon"
import InboxIcon from "@mui/icons-material/MoveToInbox"
import MailIcon from "@mui/icons-material/Mail"
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined"
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined"
import { useSelector, useDispatch } from "react-redux"
import { toggleTheme } from "../../redux/features/theme"
import router from "../../router/router"
import { useNavigate } from "react-router-dom"
import { navbarItems } from "./NavbarItems"

const Navbar = () => {
	const theme = useSelector((state) => state.theme.theme)
	const loggedIn = useSelector((state) => state.login.loggedIn)
	const navigate = useNavigate()
	const dispatch = useDispatch()

	const drawerWidth = 100

	const handleTheme = () => {
		dispatch(toggleTheme())
	}

	return (
		<Drawer
			sx={{
				width: drawerWidth,
				flexShrink: 0,
				"& .MuiDrawer-paper": {
					width: drawerWidth,
					boxSizing: "border-box",
				},
			}}
			variant="permanent"
			anchor="left"
		>
			<ListItem disablePadding>
				<ListItemButton
					sx={{
						minHeight: 72,
						justifyContent: "center",
						px: 2.5,
					}}
					onClick={handleTheme}
				>
					{theme === "dark" ? (
						<DarkModeOutlinedIcon />
					) : (
						<LightModeOutlinedIcon />
					)}
				</ListItemButton>
			</ListItem>
			<Divider />
			<List>
				{navbarItems.map((item) => (
					<ListItem key={item.id} disablePadding>
						<ListItemButton
							sx={{
								minHeight: 72,
								justifyContent: "center",
								px: 2.5,
							}}
							onClick={() => navigate(item.route)}
						>
							{item.icon}
						</ListItemButton>
					</ListItem>
				))}
			</List>
		</Drawer>
	)
}

export default Navbar
