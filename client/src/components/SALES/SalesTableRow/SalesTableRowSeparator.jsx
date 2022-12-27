import { TableCell, TableRow } from "@mui/material"

const SalesTableRowSeparator = ({sale}) => {
  return (
		<TableRow>
			<TableCell component="th" scope="row"></TableCell>
			<TableCell>
				<h2>{sale.sale_year + "-" + sale.sale_month + "-" + sale.sale_day}</h2>
			</TableCell>
			<TableCell></TableCell>
			<TableCell></TableCell>
			<TableCell></TableCell>
			<TableCell></TableCell>
			<TableCell></TableCell>
		</TableRow>
	)
}

export default SalesTableRowSeparator
