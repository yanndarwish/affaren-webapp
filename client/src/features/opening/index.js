import { Stack } from "@mui/material"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

import PointOfSaleIcon from "@mui/icons-material/PointOfSale"

import { Input } from "../../components/ui/input"
import { Button } from "../../components/ui/button"
import { UserStep } from "../../components/userStep"
import { Modal } from "../../components/shared/modal"

import { useQuery } from "../../lib/hooks/useQuery"
import { useNotify } from "../../lib/hooks/useNotify"
import { useSession } from "../../lib/hooks/useSession"
import { getDayCash, postDayCash } from "../../lib/api"
import { useHardware } from "../../lib/hooks/useHardware"
import { TicketButton } from "../ticket/button"
import { DrawerButton } from "../drawer/button"

export const ModalOpening = ({ controller }) => {
	const [cashInput, setCashInput] = useState(0)

	const { user } = useSession()
	const navigate = useNavigate()
	const { notifyError, notifySuccess, notifyWarning } = useNotify()
	const { handleOpenDrawer, handlePrintCashTicket } = useHardware()

	const queryGetTodayCashBase = useQuery({
		queryFn: getDayCash,
		onSuccess: (data) => {
			if (data.amount > 0) {
				handleClose()
			}
		},
		onError: () => {
			notifyError("Failed to get cash amount")
		},
	})

	const queryPostDaysCash = useQuery({
		queryFn: postDayCash,
		onSuccess: () => {
			notifySuccess("Cash amount saved successfully")
			handleClose()
		},
		onError: () => {
			notifyError("Failed to save cash amount")
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

	const handleOpen = () => {
		if (cashInput !== 0) {
			const timestamp = new Date()
			const day = timestamp.getDate()
			const month = timestamp.getMonth() + 1
			const year = timestamp.getFullYear()

			const payload = {
				year: year,
				month: month,
				day: day,
				amount: parseFloat(cashInput),
			}

			queryPostDaysCash.send(payload)
		} else {
			notifyWarning("Please enter the cash amount")
		}
	}

	const handleClose = () => {
		navigate("/pos")
		controller.closeModal()
	}

	useEffect(() => {
		fetchDayCash()
	}, [])

	return (
		<Modal
			open={controller.open}
			title="Opening"
			handleClose={handleClose}
			className="!w-[50vw]"
		>
			<Stack className="h-full w-full space-y-4">
				<UserStep
					number={1}
					title="Count the cash"
					description="Print the ticket and fill in the details"
				>
					<TicketButton
						onClick={() => handlePrintCashTicket(user)}
						className="w-full"
					/>
				</UserStep>
				<UserStep
					number={2}
					title="Enter the total"
					description="Then put the ticket in the drawer"
				>
					<Stack className="space-y-4">
						<Input
							type="number"
							value={cashInput}
							onChange={(e) => setCashInput(e.target.value)}
						/>
						<DrawerButton onClick={handleOpenDrawer} className="w-full" />
					</Stack>
				</UserStep>
				<UserStep
					number={3}
					title="Turn on everything"
					description="Make sure everything is on"
				>
					<Stack className="space-y-4">
						<p className="text-gray-500">
							Make sure everything is on: the ticket printer, the keyboard. Turn
							on the speaker and put some music
						</p>
						<Button onClick={handleOpen} className="w-full">
							Open
						</Button>
					</Stack>
				</UserStep>
			</Stack>
		</Modal>
	)
}
