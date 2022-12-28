import { createBrowserRouter } from "react-router-dom"
import Root from "../components/Root/Root"
import Login from "../pages/Login/Login"
import Pos from "../pages/Pos/Pos"
import Sales from "../pages/Sales/Sales"
import Orders from "../pages/Orders/Orders"
import Dashboard from "../pages/Dashboard/Dashboard"
import Inventory from "../pages/Inventory/Inventory"
import Profile from "../pages/Profile/Profile"
import Help from "../pages/Help/Help"
import Logout from "../pages/Logout/Logout"

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
				path: "dashboard",
				element: <Dashboard />,
			},
			{
				path: "inventory",
				element: <Inventory />,
			},
			{
				path: "profile",
				element: <Profile />,
			},
			{
				path: "help",
				element: <Help />,
			},
			{
				path: "logout",
				element: <Logout />,
			},
		],
	},
])

export default router