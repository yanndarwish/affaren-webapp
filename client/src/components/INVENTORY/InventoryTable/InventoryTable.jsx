import * as React from "react"
import Table from "@mui/material/Table"
import TableBody from "@mui/material/TableBody"
import TableCell from "@mui/material/TableCell"
import TableContainer from "@mui/material/TableContainer"
import TableHead from "@mui/material/TableHead"
import TableRow from "@mui/material/TableRow"
import Paper from "@mui/material/Paper"

function createData(id, name, price, taxe, quantity, barcode, alert) {
	return { id, name, price, taxe, quantity, barcode, alert }
}

const rows = [
	createData(1, "Frozen yoghurt", 159, 6.0, 24, 5678456747, 5),
	createData(2, "Ice cream sandwich", 237, 9.0, 37, 5678456747, 5),
	createData(3, "Eclair", 262, 16.0, 24, 5678456747, 5),
	createData(4, "Cupcake", 305, 3.7, 67, 5678456747, 5),
	createData(5, "Gingerbread", 356, 16.0, 49, 35678456747, 5),
]

export default function InventoryTable() {
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
					{rows.map((row) => (
						<TableRow
							key={row.id}
							sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
						>
							<TableCell component="th" scope="row">
								{row.id}
							</TableCell>
							<TableCell >{row.name}</TableCell>
							<TableCell align="right">{row.price}</TableCell>
							<TableCell align="right">{row.quantity}</TableCell>
							<TableCell align="right">{row.taxe}</TableCell>
							<TableCell align="right">{row.barcode}</TableCell>
							<TableCell align="right">{row.alert}</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</TableContainer>
	)
}
