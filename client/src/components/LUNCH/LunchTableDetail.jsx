import { useEffect, useState } from "react"
import {
	ArtTitle,
	Column,
	PrimaryText,
	SecondaryText,
	SpaceHeaderCenter,
} from "../../assets/common/common.styles"
import { useGetTableProductsQuery } from "../../redux/services/tableProductsApi"
import {
	addTableProducts,
	updateTableProducts,
} from "../../redux/features/tableProducts"
import { useDispatch, useSelector } from "react-redux"
import { IconButton } from "@mui/material"
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline"
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline"
import { usePatchProductTableStatusMutation } from "../../redux/services/tableProductsApi"

const LunchTableDetail = ({ id }) => {
	const tableProducts = useSelector(
		(state) => state.tableProducts.tableProducts
	)
	const dispatch = useDispatch()
	const [skip, setSkip] = useState(true)
	const { data } = useGetTableProductsQuery({ id: id && id }, { skip })
	const [updateStatus, res] = usePatchProductTableStatusMutation()

	const updateProducts = () => {
		data
			?.filter((product) => product.dish_category !== "formula")
			.forEach((product) => {
				const found = tableProducts?.find(
					(item) =>
						item.dish_id === product.dish_id &&
						item.table_person === product.table_person &&
						item.table_id === product.table_id
				)
				if (!found) {
					if (product.dish_status === "todo") {
						dispatch(addTableProducts(product))
					}
				} else {
					ejectProduct(product)
				}
			})
	}

	const ejectProduct = (product) => {
		if (product.dish_status === "done") {
			let array = Object.assign([], tableProducts)
			array.map((prod) => {
				if (
					prod.table_id === product.table_id &&
					prod.table_person === product.table_person &&
					prod.dish_id === product.dish_id
				) {
					let index = array.findIndex(
						(obj) =>
							obj.table_id === product.table_id &&
							obj.table_person === product.table_person &&
							obj.dish_id === product.dish_id
					)
					array[index] = product
					return product
				} else {
					return null
				}
			})
			dispatch(
				updateTableProducts(array.filter((item) => item.dish_status === "todo"))
			)
		}
	}

	const handleClick = (e) => {
		const tableId = e.target.dataset.table
			? e.target.dataset.table
			: e.target.parentNode.dataset.table

		const personId = e.target.dataset.person
			? e.target.dataset.person
			: e.target.parentNode.dataset.person

		const dishId = e.target.dataset.dish
			? e.target.dataset.dish
			: e.target.parentNode.dataset.dish

		updateStatus({ tableId: tableId, personId: personId, dishId: dishId })
	}

	useEffect(() => {
		setSkip(false)
	}, [id])

	useEffect(() => {
		updateProducts()
	}, [data])

	return (
		<Column>
			<ArtTitle>{id}</ArtTitle>
			{data
				?.filter((product) => product.dish_category !== "formula")
				.map((product) =>
					product.dish_status === "done" ? (
						<SpaceHeaderCenter
							key={
								"detail" +
								product.table_id +
								product.table_person +
								product.dish_id
							}
						>
							<SecondaryText>
								{product.dish_quantity} {product.dish_name}
							</SecondaryText>
							<CheckCircleOutlineIcon color="success" />
						</SpaceHeaderCenter>
					) : (
						<SpaceHeaderCenter
							key={
								"detail" +
								product.table_id +
								product.table_person +
								product.dish_id
							}
						>
							<PrimaryText>
								{product.dish_quantity} {product.dish_name}
							</PrimaryText>
							<IconButton
								color="error"
								data-table={product.table_id}
								data-person={product.table_person}
								data-dish={product.dish_id}
								onClick={handleClick}
							>
								<ErrorOutlineIcon
									data-table={product.table_id}
									data-person={product.table_person}
									data-dish={product.dish_id}
								/>
							</IconButton>
						</SpaceHeaderCenter>
					)
				)}
		</Column>
	)
}

export default LunchTableDetail
