import { useDispatch } from "react-redux"
import { updateProducts, addProduct, setSaleTable } from "../../../../redux/features/sale"
import Button from "../../../common/Button/Button.component"

const TablePayment = ({table, setIsOpen, setValue}) => {
	const dispatch = useDispatch()

	const handlePayment = () => {
		dispatch(updateProducts({ products: [] }))
		let array = []

		table?.forEach((dish) => {
			let found = array.find((product) => product.id === dish.dish_id)

			if (!found) {
				let product = {
					id: dish.dish_id,
					name: dish.dish_name,
					price: dish.dish_price,
					taxe: dish.dish_taxe,
					quantity: dish.dish_quantity,
				}
				array.push(product)
				dispatch(addProduct({ products: product }))
			} else {
				found = {
					...found,
					quantity: found.quantity + 1,
					price: (dish.dish_price * (found.quantity + 1)).toFixed(2),
				}

				const updated = array.map((product) => {
					if (product.id === found.id) {
						let index = array.findIndex((obj) => obj.id === found.id)
						array[index] = found
						return found
					} else {
						return product
					}
				})

				dispatch(updateProducts({ products: updated }))
			}
		})
		dispatch(setSaleTable({ table: table.table_id }))
		setIsOpen(false)
		setValue(0)
	}
	return (
		<Button title="Go to Payment" color="success" onClick={handlePayment} />
	)
}

export default TablePayment
