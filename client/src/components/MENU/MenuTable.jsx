import MenuItem from "./MenuItem/MenuItem"
import React, { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { Column, SubTitle } from "../../assets/styles/common.styles"

const MenuTable = () => {
	const statusFilter = useSelector((state) => state.dishes.statusFilter)
	const typeFilter = useSelector((state) => state.dishes.typeFilter)
	const dishes = useSelector((state) => state.dishes.dishes)
	const [filteredMenu, setFilteredMenu] = useState([])

	const filterMenu = ({ statusFilter, typeFilter, dishes }) => {
		let filters = [statusFilter && statusFilter, typeFilter && typeFilter]

		let array = dishes?.filter((dish) => {
			// if both filter = all return orders
			if (statusFilter === "all" && typeFilter === "all") {
				return dishes
			} else if (statusFilter === "all" && typeFilter !== "all") {
				// if statusfilter = all return array filtered only by typeFilter
				return dish.dish_category === filters[1]
			} else if (typeFilter === "all" && statusFilter !== "all") {
				// if typefilter = all return array filtered only by status
				return dish.dish_active === filters[0]
			} else {
				// else couple the filters
				return (
					dish.dish_active === filters[0] && dish.dish_category === filters[1]
				)
			}
		})

		setFilteredMenu(array)
	}

	console.log(filteredMenu)
	useEffect(() => {
		filterMenu({ statusFilter, typeFilter, dishes })
	}, [statusFilter, typeFilter, dishes])

	return (
		<Column>
			<Column>
				<SubTitle>Starters</SubTitle>
				{filteredMenu
					?.filter((dish) => dish.dish_category === "starter")
					.map((dish) => (
						<MenuItem
							data={dish}
							key={dish.dish_id}
							color="blue"
							disabled={dish.dish_active === "false"}
						/>
					))}
				<SubTitle>Mains</SubTitle>
				{filteredMenu
					?.filter((dish) => dish.dish_category === "main")
					.map((dish) => (
						<MenuItem
							data={dish}
							key={dish.dish_id}
							color="red"
							disabled={dish.dish_active === "false"}
						/>
					))}
				<SubTitle>Deserts</SubTitle>
				{filteredMenu
					?.filter((dish) => dish.dish_category === "desert")
					.map((dish) => (
						<MenuItem
							data={dish}
							key={dish.dish_id}
							color="green"
							disabled={dish.dish_active === "false"}
						/>
					))}
			</Column>
		</Column>
	)
}

export default MenuTable
