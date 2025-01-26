import { createBrowserRouter } from "react-router-dom"
import Root from "../components/Root/Root"
import Login from "../pages/Login/Login"
import Pos from "../pages/Pos"
import Sales from "../pages/Sales/Sales"
import Orders from "../pages/Orders/Orders"
import Dashboard from "../pages/Dashboard"
import Inventory from "../pages/Inventory/Inventory"
import Help from "../pages/Help/Help"
import ForgotPassword from "../pages/ForgotPassword/ForgotPassword"
import Menu from "../pages/Menu/Menu"
import Lunch from "../pages/Lunch/Lunch"
import Settings from "../pages/settings"
import Calendar from "../pages/calendar"
import Restauration from "../pages/restauration"
import ProtectedRoute from "./ProtectedRoute"

const router = createBrowserRouter([
	{
		path: "/",
		element: <Root />,
		children: [
			{
				path: "login",
				element: <Login />,
			},
			{
				path: "forgot-password",
				element: <ForgotPassword />,
			},
			// Protect all other routes
			{
				element: <ProtectedRoute />,
				children: [
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
						path: "settings",
						element: <Settings />,
					},
					{
						path: "calendar",
						element: <Calendar />,
					},
					{
						path: "restauration",
						element: <Restauration />,
					},
				],
			},
		],
	},
])

export default router
