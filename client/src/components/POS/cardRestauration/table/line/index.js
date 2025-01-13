import { Stack } from "@mui/material"
import { Trash2Icon, UserRound } from "lucide-react"
import { Typography } from "../../../../ui/typography"
import { useSale } from "../../../../../lib/providers/sale"
import { useConfig } from "../../../../../lib/hooks/useConfig"
import { getTablePrice } from "../../../../../lib/restauration/utils"
import { roundUpToTwoDecimals } from "../../../../../lib/pos"
import { Button } from "../../../../ui/button"
import { useModal } from "../../../../shared/modal"
import { ModalDeleteTable } from "../../modals/delete"
import { useNotify } from "../../../../../lib/hooks/useNotify"

export const TableLine = ({ table, uuid, onClick = () => null }) => {
	const { table: saleTable, removeTable } = useSale()
	const modalRemoveTable = useModal()
	const { config } = useConfig()
	const { notifySuccess } = useNotify()

	const tablePrice = getTablePrice(table)
	const isSelected = saleTable === table.id

	const handleClickRemove = (e) => {
		e.stopPropagation()
		modalRemoveTable.setData(table)
		modalRemoveTable.openModal()
	}

	const handleConfirmRemove = (e) => {
		e.stopPropagation()
		removeTable(uuid)
		notifySuccess("Table removed successfully")
		modalRemoveTable.closeModal()
	}

	if (!table) return null
	return (
		<Stack
			direction="row"
			spacing={1}
			alignItems="center"
			justifyContent="space-between"
			onClick={onClick}
			className={`rounded-md ${isSelected ? "bg-slate-900 text-white" : ""}`}
		>
			<Stack direction="row" spacing={1} alignItems="center">
				<p
					className={`text-sm p-2 font-medium ${
						isSelected ? "bg-slate-900" : "bg-slate-100"
					} rounded-full w-8 h-8 flex items-center justify-center`}
				>
					{table.id}
				</p>
				<Stack direction="row">
					{Array.from({ length: table.people }).map((_, i) => (
						<UserRound key={i} className="w-4 h-4 text-gray-400" />
					))}
				</Stack>
			</Stack>
			<Stack
				direction="row"
				className="justify-between items-center space-x-2 "
			>
				<Stack direction="row" className="items-center">
					<Typography variant="large">
						{roundUpToTwoDecimals(tablePrice)}
					</Typography>
					<config.general.currency.symbol className="w-4 h-4" />
				</Stack>
				<Button size="icon" onClick={handleClickRemove}>
					<Trash2Icon />
				</Button>
			</Stack>
			<ModalDeleteTable
				controller={modalRemoveTable}
				onConfirm={handleConfirmRemove}
			/>
		</Stack>
	)
}
