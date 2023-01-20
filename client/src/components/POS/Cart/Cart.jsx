import Table from "@mui/material/Table"
import TableBody from "@mui/material/TableBody"
import TableCell from "@mui/material/TableCell"
import TableContainer from "@mui/material/TableContainer"
import TableHead from "@mui/material/TableHead"
import TableRow from "@mui/material/TableRow"
import Paper from "@mui/material/Paper"
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined"
import AddIcon from "@mui/icons-material/Add"
import RemoveIcon from "@mui/icons-material/Remove"
import { StyledCart, Wrapper } from "./Cart.styles"
import { useSelector, useDispatch } from "react-redux"
import { updateProducts } from "../../../redux/features/sale"

const Cart = () => {
	const products = useSelector((state) => state.sale.products)
	const dispatch = useDispatch()

	const updateQuantity = (e, value) => {
		// find product in products array
		const targetId = e.target.dataset.id
			? e.target.dataset.id
			: e.target.parentNode.dataset.id
		const found = products.find((product) => product.id.toString() === targetId)
		// update quantity with value
		let obj = { ...found }
		obj.price =
			Math.floor((obj.price / obj.quantity) * (obj.quantity + value) * 100) /
			100
		obj.quantity = obj.quantity + value

		if (obj.quantity === 0) {
			removeProduct({ id: targetId })
		} else {
			const updated = products.map((product) => {
				if (product.id === found.id) {
					return obj
				} else {
					return product
				}
			})
			dispatch(updateProducts({ products: updated }))
		}
		document.getElementById("barcode-input").focus()
	}

	const removeProduct = ({ e, id }) => {
		if (!id) {
			id = e.target.dataset.id
				? e.target.dataset.id
				: e.target.parentNode.dataset.id
		}

		const updatedProducts = products.filter(
			(product) => product.id.toString() !== id
		)

		dispatch(updateProducts({ products: updatedProducts }))
		document.getElementById("barcode-input").focus()
	}

	return (
			<TableContainer component={Paper} sx={{ height: "100%" }}>
				<Table
					stickyHeader
					sx={{ minWidth: 650 }}
					size="small"
					aria-label="simple table"
				>
					<TableHead>
						<TableRow>
							<TableCell>N°</TableCell>
							<TableCell>Name</TableCell>
							<TableCell align="right">
								<Wrapper>Qty</Wrapper>
							</TableCell>
							<TableCell align="right">Price</TableCell>
							<TableCell align="right">
								<DeleteOutlinedIcon />
							</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{products.map((product, i) => (
							<TableRow
								key={product.id}
								sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
							>
								<TableCell component="th" scope="row">
									{i + 1}
								</TableCell>
								<TableCell>{product.name}</TableCell>
								<TableCell align="right">
									<Wrapper>
										<RemoveIcon
											data-id={product.id}
											onClick={(e) => updateQuantity(e, -1)}
										/>
										{product.quantity}
										<AddIcon
											data-id={product.id}
											onClick={(e) => updateQuantity(e, 1)}
										/>
									</Wrapper>
								</TableCell>
								<TableCell align="right">{product.price}</TableCell>
								<TableCell align="right">
									<DeleteOutlinedIcon
										data-id={product.id}
										onClick={(e) => removeProduct({ e: e })}
									/>
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</TableContainer>
	)
}

export default Cart
