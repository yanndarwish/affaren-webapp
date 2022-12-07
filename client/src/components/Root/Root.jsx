import { Outlet } from "react-router-dom"
import Sidebar from "../Sidebar/Sidebar.component"
import Navbar from "../Sidebar/Navbar"
import { Grid } from "@mui/material"

const Root = () => {
	return (
		<Grid container display="flex">
			{/* <Sidebar /> */}
			<Navbar />
			<Outlet />
		</Grid>
	)
}

export default Root
