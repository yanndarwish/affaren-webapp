import * as React from "react"
import Table from "@mui/material/Table"
import TableBody from "@mui/material/TableBody"
import TableCell from "@mui/material/TableCell"
import TableContainer from "@mui/material/TableContainer"
import TableHead from "@mui/material/TableHead"
import TableRow from "@mui/material/TableRow"
import Paper from "@mui/material/Paper"

export default function SalesTable({ data }) {
	const handleClick = (e) => {
		let id = e.target.parentNode.dataset.id
        console.log(id)
	}
	return (
		<TableContainer component={Paper}>
			<Table sx={{ minWidth: 650 }} aria-label="simple table">
				<TableHead>
					<TableRow>
						<TableCell>Id</TableCell>
						<TableCell>Date</TableCell>
						<TableCell align="right">User</TableCell>
						<TableCell align="right">Discount</TableCell>
						<TableCell align="right">Payment</TableCell>
						<TableCell align="right">TVA</TableCell>
						<TableCell align="right">Total</TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{data &&
						data.map((sale, i) => (
							<TableRow
								key={sale.sale_id}
								data-id={sale.sale_id}
								sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                                onClick={handleClick}
							>
								<TableCell component="th" scope="sale">
									{sale.sale_id}
								</TableCell>
								<TableCell>
									{sale.sale_year + "-" + sale.sale_month + "-" + sale.sale_day}
								</TableCell>
								<TableCell align="right">{sale.sale_user}</TableCell>
								<TableCell align="right">
									{sale.sale_discount.length > 0 ? "Yes" : "No"}
								</TableCell>
								<TableCell align="right">
									{Object.keys(sale.sale_payment_methods)[0]}
								</TableCell>
								<TableCell align="right">{sale.sale_taxes.totalTva}</TableCell>
								<TableCell align="right">{sale.sale_amount} €</TableCell>
							</TableRow>
						))}
				</TableBody>
			</Table>
		</TableContainer>
	)
}
