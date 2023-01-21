import { useEffect, useState } from "react"
import {
	Body,
	Title,
	Column,
	Notification,
} from "../../../assets/common/common.styles"
import { Container } from "./LunchMain.styles"
import LunchItem from "../LunchItem/LunchItem"

const LunchMain = ({ theme, dishes, notif, setNotif }) => {
	const [formatted, setFormatted] = useState([])

	const formatProducts = () => {
		let array = []

		dishes
			?.filter((item) => item.dish_status === "todo")
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
		setFormatted(array.sort((a, b) => b.dish_quantity - a.dish_quantity))
		setNotif(array.length)
	}

	useEffect(() => {
		formatProducts()
	}, [dishes])

	return (
		<Container theme={theme}>
			<Title>Lunch Orders</Title>
			<Body theme={theme}>
				<Notification>{notif}</Notification>
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
