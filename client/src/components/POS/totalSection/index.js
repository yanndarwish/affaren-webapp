import { Stack } from "@mui/material"
import { Button } from "../../ui/button"
import { Separator } from "../../ui/separator"
import { useSale } from "../../../lib/providers/sale"
import {
	Card,
	CardTitle,
	CardHeader,
	CardFooter,
	CardDescription,
} from "../../ui/card"

import ReceiptIcon from "@mui/icons-material/Receipt"
import PointOfSaleIcon from "@mui/icons-material/PointOfSale"
import { useQuery } from "../../../lib/hooks/useQuery"
import { openDrawer, printTicket } from "../../../lib/api"
import { useModal } from "../../shared/modal"
import { ModalPayment } from "../modalPayment"
import { useNotify } from "../../../lib/hooks/useNotify"
import {
	getTotalOriginalPrice,
	getTotalReduction,
	hasDiscount,
} from "../../../lib/pos"

export const TotalSection = () => {
	const { notifySuccess, notifyError } = useNotify()
	const paymentModal = useModal()
	const sale = useSale()

	const queryOpenDrawer = useQuery({
		queryFn: openDrawer,
		onSuccess: () => {
			notifySuccess("Drawer opened")
		},
		onError: () => {
			notifyError("An error occured while opening the drawer")
		},
	})

	const queryPrintTicket = useQuery({
		queryFn: printTicket,
		onSuccess: () => {
			notifySuccess("Ticket printed")
		},
		onError: () => {
			notifyError("An error occured while printing the ticket")
		},
	})

	const handlePrintTicket = () => {
		const timestamp = new Date()

		const day = timestamp.getDate()
		const month = timestamp.getMonth() + 1
		const year = timestamp.getFullYear()
		let actualSale = {
			...sale,
			year: year,
			month: month,
			day: day,
			paymentMethods: "none",
		}

		queryPrintTicket.send(actualSale)
		sale.refocus()
	}

	const handleOpenDrawer = () => {
		queryOpenDrawer.send()
		sale.refocus()
	}

	const handleClickPayment = () => {
		paymentModal.setData(sale)
		paymentModal.openModal()
	}

	return (
		<Card>
			<CardHeader>
				<Stack direction="row" className="space-x-4 justify-between">
					<Stack direction="row" className="space-x-4">
						<Button onClick={handleOpenDrawer}>
							<PointOfSaleIcon />
						</Button>
						<Button
							onClick={handlePrintTicket}
							className="bg-orange-400"
							disabled={sale.products.length === 0}
						>
							<ReceiptIcon />
						</Button>
					</Stack>
					<Stack direction="row" className="space-x-4" alignItems="center">
						{sale.isActiveDiscount && hasDiscount(sale.discount) && (
							<>
								<CardDescription className="text-xl">
									Original Price: {getTotalOriginalPrice(sale)} €
								</CardDescription>
								<Separator orientation="vertical" className="mx-8 h-8" />
								<CardDescription className="text-xl">
									Discount: {getTotalReduction(sale.discount)} €
								</CardDescription>
								<Separator orientation="vertical" className="mx-8 h-8" />
							</>
						)}
						<CardTitle className="text-end text-3xl">
							Total {sale.amount}€
						</CardTitle>
					</Stack>
				</Stack>
			</CardHeader>
			<CardFooter>
				<Button
					disabled={parseFloat(sale.amount) === 0}
					color="success"
					onClick={handleClickPayment}
					className="w-full"
				>
					Continue to Payment
				</Button>
			</CardFooter>
			<ModalPayment controller={paymentModal} />
		</Card>
	)
}
