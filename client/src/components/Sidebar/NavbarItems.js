import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined"
import PieChartOutlineOutlinedIcon from "@mui/icons-material/PieChartOutlineOutlined"
import Inventory2OutlinedIcon from "@mui/icons-material/Inventory2Outlined"
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined"
import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined"
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined"
import FormatListNumberedIcon from "@mui/icons-material/FormatListNumbered"
import LibraryBooksOutlinedIcon from "@mui/icons-material/LibraryBooksOutlined"
import SoupKitchenOutlinedIcon from "@mui/icons-material/SoupKitchenOutlined"

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
		icon: <LibraryBooksOutlinedIcon />,
		route: "orders",
	},
	{
		id: 3,
		icon: <PieChartOutlineOutlinedIcon />,
		route: "dashboard",
	},
	{
		id: 4,
		icon: <Inventory2OutlinedIcon />,
		route: "inventory",
	},
	{
		id: 5,
		icon: <SoupKitchenOutlinedIcon />,
		route: "kitchen",
	},
	{
		id: 6,
		icon: <PersonOutlineOutlinedIcon />,
		route: "profile",
	},
	{
		id: 7,
		icon: <HelpOutlineOutlinedIcon />,
		route: "help",
	},
	{
		id: 8,
		icon: <LogoutOutlinedIcon />,
		route: "logout",
	},
]

export const cookNavbarItems = [
	{
		id: 0,
		icon: <LibraryBooksOutlinedIcon />,
		route: "orders",
	},
	{
		id: 1,
		icon: <SoupKitchenOutlinedIcon />,
		route: "kitchen",
	},
	{
		id: 2,
		icon: <PersonOutlineOutlinedIcon />,
		route: "profile",
	},
	{
		id: 3,
		icon: <HelpOutlineOutlinedIcon />,
		route: "help",
	},
	{
		id: 4,
		icon: <LogoutOutlinedIcon />,
		route: "logout",
	},
]