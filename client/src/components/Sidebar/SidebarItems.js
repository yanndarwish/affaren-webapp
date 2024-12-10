import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined"
import PieChartOutlineOutlinedIcon from "@mui/icons-material/PieChartOutlineOutlined"
import Inventory2OutlinedIcon from "@mui/icons-material/Inventory2Outlined"
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined"
import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined"
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined"
import FormatListNumberedIcon from "@mui/icons-material/FormatListNumbered"
import LibraryBooksOutlinedIcon from "@mui/icons-material/LibraryBooksOutlined"
import SoupKitchenOutlinedIcon from "@mui/icons-material/SoupKitchenOutlined"
import RestaurantMenuOutlinedIcon from "@mui/icons-material/RestaurantMenuOutlined"
import LunchDiningIcon from "@mui/icons-material/LunchDining"

export const sidebarItems = [
	{
		id: 0,
		icon: <HomeOutlinedIcon />,
		route: "pos",
		label: "Point de vente",
	},
	{
		id: 1,
		icon: <FormatListNumberedIcon />,
		route: "sales",
		label: "Ventes",
	},
	{
		id: 4,
		icon: <PieChartOutlineOutlinedIcon />,
		route: "dashboard",
		label: "Dashboard",
	},
	{
		id: 5,
		icon: <Inventory2OutlinedIcon />,
		route: "inventory",
		label: "Inventaire",
	},
	{
		id: 2,
		icon: <LibraryBooksOutlinedIcon />,
		route: "orders",
		label: "Commandes",
	},
	{
		id: 3,
		icon: <RestaurantMenuOutlinedIcon />,
		route: "menu",
		label: "Menu",
	},
	// {
	// 	id: 6,
	// 	icon: <SoupKitchenOutlinedIcon />,
	// 	route: "kitchen",
	// 	label: "Cuisine",
	// },
	// {
	// 	id: 10,
	// 	icon: <LunchDiningIcon />,
	// 	route: "lunch",
	// 	label: "Plats",
	// },
	{
		id: 7,
		icon: <PersonOutlineOutlinedIcon />,
		route: "profile",
		label: "Profil",
	},
	{
		id: 8,
		icon: <HelpOutlineOutlinedIcon />,
		route: "help",
		label: "Aide",
	},
	{
		id: 9,
		icon: <LogoutOutlinedIcon />,
		route: "closing",
		label: "Fermeture",
	},
]

export const cookSidebarItems = [
	{
		id: 0,
		icon: <LibraryBooksOutlinedIcon />,
		route: "orders",
		label: "Commandes",
	},
	// {
	// 	id: 6,
	// 	icon: <LunchDiningIcon />,
	// 	route: "lunch",
	// 	label: "Plats",
	// },
	{
		id: 1,
		icon: <RestaurantMenuOutlinedIcon />,
		route: "menu",
		label: "Menu",
	},
	// {
	// 	id: 2,
	// 	icon: <SoupKitchenOutlinedIcon />,
	// 	route: "kitchen",
	// 	label: "Cuisine",
	// },
	{
		id: 3,
		icon: <PersonOutlineOutlinedIcon />,
		route: "profile",
		label: "Profil",
	},
	{
		id: 4,
		icon: <HelpOutlineOutlinedIcon />,
		route: "help",
		label: "Aide",
	},
	{
		id: 5,
		icon: <LogoutOutlinedIcon />,
		route: "logout",
		label: "Déconnexion",
	},
]
