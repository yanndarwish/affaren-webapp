import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { Column, SubTitle } from "../../../assets/styles/common.styles"
import MenuFilter from "./MenuFilter/MenuFilter"
import MenuItem from "./MenuItem/MenuItem"
import { Container } from "./TableMenu.styles"

const TableMenu = ({ isOpen, theme, onClick }) => {
	const [typeFilter, setTypeFilter] = useState("all")
	const dishes = useSelector((state) =>
		state.dishes.dishes.filter((dish) => dish.dish_active === "true")
	)
	const [filteredMenu, setFilteredMenu] = useState([])

	const filterMenu = ({ typeFilter }) => {
		let array = dishes?.filter((dish) => {
			if (typeFilter !== "all") {
				// else return array filtered only by typeFilter
				return dish.dish_category === typeFilter
			}
			// if filter = all return  all dishes
			return dishes
		})

		setFilteredMenu(array)
	}

	useEffect(() => {
		filterMenu({ typeFilter })
	}, [typeFilter])
	return isOpen ? (
		<Container theme={theme}>
			<Column>
				<MenuFilter filter={typeFilter} setFilter={setTypeFilter} />
				{(typeFilter === "all" || typeFilter === "starter") && (
					<SubTitle>Starters</SubTitle>
				)}
				{filteredMenu
					?.filter((dish) => dish.dish_category === "starter")
					.map((dish) => (
						<MenuItem
							data={dish}
							color="blue"
							key={dish.dish_id}
							onClick={onClick}
						/>
					))}
				{(typeFilter === "all" || typeFilter === "main") && (
					<SubTitle>Mains</SubTitle>
				)}
				{filteredMenu
					?.filter((dish) => dish.dish_category === "main")
					.map((dish) => (
						<MenuItem
							data={dish}
							color="red"
							key={dish.dish_id}
							onClick={onClick}
						/>
					))}
				{(typeFilter === "all" || typeFilter === "desert") && (
					<SubTitle>Deserts</SubTitle>
				)}
				{filteredMenu
					?.filter((dish) => dish.dish_category === "desert")
					.map((dish) => (
						<MenuItem
							data={dish}
							color="yellow"
							key={dish.dish_id}
							onClick={onClick}
						/>
					))}
			</Column>
		</Container>
	) : null
}

export default TableMenu
