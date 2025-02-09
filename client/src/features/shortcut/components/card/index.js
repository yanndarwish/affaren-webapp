import { useEffect } from "react"

import { Stack } from "@mui/material"

import { useSale } from "../../../../lib/providers/sale"
import { useLongPress } from "../../../../lib/hooks/useLongPress"

import { ModalUpdateShortcut } from "../modals/update"
import { useShortcuts } from "../../hooks/use-shortcuts"

export const ShortcutCard = ({ shortcut, onSuccess = () => null }) => {
	const sale = useSale()
	const { action, handlers } = useLongPress()
	const { modalUpdate, handleAddToSale } = useShortcuts({})

	const handleUpdate = () => {
		modalUpdate.setData(shortcut)
		modalUpdate.openModal()
	}

	useEffect(() => {
		if (action === "longpress") {
			handleUpdate()
		} else if (action === "click") {
			if (!sale.isRefund) {
				handleAddToSale(shortcut)
			}
		}
	}, [action])

	return (
		<>
			<Stack
				className={`relative long-press w-full h-20 text-white rounded-md flex items-center justify-center ${
					sale.isRefund ? "bg-slate-900/50" : "bg-slate-900"
				}`}
				{...handlers}
			>
				{shortcut.card_name}
			</Stack>
			<ModalUpdateShortcut controller={modalUpdate} onSuccess={onSuccess} />
		</>
	)
}
