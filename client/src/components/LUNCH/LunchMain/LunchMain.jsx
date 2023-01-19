import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import {
	Container,
	Body,
	Title,
	Column, } from "../../../assets/common/common.styles"
import { updateTableProducts } from "../../../redux/features/tableProducts"
import LunchItem from "../LunchItem/LunchItem"

const LunchMain = ({ theme, ids }) => {
	const dispatch = useDispatch()

	const [formatted, setFormatted] = useState([])
	const tableProducts = useSelector(
		(state) => state.tableProducts.tableProducts
	)

	const formatProducts = () => {
		let array = []

		tableProducts
			?.filter((dish) => dish.dish_status === "todo")
			.forEach((dish) => {
				let found = array.find((product) => product.dish_id === dish.dish_id)
				if (!found) {
					let product = {
						dish_id: dish.dish_id,
						dish_name: dish.dish_name,
						dish_quantity: dish.dish_quantity,
					}
					array.push(product)
				} else {
					found = {
						...found,
						dish_quantity: found.dish_quantity + 1,
					}

					array.map((product) => {
						if (product.dish_id === found.dish_id) {
							let index = array.findIndex(
								(obj) => obj.dish_id === found.dish_id
							)
							array[index] = found
							return found
						} else {
							return product
						}
					})
				}
			})
		setFormatted(array)
	}

	useEffect(() => {
		formatProducts()
	}, [tableProducts])

	useEffect(() => {
		dispatch(updateTableProducts([]))
	}, [])

	return (
		<Container theme={theme}>
			<Title>Lunch Orders</Title>
			<Body theme={theme}>
				<Column>
					{formatted?.map((product) => (
						<LunchItem data={product} key={"item-" + product.dish_id} />
					))}
				</Column>
			</Body>
		</Container>
	)
}

export default LunchMain
