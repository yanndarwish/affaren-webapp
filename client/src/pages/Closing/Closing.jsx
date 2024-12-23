import React, { useState } from "react"
import { useEffect } from "react"
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from "../../components/ui/card"
import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbSeparator,
} from "../../components/ui/breadcrumb"
import { UserStep } from "../../components/userStep"
import { Button } from "../../components/ui/button"
import { Stack } from "@mui/material"
import { useModal } from "../../components/shared/modal"
import { ModalLogout } from "../../components/Cards/ModalLogout/ModalLogout"
import { useDailyTotal } from "../../lib/providers/dailyTotal"
import { getDayCash, printCashTicket, openDrawer } from "../../lib/api"
import { useQuery } from "../../lib/hooks/useQuery"
import PointOfSaleIcon from "@mui/icons-material/PointOfSale"
import ReceiptIcon from "@mui/icons-material/Receipt"
import { Banknote, CreditCard } from "lucide-react"
import { useNotify } from "../../lib/hooks/useNotify"
import { useSession } from "../../lib/hooks/useSession"

const Closing = () => {
	const [step, setStep] = useState(1)
	const modalLogout = useModal()

	const handleOpenLogout = () => {
		modalLogout.openModal()
	}

	const handleNextStep = () => {
		setStep(step + 1)
	}

	const handlePreviousStep = () => {
		if (step > 1) {
			setStep(step - 1)
		}
	}

	return (
		<Stack className="items-center justify-center h-full">
			<Card className="relative w-[510px] h-[650px]">
				<CardHeader>
					<CardTitle>Closing</CardTitle>
				</CardHeader>
				<CardContent>
					{step === 1 && <CardCheckout />}
					{step === 2 && <CashCheckout />}
					{step === 3 && <FinalCheckout />}
				</CardContent>
				<CardFooter className="absolute bottom-0 w-full">
					<Stack direction="row" className="space-x-4 w-full">
						{step > 1 && (
							<Button
								variant="outline"
								onClick={handlePreviousStep}
								className="w-full"
							>
								Previous
							</Button>
						)}
						{step < 3 ? (
							<Button onClick={handleNextStep} className="w-full">
								Next
							</Button>
						) : (
							<Button
								variant="destructive"
								onClick={handleOpenLogout}
								className="w-full"
							>
								Logout
							</Button>
						)}
					</Stack>
				</CardFooter>
			</Card>
			<ModalLogout controller={modalLogout} />
		</Stack>
	)
}

export default Closing

const CardCheckout = () => {
	const { credit } = useDailyTotal()
	const EMVItems = ["Grey Button", "Param", "CB EMV", "Consultation"]
	const CLESSItems = ["Grey Button", "Param", "CB CLESS", "Consultation"]
	const AMEXItems = ["Grey Button", "Param", "AMEX CONTACT", "Consultation"]
	const AXQuickPayItems = [
		"Grey Button",
		"Param",
		"AX QUICK PAY",
		"Consultation",
	]

	return (
		<UserStep
			number={1}
			title="Check card revenue"
			description="Print the days tickets"
		>
			<Stack className="space-y-4">
				<BreadcrumbTuto items={EMVItems} />
				<BreadcrumbTuto items={CLESSItems} />
				<BreadcrumbTuto items={AMEXItems} />
				<BreadcrumbTuto items={AXQuickPayItems} />

				<p className="text-gray-500">
					Once you have the tickets, add the totals together to get today's
					Total Card Revenue
				</p>
				<p className="text-gray-500">
					Now, make sure this number matches with the card amount above.
				</p>
				<Stack
					direction="row"
					spacing={2}
					justifyContent="space-between"
					className="border border-gray-100 rounded-lg p-2 w-full bg-gray-50"
				>
					<Stack direction="row" spacing={2} className="items-center">
						<CreditCard />
						<p className="text-sm font-bold">Total Card Revenue</p>
					</Stack>
					<p className="text-sm font-bold">{credit} €</p>
				</Stack>
			</Stack>
		</UserStep>
	)
}

const BreadcrumbTuto = ({ items }) => {
	return (
		<Breadcrumb className="border border-gray-100 rounded-lg p-2 w-full">
			<BreadcrumbList>
				{items.map((item, index) => (
					<Stack direction="row" key={index} className="items-center gap-2">
						<BreadcrumbItem className="font-bold text-black">
							<BreadcrumbLink className="text-md">{item}</BreadcrumbLink>
						</BreadcrumbItem>
						{index < items.length - 1 && <BreadcrumbSeparator />}
					</Stack>
				))}
			</BreadcrumbList>
		</Breadcrumb>
	)
}

const CashCheckout = () => {
	const [cashBase, setCashBase] = useState(0)
	const { user } = useSession()
	const { cash } = useDailyTotal()
	const { notifyError, notifySuccess } = useNotify()

	const queryGetTodayCashBase = useQuery({
		queryFn: getDayCash,
		onSuccess: (data) => {
			setCashBase(data.drawer)
		},
		onError: () => {
			notifyError("An error occurred while fetching the cash base")
		},
	})

	const queryPrintCashTicket = useQuery({
		queryFn: printCashTicket,
		onSuccess: () => {
			notifySuccess("Ticket printed")
		},
		onError: () => {
			notifyError("An error occurred while printing the ticket")
		},
	})

	const queryOpenDrawer = useQuery({
		queryFn: openDrawer,
		onSuccess: () => {
			notifySuccess("Drawer opened")
		},
		onError: () => {
			notifyError("An error occurred while opening the drawer")
		},
	})

	const fetchDayCash = () => {
		// get date
		const timestamp = new Date()
		const day = timestamp.getDate()
		const month = timestamp.getMonth() + 1
		const year = timestamp.getFullYear()
		// getDay hook
		queryGetTodayCashBase.send({ year: year, month: month, day: day })
	}

	const handlePrintCashTicket = () => {
		queryPrintCashTicket.send({ user: user.firstName })
	}

	const handleOpenDrawer = () => {
		queryOpenDrawer.send()
	}

	useEffect(() => {
		fetchDayCash()
	}, [])

	return (
		<UserStep
			number={2}
			title="Count the cash"
			description="Print the ticket and fill in the details"
		>
			<Stack className="space-y-4">
				<Stack
					direction="row"
					spacing={2}
					justifyContent="space-between"
					className="border border-gray-100 rounded-lg p-2 w-full"
				>
					<p className="text-sm font-bold">Cash from yesterday</p>
					<p className="text-sm font-bold">{cashBase} €</p>
				</Stack>
				<Stack
					direction="row"
					spacing={2}
					justifyContent="space-between"
					className="border border-gray-100 rounded-lg p-2 w-full"
				>
					<p className="text-sm font-bold">Cash from today</p>
					<p className="text-sm font-bold">{cash} €</p>
				</Stack>
				<Stack
					direction="row"
					spacing={2}
					justifyContent="space-between"
					className="border border-gray-100 rounded-lg p-2 w-full bg-gray-50"
				>
					<Stack direction="row" spacing={2} className="items-center">
						<Banknote />
						<p className="text-sm font-bold">Total in Drawer</p>
					</Stack>
					<p className="text-sm font-bold">{cashBase + cash} €</p>
				</Stack>
				<Stack direction="row" className="space-x-4">
					<Button onClick={handleOpenDrawer} className="w-full">
						<PointOfSaleIcon />
					</Button>
					<Button
						onClick={handlePrintCashTicket}
						className="w-full bg-orange-400"
					>
						<ReceiptIcon />
					</Button>
				</Stack>
			</Stack>
		</UserStep>
	)
}

const FinalCheckout = () => {
	return (
		<UserStep
			number={3}
			title="Turn off everything"
			description="Make sure everything is off"
		>
			<Stack className="space-y-4">
				<p className="text-gray-500">
					Now you can turn off everything: the ticket printer, the keyboard, and
					the speaker.
				</p>
				<p className="text-gray-500">
					You can turn off the iPad after you log out.
				</p>
			</Stack>
		</UserStep>
	)
}
