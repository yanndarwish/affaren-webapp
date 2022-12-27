import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined"
import PieChartOutlineOutlinedIcon from "@mui/icons-material/PieChartOutlineOutlined"
import Inventory2OutlinedIcon from "@mui/icons-material/Inventory2Outlined"
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined"
import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined"
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined"
import FormatListNumberedIcon from "@mui/icons-material/FormatListNumbered"
import LoginOutlinedIcon from "@mui/icons-material/LoginOutlined"

export const navbarItems = [
	{
		id: 0,
		icon: <HomeOutlinedIcon />,
		route: "pos",
	},
	{
		id: 1,
		icon: <FormatListNumberedIcon />,
		route: "sales",
	},
	{
		id: 2,
		icon: <PieChartOutlineOutlinedIcon />,
		route: "dashboard",
	},
	{
		id: 3,
		icon: <Inventory2OutlinedIcon />,
		route: "inventory",
	},
	{
		id: 4,
		icon: <PersonOutlineOutlinedIcon />,
		route: "profile",
	},
	{
		id: 5,
		icon: <HelpOutlineOutlinedIcon />,
		route: "help",
	},
	{
		id: 6,
		icon: <LogoutOutlinedIcon />,
		route: "logout",
	},
]
