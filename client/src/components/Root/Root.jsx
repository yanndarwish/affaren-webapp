import { Outlet } from "react-router-dom"
import { Grid } from "../../assets/styles/common.styles"
import Navbar from "../Sidebar/Navbar"


const Root = () => {
	return (
		<Grid>
			{/* <Sidebar /> */}
			<Navbar />
			<Outlet />
		</Grid>
	)
}

export default Root
