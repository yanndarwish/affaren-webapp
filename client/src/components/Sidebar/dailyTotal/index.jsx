import { Stack } from "@mui/material"
import { useDailyTotal } from "../../../lib/providers/dailyTotal"
import { Stat } from "../../stat"
import { Banknote, CreditCard, Tag, Euro } from "lucide-react"
import { Separator } from "../../ui/separator"

export const DailyTotal = () => {
	const { cash, credit, check, total } = useDailyTotal()

	return (
		<Stack direction="row" justifyContent="center" alignItems="center" className="px-4">
			<Stat value={`${cash}€`} icon={<Banknote />} border={false} />
			<Separator orientation="vertical" className="mx-8 h-4" />
			<Stat value={`${credit}€`} icon={<CreditCard />} border={false} />
			<Separator orientation="vertical" className="mx-8 h-4" />
			<Stat value={`${check}€`} icon={<Tag />} border={false} />
			<Separator orientation="vertical" className="mx-8 h-4" />
			<Stat value={`${total}€`} icon={<Euro />} border={false} />
		</Stack>
	)
}
