import { Outlet } from "react-router-dom"
import Sidebar from "../Sidebar/Sidebar.component"
import Navbar from "../Sidebar/Navbar"
import styled from "styled-components"
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

const Container = styled.div`
	display:flex;
	height:100vh;
`

export default Root
