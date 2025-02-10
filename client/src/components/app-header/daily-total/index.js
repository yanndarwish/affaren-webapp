import { Stack } from "@mui/material"
import { Banknote, CreditCard, Tag } from "lucide-react"

import { Stat } from "../../stat"
import { Separator } from "../../ui/separator"
import { useConfig } from "../../../lib/hooks/useConfig"
import { useDailyTotal } from "../../../lib/providers/dailyTotal"
import { roundUpToTwoDecimals } from "../../../lib/pos"

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
					value={`${roundUpToTwoDecimals(cash)}`}
					extra={
						<config.general.currency.symbol className="w-5 h-5 text-slate-400" />
					}
					icon={<Banknote size={16} strokeWidth={1} />}
					border={false}
				/>
				<Separator orientation="vertical" className="mx-4 h-4" />
				<Stat
					value={`${roundUpToTwoDecimals(credit)}`}
					extra={
						<config.general.currency.symbol className="w-5 h-5 text-slate-400" />
					}
					icon={<CreditCard size={16} strokeWidth={1} />}
					border={false}
				/>
				<Separator orientation="vertical" className="mx-4 h-4" />
				<Stat
					value={`${roundUpToTwoDecimals(check)}`}
					extra={
						<config.general.currency.symbol className="w-5 h-5 text-slate-400" />
					}
					icon={<Tag size={16} strokeWidth={1} />}
					border={false}
				/>
				<Separator orientation="vertical" className="mx-4 h-4" />
			</Stack>
			<Stat
				value={`${roundUpToTwoDecimals(total)}`}
				extra={
					<config.general.currency.symbol className="w-5 h-5 text-slate-900" />
				}
				icon={<config.general.currency.symbol size={16} strokeWidth={2} />}
				border={false}
				accent={true}
			/>
		</Stack>
	)
}
