import MenuItem from "../../common/MenuItem/MenuItem"
import React, { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { Column, SubTitle } from "../../../assets/common/common.styles"

const MenuTable = ({ openEdit, openDelete, openEditFormula }) => {
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

	useEffect(() => {
		filterMenu({ statusFilter, typeFilter, dishes })
	}, [statusFilter, typeFilter, dishes])

	return (
		<Column>
			<Column>
				{(typeFilter === "all" || typeFilter === "starter") && (
					<SubTitle>Starters</SubTitle>
				)}
				{filteredMenu
					?.filter((dish) => dish.dish_category === "starter")
					.map((dish) => (
						<MenuItem
							data={dish}
							key={dish.dish_id}
							color="blue"
							disabled={dish.dish_active === "false"}
							openEdit={openEdit}
							openDelete={openDelete}
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
							key={dish.dish_id}
							color="red"
							disabled={dish.dish_active === "false"}
							openEdit={openEdit}
							openDelete={openDelete}
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
							key={dish.dish_id}
							color="yellow"
							disabled={dish.dish_active === "false"}
							openEdit={openEdit}
							openDelete={openDelete}
						/>
					))}
				{(typeFilter === "all" || typeFilter === "drink") && (
					<SubTitle>Drinks</SubTitle>
				)}
				{filteredMenu
					?.filter((dish) => dish.dish_category === "drink")
					.map((dish) => (
						<MenuItem
							data={dish}
							key={dish.dish_id}
							color="blue"
							disabled={dish.dish_active === "false"}
							openEdit={openEdit}
							openDelete={openDelete}
						/>
					))}
				{(typeFilter === "all" || typeFilter === "formula") && (
					<SubTitle>Formulas</SubTitle>
				)}
				{filteredMenu
					?.filter((dish) => dish.dish_category === "formula")
					.map((dish) => (
						<MenuItem
							data={dish}
							key={dish.dish_id}
							color="green"
							disabled={dish.dish_active === "false"}
							openEdit={openEditFormula}
							openDelete={openDelete}
						/>
					))}
			</Column>
		</Column>
	)
}

export default MenuTable
