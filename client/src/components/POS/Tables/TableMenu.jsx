import { useSelector } from "react-redux"
import { Column, SubTitle } from "../../../assets/styles/common.styles"
import MenuItem from "./MenuItem/MenuItem"
import { Container } from "./TableMenu.styles"

const TableMenu = ({ isOpen, theme, onClick }) => {
	const dishes = useSelector((state) =>
		state.dishes.dishes.filter((dish) => dish.dish_active === "true")
	)
	return isOpen ? (
		<Container theme={theme}>
			<Column>
				<SubTitle>Starters</SubTitle>
				{dishes
					?.filter((dish) => dish.dish_category === "starter")
					.map((dish) => (
						<MenuItem
							data={dish}
							color="blue"
							key={dish.dish_id}
							onClick={onClick}
						/>
					))}
				<SubTitle>Mains</SubTitle>
				{dishes
					?.filter((dish) => dish.dish_category === "main")
					.map((dish) => (
						<MenuItem
							data={dish}
							color="red"
							key={dish.dish_id}
							onClick={onClick}
						/>
					))}
				<SubTitle>Deserts</SubTitle>
				{dishes
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
