import { openDrawer, printCashTicket, printTicket } from "../../api"
import { useNotify } from "../useNotify"
import { useQuery } from "../useQuery"
import { useSale } from "../../providers/sale"

export const useHardware = () => {
	const sale = useSale()
	const { notifySuccess, notifyError } = useNotify()

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

	const queryPrintCashTicket = useQuery({
		queryFn: printCashTicket,
		onSuccess: () => {
			notifySuccess("Cash ticket printed successfully")
		},
		onError: () => {
			notifyError("Failed to print cash ticket")
		},
	})

	const handlePrintCashTicket = (user) => {
		queryPrintCashTicket.send({ user: user.firstName })
	}

	const handlePrintSaleTicket = () => {
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

	return {
		handleOpenDrawer,
		handlePrintCashTicket,
		handlePrintSaleTicket,
	}
}
