import { ArtTitle, Column } from "../../../assets/styles/common.styles"

const SalesModalBody = ({data, selected}) => {
	const sale = data && data.find((sale) => sale.sale_id === parseInt(selected))

	return (
		<Column>
			<ArtTitle>{sale.sale_amount + " €"}</ArtTitle>
			<div>
				<h3>
					Paid by{" "}
					{Object.keys(sale.sale_payment_methods).length > 1
						? Object.keys(sale.sale_payment_methods).map(
								(payment) =>
									payment + " : " + sale.sale_payment_methods[payment] + " € "
						  )
						: Object.keys(sale.sale_payment_methods)[0]}
				</h3>
				{Object.keys(sale.sale_taxes).map((item, i) => (
					<h3 key={i}>
						{item} : {sale.sale_taxes[item]} €
					</h3>
				))}
			</div>
		</Column>
	)
}

export default SalesModalBody