import { Stack } from "@mui/material"
import { Button } from "../../ui/button"
import { Separator } from "../../ui/separator"
import { useSale } from "../../../lib/providers/sale"
import { Card, CardHeader, CardFooter } from "../../ui/card"

import {
	ReceiptText,
	Computer,
	BadgePercent,
	ShoppingBasket,
} from "lucide-react"
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
import { useConfig } from "../../../lib/hooks/useConfig"
import { Typography } from "../../ui/typography"

export const TotalSection = () => {
	const { notifySuccess, notifyError } = useNotify()
	const { config, isActiveComponent } = useConfig()
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
						{isActiveComponent("pos", "drawer") && (
							<Button onClick={handleOpenDrawer}>
								<Computer />
							</Button>
						)}
						{isActiveComponent("pos", "receipt") && (
							<Button
								onClick={handlePrintTicket}
								className="bg-orange-400"
								disabled={sale.products.length === 0}
							>
								<ReceiptText />
							</Button>
						)}
					</Stack>
					<Stack direction="row" className="space-x-4" alignItems="center">
						{isActiveComponent("pos", "discount") &&
							hasDiscount(sale.discount) && (
								<Stack
									direction="row"
									alignItems="center"
									className="space-x-4"
								>
									<Stack
										direction="row"
										alignItems="center"
										className="text-muted-foreground space-x-2"
									>
										<ShoppingBasket />
										<Stack direction="row" alignItems="center">
											<Typography variant="lead">
												{getTotalOriginalPrice(sale)}
											</Typography>
											<config.general.currency.symbol className="w-5 h-5" />
										</Stack>
									</Stack>
									<Separator orientation="vertical" className="mx-8 h-8" />
									<Stack
										direction="row"
										alignItems="center"
										className="text-muted-foreground space-x-2"
									>
										<BadgePercent />
										<Stack direction="row" alignItems="center">
											<Typography variant="lead">
												{getTotalReduction(sale)}
											</Typography>
											<config.general.currency.symbol className="w-5 h-5" />
										</Stack>
									</Stack>

									<Separator orientation="vertical" className="mx-8 h-8" />
								</Stack>
							)}
						<Stack direction="row" alignItems="center">
							<Typography variant="h2" className="text-end">
								Total {sale.amount}
							</Typography>
							<config.general.currency.symbol className="w-7 h-7" />
						</Stack>
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
