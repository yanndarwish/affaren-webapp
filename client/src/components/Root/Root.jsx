import { Outlet } from "react-router-dom"
import { Grid } from "../../assets/common/common.styles"
import Sidebar from "../Sidebar/Sidebar"

const Root = () => {
	return (
		<Grid>
			{/* <Sidebar /> */}
			<Sidebar />
			<Outlet />
		</Grid>
	)
}

export default Root
