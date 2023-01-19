import { useEffect } from "react"
import {
	ArtTitle,
	Column,
	PrimaryText,
	SecondaryText,
	SpaceHeaderCenter,
} from "../../../assets/common/common.styles"
import {
	useGetActiveTablesProductsMutation,
	usePatchProductTableStatusMutation
} from "../../../redux/services/tableProductsApi"
import { useDispatch } from "react-redux"
import { IconButton } from "@mui/material"
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline"
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline"

const LunchTableDetail = ({ table }) => {
	const [getActiveDishes, response] = useGetActiveTablesProductsMutation()
	const [updateStatus, res] = usePatchProductTableStatusMutation()

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
		getActiveDishes()
	}, [res.isSuccess])

	return (
		<Column>
			<ArtTitle>{table[0]?.table_id}</ArtTitle>
			{table
				?.filter((product) => product.dish_category !== "formula")
				.map((product, i) =>
					product.dish_status === "done" ? (
						<SpaceHeaderCenter
							key={
								"detail" +
								product.table_id +
								product.table_person +
								product.dish_id +
								i
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
								product.dish_id +
								i
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
