import { Outlet } from "react-router-dom"
import Navbar from "../Sidebar/Navbar"
import { Grid } from "@mui/material"

const Root = () => {
	return (
		<Grid container>
			{/* <Sidebar /> */}
			<Navbar />
			<Outlet />
		</Grid>
	)
}

export default Root
