import { createBrowserRouter } from "react-router-dom"
import Root from "../components/Root/Root"
import Login from "../pages/Login/Login"
import Pos from "../pages/Pos/Pos"
import Sales from "../pages/Sales/Sales"
import Orders from "../pages/Orders/Orders"
import Dashboard from "../pages/Dashboard"
import Inventory from "../pages/Inventory/Inventory"
import Help from "../pages/Help/Help"
import Logout from "../pages/Logout/Logout"
import ForgotPassword from "../pages/ForgotPassword/ForgotPassword"
import Menu from "../pages/Menu/Menu"
import Lunch from "../pages/Lunch/Lunch"
import Opening from "../pages/Opening/Opening"
import Closing from "../pages/Closing/Closing"

const router = createBrowserRouter([
	{
		path: "/",
		element: <Root />,
		children: [
			{
				path: "/",
				element: <Login />,
			},
			{
				path: "login",
				element: <Login />,
			},
			{
				path: "pos",
				element: <Pos />,
			},
			{
				path: "sales",
				element: <Sales />,
			},
			{
				path: "orders",
				element: <Orders />,
			},
			{
				path: "menu",
				element: <Menu />,
			},
			{
				path: "dashboard",
				element: <Dashboard />,
			},
			{
				path: "inventory",
				element: <Inventory />,
			},
			{
				path: "lunch",
				element: <Lunch />,
			},
			{
				path: "help",
				element: <Help />,
			},
			{
				path: "closing",
				element: <Closing />,
			},
			{
				path: "logout",
				element: <Logout />,
			},
			{
				path: "forgot-password",
				element: <ForgotPassword />,
			},
			{
				path: "opening",
				element: <Opening />,
			},
		],
	},
])

export default router