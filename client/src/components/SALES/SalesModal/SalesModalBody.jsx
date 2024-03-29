import {
	ArtTitle,
	Column,
	Gap,
	HorizontalCenter,
	SecondaryEllipsis,
	SecondaryText,
	SpaceHeader,
	VerticalCenter,
} from "../../../assets/common/common.styles"
import EuroSymbolOutlinedIcon from "@mui/icons-material/EuroSymbolOutlined"
import CreditCardOutlinedIcon from "@mui/icons-material/CreditCardOutlined"
import SellOutlinedIcon from "@mui/icons-material/SellOutlined"
import { Fragment } from "react"

const SalesModalBody = ({ data, selected, details }) => {
	const sale = data && data.find((sale) => sale.sale_id === parseInt(selected))
	return (
		<Column>
			<HorizontalCenter>
				<ArtTitle>{sale.sale_amount + " €"}</ArtTitle>
			</HorizontalCenter>
			<div>
				<div>
					{Object.keys(sale.sale_payment_methods).length > 1 ? (
						Object.keys(sale.sale_payment_methods).map((payment) =>
							payment === "card" ? (
								<VerticalCenter key={payment}>
									<CreditCardOutlinedIcon />{" "}
									<SecondaryText>
										{sale.sale_payment_methods[payment]}€
									</SecondaryText>
									<br />
								</VerticalCenter>
							) : payment === "cash" ? (
								<VerticalCenter key={payment}>
									<EuroSymbolOutlinedIcon />{" "}
									<SecondaryText>
										{sale.sale_payment_methods[payment]}€
									</SecondaryText>
									<br />
								</VerticalCenter>
							) : (
								<Fragment key={payment}>
									<SellOutlinedIcon />{" "}
									<SecondaryText>
										{sale.sale_payment_methods[payment]}€
									</SecondaryText>
									<br />
								</Fragment>
							)
						)
					) : Object.keys(sale.sale_payment_methods)[0] === "card" ? (
						<CreditCardOutlinedIcon />
					) : Object.keys(sale.sale_payment_methods)[0] === "cash" ? (
						<EuroSymbolOutlinedIcon />
					) : (
						<SellOutlinedIcon />
					)}
				</div>
			</div>
			<div>
				<Column>
					{details?.map((row) => (
						<SpaceHeader key={row.product_id}>
							<SecondaryEllipsis key={row.product_id + "-name"}>
								{row.product_name}
							</SecondaryEllipsis>
							<Gap>
								<SecondaryText key={row.product_id + "-qty"}>
									{row.product_quantity}
								</SecondaryText>
								<SecondaryText key={row.product_id + "-price"}>
									{row.product_price} €
								</SecondaryText>
							</Gap>
						</SpaceHeader>
					))}
					<div>
						{Object.keys(sale.sale_taxes).map((item, i) => (
							<SecondaryText key={i}>
								{item.charAt(0).toUpperCase() + item.slice(1)} :{" "}
								{sale.sale_taxes[item]} €
							</SecondaryText>
						))}
					</div>
				</Column>
			</div>
		</Column>
	)
}

export default SalesModalBody
