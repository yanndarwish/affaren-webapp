import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined"
import PieChartOutlineOutlinedIcon from "@mui/icons-material/PieChartOutlineOutlined"
import Inventory2OutlinedIcon from "@mui/icons-material/Inventory2Outlined"
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined"
import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined"
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined"
import LoginOutlinedIcon from "@mui/icons-material/LoginOutlined"

export const navbarItems = [
	{
		id: 0,
		icon: <HomeOutlinedIcon />,
		route: "pos",
	},
	{
		id: 1,
		icon: <PieChartOutlineOutlinedIcon />,
		route: "dashboard",
	},
	{
		id: 2,
		icon: <Inventory2OutlinedIcon />,
		route: "inventory",
	},
	{
		id: 3,
		icon: <PersonOutlineOutlinedIcon />,
		route: "profile",
	},
	{
		id: 4,
		icon: <HelpOutlineOutlinedIcon />,
		route: "help",
	},
	{
		id: 5,
		icon: <LogoutOutlinedIcon />,
		route: "logout",
	},
]
