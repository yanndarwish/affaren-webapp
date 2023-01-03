import { Outlet } from "react-router-dom"
import Navbar from "../Sidebar/Navbar"
import { Grid } from "@mui/material"

const Root = () => {
	return (
		<Grid container sx={{height: "100%"}}>
			{/* <Sidebar /> */}
			<Navbar />
			<Outlet />
		</Grid>
	)
}

export default Root
