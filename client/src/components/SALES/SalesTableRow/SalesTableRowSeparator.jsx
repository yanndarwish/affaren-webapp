import { TableCell, TableRow } from "@mui/material"

const SalesTableRowSeparator = ({
	sale,
	cashTotal = 0,
	cardTotal = 0,
	checkTotal = 0,
}) => {
	const total = cashTotal + cardTotal + checkTotal

	return (
		<TableRow sx={{ backgroundColor: "rgb(0,0,0, 0.1)" }}>
			<TableCell component="th" scope="row"></TableCell>
			<TableCell>
				<h2>{sale.sale_year + "-" + sale.sale_month + "-" + sale.sale_day}</h2>
			</TableCell>
			<TableCell>
				<h3>Total: {total}€</h3>
			</TableCell>
			<TableCell>
				<h3>Card: {cardTotal}€</h3>
			</TableCell>
			<TableCell>
				<h3>Cash: {cashTotal}€</h3>
			</TableCell>
			<TableCell>
				<h3>Check: {checkTotal}€</h3>
			</TableCell>
			<TableCell></TableCell>
		</TableRow>
	)
}

export default SalesTableRowSeparator
