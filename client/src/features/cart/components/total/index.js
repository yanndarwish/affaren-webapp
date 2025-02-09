import { BadgePercent, ShoppingBasket } from "lucide-react"

import { Stack } from "@mui/material"

import {
	hasDiscount,
	getTotalReduction,
	getTotalOriginalPrice,
} from "../../../../lib/pos"
import { useSale } from "../../../../lib/providers/sale"
import { useConfig } from "../../../../lib/hooks/useConfig"
import { useHardware } from "../../../../lib/hooks/useHardware"

import { Button } from "../../../../components/ui/button"
import { useModal } from "../../../../components/shared/modal"
import { Separator } from "../../../../components/ui/separator"
import { Typography } from "../../../../components/ui/typography"
import { Card, CardHeader, CardFooter } from "../../../../components/ui/card"

import { ModalPayment } from "../modals/payment"
import { TicketButton } from "../../../ticket/button"
import { DrawerButton } from "../../../drawer/button"

export const TotalSection = () => {
	const sale = useSale()
	const paymentModal = useModal()
	const { config, isActiveComponent } = useConfig()
	const { handleOpenDrawer, handlePrintSaleTicket } = useHardware()

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
							<DrawerButton onClick={handleOpenDrawer} />
						)}
						{isActiveComponent("pos", "receipt") && (
							<TicketButton
								disabled={sale.products.length === 0}
								onClick={handlePrintSaleTicket}
							/>
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
