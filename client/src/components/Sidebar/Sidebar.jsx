import React, { useEffect, useState } from "react"
import Drawer from "@mui/material/Drawer"
import List from "@mui/material/List"
import Divider from "@mui/material/Divider"
import ListItem from "@mui/material/ListItem"
import ListItemButton from "@mui/material/ListItemButton"
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined"
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined"
import MenuIcon from "@mui/icons-material/Menu"
import { useSelector, useDispatch } from "react-redux"
import { toggleTheme } from "../../redux/features/theme"
import { useNavigate } from "react-router-dom"
import { sidebarItems, cookSidebarItems } from "./SidebarItems"
import { IconButton } from "@mui/material"
import { AppBar, Navbar } from "../../assets/common/common.styles"

const Sidebar = () => {
	const theme = useSelector((state) => state.theme.theme)
	const loggedIn = useSelector((state) => state.login.loggedIn)
	const user = useSelector((state) => state.user.user)
	const navigate = useNavigate()
	const dispatch = useDispatch()
	const [drawerIsOpen, setDrawerIsOpen] = useState(false)

	const handleDrawerToggle = () => {
		setDrawerIsOpen(!drawerIsOpen)
	}

	const handleNavClick = (route) => {
		navigate(route)
		setDrawerIsOpen(!drawerIsOpen)
	}

	const drawerWidth = 100

	const handleTheme = () => {
		dispatch(toggleTheme())
	}

	return (
		loggedIn && (
			<>
				{!drawerIsOpen && (
					<AppBar>
						<IconButton onClick={handleDrawerToggle}>
							<MenuIcon />
						</IconButton>
					</AppBar>
				)}
				<Navbar drawerIsOpen={drawerIsOpen}>
					<Drawer
						sx={{
							display: drawerIsOpen ? "block" : "none",
							width: drawerWidth,
							flexShrink: 0,
							"& .MuiDrawer-paper": {
								width: drawerWidth,
								boxSizing: "border-box",
							},
							zIndex: 2,
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
								onClick={handleDrawerToggle}
							>
								<IconButton onClick={handleDrawerToggle}>
									<MenuIcon />
								</IconButton>
							</ListItemButton>
						</ListItem>
						<Divider />

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
							{user?.user_role === "cook"
								? cookSidebarItems.map((item) => (
										<ListItem key={item.id} disablePadding>
											<ListItemButton
												sx={{
													minHeight: 72,
													justifyContent: "center",
													px: 2.5,
												}}
												onClick={() => handleNavClick(item.route)}
											>
												{item.icon}
											</ListItemButton>
										</ListItem>
								  ))
								: sidebarItems.map((item) => (
										<ListItem
											key={item.id}
											disablePadding
											sx={{ justifyContent: "center" }}
										>
											<ListItemButton
												sx={{
													minHeight: item.route === "closing" ? 60 : 72,
													maxWidth: item.route === "closing" ? 60 : "auto",
													justifyContent: "center",
													px: 2.5,
													aspectRatio: item.route === "closing" ? 1 : "auto",
													borderRadius: item.route === "closing" ? "50%" : "0",
													background:
														item.route === "closing"
															? "rgb(0, 0, 0, 0.1)"
															: "none",
													color: item.route === "closing" ? "red" : "auto",
												}}
												onClick={() => handleNavClick(item.route)}
											>
												{item.icon}
											</ListItemButton>
										</ListItem>
								  ))}
						</List>
					</Drawer>
				</Navbar>
			</>
		)
	)
}

export default Sidebar
