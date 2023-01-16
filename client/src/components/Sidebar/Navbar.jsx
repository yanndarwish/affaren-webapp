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
import { navbarItems, cookNavbarItems } from "./NavbarItems"
import { IconButton } from "@mui/material"
import { AppBar } from "../../assets/common/common.styles"

const Navbar = () => {
	const theme = useSelector((state) => state.theme.theme)
	const loggedIn = useSelector((state) => state.login.loggedIn)
	const user = useSelector((state) => state.user.user)
	const navigate = useNavigate()
	const dispatch = useDispatch()
	const [mobile, setMobile] = useState(false)
	const [drawerIsOpen, setDrawerIsOpen] = useState(false)

	const handleDrawerToggle = () => {
		setDrawerIsOpen(!drawerIsOpen)
	}

	const drawerWidth = 100

	const handleTheme = () => {
		dispatch(toggleTheme())
	}

	useEffect(() => {
		setMobile(window.innerWidth < 769)
	}, [window.innerWidth])

	return (
		loggedIn &&
		(mobile ? (
			<>
				{!drawerIsOpen && (
					<AppBar>
						<IconButton onClick={handleDrawerToggle}>
							<MenuIcon />
						</IconButton>
					</AppBar>
				)}
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
							? cookNavbarItems.map((item) => (
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
							  ))
							: navbarItems.map((item) => (
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
			</>
		) : (
			<Drawer
				sx={{
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
						? cookNavbarItems.map((item) => (
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
						  ))
						: navbarItems.map((item) => (
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
		))
	)
}

export default Navbar
