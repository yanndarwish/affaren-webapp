import { TableCell, TableRow } from "@mui/material"
import EuroSymbolOutlinedIcon from "@mui/icons-material/EuroSymbolOutlined"
import CreditCardOutlinedIcon from "@mui/icons-material/CreditCardOutlined"
import SellOutlinedIcon from "@mui/icons-material/SellOutlined"
import { useEffect } from "react"
import { useState } from "react"

const SalesTableRow = ({sale, onClick}) => {
	const [fail, setFail] = useState(false)
	const diagnose = () => {
		let total = 0
		// loop through payment methods and add amount to total
		let methods = Object.keys(sale.sale_payment_methods)
		methods.forEach(method => {
			total += sale.sale_payment_methods[method]
		})
		if (parseFloat(sale.sale_amount) !== total) {
			console.log('fail')
			console.log(sale.sale_payment_methods)
			console.log(sale.sale_amount)
			setFail(true)
		}
	}

	useEffect(() => {
		diagnose()
	}, [sale])
  return (
		<TableRow
			key={sale.sale_id}
			data-id={sale.sale_id}
			sx={{
				"&:last-child td, &:last-child th": {
					border: 0,
				},
				background: fail ? "red" : "transparent"
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
				{Object.keys(sale.sale_payment_methods).length > 1 ? (
					Object.keys(sale.sale_payment_methods).map((payment) =>
						payment === "card" ? (
							<CreditCardOutlinedIcon key={payment} />
						) : payment === "cash" ? (
							<EuroSymbolOutlinedIcon key={payment} />
						) : (
							<SellOutlinedIcon key={payment} />
						)
					)
				) : Object.keys(sale.sale_payment_methods)[0] === "card" ? (
					<CreditCardOutlinedIcon />
				) : Object.keys(sale.sale_payment_methods)[0] === "cash" ? (
					<EuroSymbolOutlinedIcon />
				) : (
					<SellOutlinedIcon />
				)}
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
