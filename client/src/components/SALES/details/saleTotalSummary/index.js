import { Banknote, CreditCard, Euro, Tag } from "lucide-react"
import { PaymentTotal } from "../../SalesTable/SalesTable"
import { Stack } from "@mui/material"

export const SaleTotalSummary = ({ sale }) => {
	return (
		<Stack
			direction="column"
			justifyContent="space-between"
			className="w-full space-y-4"
		>
			<PaymentTotal
				label="Total"
				value={sale.amount}
				icon={<Euro />}
				primary
			/>
			<Stack
				direction="row"
				justifyContent="space-between"
				className="w-full space-x-4"
			>
				{sale.paymentMethods?.cash && (
					<PaymentTotal
						label="Cash"
						value={sale.paymentMethods.cash}
						icon={<Banknote />}
					/>
				)}
				{sale.paymentMethods?.card && (
					<PaymentTotal
						label="Card"
						value={sale.paymentMethods.card}
						icon={<CreditCard />}
					/>
				)}
				{sale.paymentMethods?.check && (
					<PaymentTotal
						label="Check"
						value={sale.paymentMethods.check}
						icon={<Tag />}
					/>
				)}
			</Stack>
		</Stack>
	)
}
