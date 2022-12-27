import { TableCell, TableRow } from "@mui/material"

const SalesTableRow = ({sale, onClick}) => {
  return (
		<TableRow
			key={sale.sale_id}
			data-id={sale.sale_id}
			sx={{
				"&:last-child td, &:last-child th": {
					border: 0,
				},
			}}
			onClick={onClick}
		>
			<TableCell component="th" scope="row">
				<h4>{sale.sale_id}</h4>
			</TableCell>
			<TableCell>
				{sale.sale_year + "-" + sale.sale_month + "-" + sale.sale_day}
			</TableCell>
			<TableCell align="right">{sale.sale_amount} €</TableCell>
			<TableCell align="right">
				{Object.keys(sale.sale_payment_methods)[0]}
			</TableCell>
			<TableCell align="right">{sale.sale_user}</TableCell>
			<TableCell align="right">
				{sale.sale_discount.length > 0 ? "Yes" : "No"}
			</TableCell>
			<TableCell align="right">{sale.sale_taxes.totalTva}</TableCell>
		</TableRow>
	)
}

export default SalesTableRow
