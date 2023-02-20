import { useContext } from "react"
import {
	ArtTitle,
	Column,
	PrimaryText,
	SecondaryText,
	SpaceHeaderCenter,
} from "../../../assets/common/common.styles"
import AccessTimeOutlinedIcon from "@mui/icons-material/AccessTimeOutlined"
import InfoMessage from '../../common/InfoMessage/InfoMessage'
import {
	usePatchProductTableStatusMutation,
} from "../../../redux/services/tableProductsApi"
import { IconButton } from "@mui/material"
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline"
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline"
// import { WebSocketContext } from "../../../utils/context/webSocket"

const LunchTableDetail = ({ table }) => {
	// const ws = useContext(WebSocketContext)

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

		const target = table.find(
			(item) =>
				item.table_person === parseInt(personId) && item.dish_id === dishId
		)

		const status = target.dish_status
		updateStatus({
			tableId: tableId,
			personId: personId,
			dishId: dishId,
			status: status === "todo" ? "done" : "todo",
		})
		// ws?.sendMessage({
		// 	type: "lunch",
		// 	table: tableId,
		// 	action: "status",
		// })
	}

	return (
		<Column>
			<ArtTitle>Table {table[0]?.table_number}</ArtTitle>
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
							{res.isError && <InfoMessage state="error" text="Failed to update dish status"/>}
							<SecondaryText>
								{product.dish_quantity} {product.dish_name}
							</SecondaryText>
							<IconButton
								color="success"
								data-table={product.table_id}
								data-person={product.table_person}
								data-dish={product.dish_id}
								onClick={handleClick}
							>
								<CheckCircleOutlineIcon
									data-table={product.table_id}
									data-person={product.table_person}
									data-dish={product.dish_id}
								/>
							</IconButton>
						</SpaceHeaderCenter>
					) : product.dish_status === "waiting" ? (
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

							<AccessTimeOutlinedIcon color="disabled" />
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
