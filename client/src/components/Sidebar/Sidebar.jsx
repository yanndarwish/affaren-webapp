import * as React from "react"
import { styled } from "@mui/material/styles"
import MuiAppBar from "@mui/material/AppBar"
import Toolbar from "@mui/material/Toolbar"
import List from "@mui/material/List"
import IconButton from "@mui/material/IconButton"
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft"
import ListItemButton from "@mui/material/ListItemButton"
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined"
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined"

import Drawer from "@mui/material/Drawer"
import Divider from "@mui/material/Divider"
import ListItem from "@mui/material/ListItem"

import CssBaseline from "@mui/material/CssBaseline"
import MenuIcon from "@mui/icons-material/Menu"
import { useSelector, useDispatch } from "react-redux"
import { toggleTheme } from "../../redux/features/theme"
import { useNavigate } from "react-router-dom"
import { sidebarItems, cookSidebarItems } from "./SidebarItems"
import { DailyTotal } from "./dailyTotal"
import { Stack } from "@mui/material"
import { useSession } from "../../lib/hooks/useSession"
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined"
import { ModalLogout } from "../Cards/ModalLogout/ModalLogout"
import { useModal } from "../shared/modal"

const drawerWidth = 200

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })(
	({ theme }) => ({
		flexGrow: 1,
		marginTop: 64,
		padding: theme.spacing(3),
		transition: theme.transitions.create("margin", {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.leavingScreen,
		}),
		// marginLeft: `-${drawerWidth}px`,
		variants: [
			{
				props: ({ open }) => open,
				style: {
					// width: `calc(100% - ${drawerWidth}px)`,
					// marginLeft: `${drawerWidth}px`,
					transition: theme.transitions.create("margin", {
						easing: theme.transitions.easing.easeOut,
						duration: theme.transitions.duration.enteringScreen,
					}),
					marginLeft: drawerWidth,
				},
			},
		],
	})
)

const AppBar = styled(MuiAppBar, {
	shouldForwardProp: (prop) => prop !== "open",
})(({ theme }) => ({
	transition: theme.transitions.create(["margin", "width"], {
		easing: theme.transitions.easing.sharp,
		duration: theme.transitions.duration.leavingScreen,
	}),
	backgroundColor: "white",
	boxShadow: "none",
	borderBottom: "1px solid #e0e0e0",
	variants: [
		{
			props: ({ open }) => open,
			style: {
				width: `calc(100% - ${drawerWidth}px)`,
				marginLeft: `${drawerWidth}px`,
				transition: theme.transitions.create(["margin", "width"], {
					easing: theme.transitions.easing.easeOut,
					duration: theme.transitions.duration.enteringScreen,
				}),
			},
		},
	],
}))

const DrawerHeader = styled("div")(({ theme }) => ({
	display: "flex",
	alignItems: "center",
	padding: theme.spacing(0, 1),
	// necessary for content to be below app bar
	...theme.mixins.toolbar,
	justifyContent: "flex-end",
}))

const Sidebar = ({ open, setOpen, children }) => {
	const { isLoggedIn } = useSession()
	const navigate = useNavigate()
	const modalLogout = useModal()

	const handleDrawerOpen = () => {
		setOpen(true)
	}

	const handleDrawerClose = () => {
		setOpen(false)
	}

	const handleNavClick = (route) => {
		navigate(route)
		setOpen(!open)
	}

	const handleClickLogout = () => {
		modalLogout.openModal()
	}

	const handleLogout = () => {
		setOpen(false)
	}

	const drawerWidth = 200

	return (
		<>
			<CssBaseline />
			{isLoggedIn && (
				<AppBar position="fixed" open={open}>
					<Toolbar>
						<IconButton
							aria-label="open drawer"
							onClick={handleDrawerOpen}
							edge="start"
							sx={[
								{
									mr: 2,
								},
								open && { display: "none" },
							]}
						>
							<MenuIcon />
						</IconButton>
						<Stack
							direction="row"
							justifyContent="center"
							alignItems="center"
							sx={{ ml: open ? 26 : 0 }}
							className="w-full"
						>
							<DailyTotal />
						</Stack>
					</Toolbar>
				</AppBar>
			)}
			<Drawer
				sx={{
					width: open ? drawerWidth : 0,
					flexShrink: 0,
					"& .MuiDrawer-paper": {
						width: open ? drawerWidth : 0,
						boxSizing: "border-box",
					},
				}}
				variant="persistent"
				anchor="left"
				open={open}
			>
				<DrawerHeader>
					<IconButton onClick={handleDrawerClose}>
						<ChevronLeftIcon />
					</IconButton>
				</DrawerHeader>
				<Divider />
				<List>
					{sidebarItems.map((item) => (
						<ListItem
							key={item.id}
							disablePadding
							sx={{ justifyContent: "start" }}
						>
							<ListItemButton
								sx={{
									display: "flex",
									gap: "1em",
									minHeight: 72,
									px: 2.5,
									aspectRatio: "auto",
									borderRadius: "0",
									color: item.route === "logout" ? "red" : "auto",
								}}
								onClick={() => handleNavClick(item.route)}
							>
								{item.icon} {item.label}
							</ListItemButton>
						</ListItem>
					))}
					<ListItemButton
						sx={{
							display: "flex",
							gap: "1em",
							minHeight: 72,
							px: 2.5,
							aspectRatio: "auto",
							borderRadius: "0",
							color: "red",
						}}
						onClick={handleClickLogout}
					>
						<LogoutOutlinedIcon /> Logout
					</ListItemButton>
				</List>
			</Drawer>
			<Main open={open}>{children}</Main>
			<ModalLogout controller={modalLogout} onLogout={handleLogout} />
		</>
	)
}

export default Sidebar
