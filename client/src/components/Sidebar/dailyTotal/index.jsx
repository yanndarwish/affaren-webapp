import { Stack } from "@mui/material"
import { useDailyTotal } from "../../../lib/providers/dailyTotal"
import { Stat } from "../../stat"
import { Banknote, CreditCard, Tag, Euro } from "lucide-react"
import { Separator } from "../../ui/separator"

export const DailyTotal = () => {
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
					value={`${cash}€`}
					icon={<Banknote size={16} strokeWidth={1} />}
					border={false}
				/>
				<Separator orientation="vertical" className="mx-4 h-4" />
				<Stat
					value={`${credit}€`}
					icon={<CreditCard size={16} strokeWidth={1} />}
					border={false}
				/>
				<Separator orientation="vertical" className="mx-4 h-4" />
				<Stat
					value={`${check}€`}
					icon={<Tag size={16} strokeWidth={1} />}
					border={false}
				/>
				<Separator orientation="vertical" className="mx-4 h-4" />
			</Stack>
			<Stat
				value={`${total}€`}
				icon={<Euro size={16} strokeWidth={2} />}
				border={false}
				accent={true}
			/>
		</Stack>
	)
}
