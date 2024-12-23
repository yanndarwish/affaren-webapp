import { Barcode, Layers2, Slash, BadgePercent, BookmarkCheck } from "lucide-react"
import { CardDiscount } from "../../components/POS/cardDiscount"
import { CardNoBarcode } from "../../components/POS/cardNoBarcode"
import { CardShortcut } from "../../components/POS/cardShortcut"
import { CardBookmark } from "../../components/POS/cardBookmark"

export const tabs = [
	{
		name: "no_barcode",
		label: (
			<div className="relative flex items-center gap-2">
				<Slash className="absolute left-0 w-4 h-4" />
				<Barcode className="w-4 h-4" />
			</div>
		),
		component: <CardNoBarcode />,
	},
	{
		name: "shorcuts",
		label: <Layers2 className="w-4 h-4" />,
		component: <CardShortcut />,
	},
	{
		name: "discount",
		label: <BadgePercent className="w-4 h-4" />,
		component: <CardDiscount />,
	},
	{
		name: "bookmark",
		label: <BookmarkCheck className="w-4 h-4" />,
		component: <CardBookmark />,
	},
]
