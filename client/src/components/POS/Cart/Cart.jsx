import Table from "@mui/material/Table"
import TableBody from "@mui/material/TableBody"
import TableCell from "@mui/material/TableCell"
import TableContainer from "@mui/material/TableContainer"
import TableHead from "@mui/material/TableHead"
import TableRow from "@mui/material/TableRow"
import Paper from "@mui/material/Paper"
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined"
import { useSelector } from "react-redux"

const Cart = () => {
	const products = useSelector(state => state.sale.products)

	return (
		<TableContainer component={Paper} sx={{ maxHeight: 280 }}>
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
						<TableCell align="right">Qty</TableCell>
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
								{i+1}
							</TableCell>
							<TableCell>{product.name}</TableCell>
							<TableCell align="right">{product.quantity}</TableCell>
							<TableCell align="right">{product.price}</TableCell>
							<TableCell align="right">
								<DeleteOutlinedIcon />
							</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</TableContainer>
	)
}

export default Cart
