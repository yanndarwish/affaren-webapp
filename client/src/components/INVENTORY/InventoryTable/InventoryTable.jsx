import * as React from "react"
import Table from "@mui/material/Table"
import TableBody from "@mui/material/TableBody"
import TableCell from "@mui/material/TableCell"
import TableContainer from "@mui/material/TableContainer"
import TableHead from "@mui/material/TableHead"
import TableRow from "@mui/material/TableRow"
import Paper from "@mui/material/Paper"

export default function InventoryTable({products}) {
	console.log(typeof(products))
	return (
		<TableContainer component={Paper}>
			<Table sx={{ minWidth: 650 }} aria-label="simple table">
				<TableHead>
					<TableRow>
						<TableCell>Id</TableCell>
						<TableCell>Name</TableCell>
						<TableCell align="right">Price</TableCell>
						<TableCell align="right">Quantity</TableCell>
						<TableCell align="right">Taxe</TableCell>
						<TableCell align="right">Barcode</TableCell>
						<TableCell align="right">Alert</TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{products &&
						products.map((product) => (
							<TableRow
								key={product && product.product_id}
								sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
							>
								<TableCell component="th" scope="row">
									{product && product.product_id}
								</TableCell>
								<TableCell>{product && product.product_name}</TableCell>
								<TableCell align="right">{product && product.product_price}</TableCell>
								<TableCell align="right">{product && product.product_quantity}</TableCell>
								<TableCell align="right">{product && product.product_taxe}</TableCell>
								<TableCell align="right">{product && product.product_barcode}</TableCell>
								<TableCell align="right">{product && product.product_alert}</TableCell>
							</TableRow>
						))}
				</TableBody>
			</Table>
		</TableContainer>
	)
}
