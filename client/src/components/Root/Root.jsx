import { Outlet } from "react-router-dom"
import Sidebar from "../Sidebar/Sidebar.component"
import styled from "styled-components"

const Root = () => {
	return (
		<Container>
			<Sidebar />
			<Outlet />
		</Container>
	)
}

const Container = styled.div`
	display:flex;
	height:100vh;
`

export default Root
