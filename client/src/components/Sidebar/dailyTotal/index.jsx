import { Stack } from "@mui/material"
import { Banknote, CreditCard, Tag, Euro } from "lucide-react"

import { Stat } from "../../stat"
import { Separator } from "../../ui/separator"
import { useConfig } from "../../../lib/hooks/useConfig"
import { useDailyTotal } from "../../../lib/providers/dailyTotal"

export const DailyTotal = () => {
	const { config } = useConfig()
	const { cash, credit, check, total } = useDailyTotal()

	return (
		<Stack
			direction="row"
			justifyContent="center"
			alignItems="center"
			className="px-4"
		>
			<Stack
				direction="row"
				justifyContent="center"
				alignItems="center"
				className="px-2"
			>
				<Stat
					value={`${cash}`}
					extra={
						<config.general.currency.symbol className="w-5 h-5 text-slate-400" />
					}
					icon={<Banknote size={16} strokeWidth={1} />}
					border={false}
				/>
				<Separator orientation="vertical" className="mx-4 h-4" />
				<Stat
					value={`${credit}`}
					extra={
						<config.general.currency.symbol className="w-5 h-5 text-slate-400" />
					}
					icon={<CreditCard size={16} strokeWidth={1} />}
					border={false}
				/>
				<Separator orientation="vertical" className="mx-4 h-4" />
				<Stat
					value={`${check}`}
					extra={
						<config.general.currency.symbol className="w-5 h-5 text-slate-400" />
					}
					icon={<Tag size={16} strokeWidth={1} />}
					border={false}
				/>
				<Separator orientation="vertical" className="mx-4 h-4" />
			</Stack>
			<Stat
				value={`${total}`}
				extra={
					<config.general.currency.symbol className="w-5 h-5 text-slate-900" />
				}
				icon={<Euro size={16} strokeWidth={2} />}
				border={false}
				accent={true}
			/>
		</Stack>
	)
}
