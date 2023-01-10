import React, { useEffect } from "react"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { Column, Container, Title } from "../../assets/styles/common.styles"
import InfoMessage from "../../components/common/InfoMessage/InfoMessage"
import MenuFilter from "../../components/MENU/MenuFilter"
import MenuTable from "../../components/MENU/MenuTable"
import { useGetDishesQuery } from "../../redux/services/dishApi"

const Menu = () => {
	const loggedIn = useSelector((state) => state.login.loggedIn)
	const theme = useSelector((state) => state.theme.theme)
	const dishes = useSelector((state) => state.dishes.dishes)

	const navigate = useNavigate()

	const { isError } = useGetDishesQuery()

	console.log(dishes)

	const redirect = () => {
		!loggedIn && navigate("/login")
	}

	useEffect(() => {
		redirect()
	}, [])
	return (
		<Container theme={theme}>
			<Title>Menu</Title>
			{isError ? (
				<InfoMessage state="error" text="Failed to load the menu" />
			) : (
                <Column>
                
				<MenuFilter />
                <MenuTable />
                </Column>
			)}
		</Container>
	)
}

export default Menu
