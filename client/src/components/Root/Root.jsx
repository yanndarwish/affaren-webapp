import { Outlet } from "react-router-dom"
import Sidebar from "../Sidebar/Sidebar.component"

const Root = () => {
	return (
		<div>
			<Sidebar />
			<Outlet />
		</div>
	)
}

export default Root
