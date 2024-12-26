import { BadgePercent, Barcode, BookmarkCheck, Home, Layers2, Slash } from "lucide-react"
import { CardNoBarcode } from "../../components/POS/cardNoBarcode"
import { CardShortcut } from "../../components/POS/cardShortcut"
import { CardDiscount } from "../../components/POS/cardDiscount"
import { CardBookmark } from "../../components/POS/cardBookmark"

export const config = {
	name: "pos",
	label: "Point of sale",
	icon: Home,
	tabs: [
		{
			name: "no-barcode",
			label: (
				<div className="relative flex items-center gap-2">
					<Slash className="absolute left-0 w-4 h-4" />
					<Barcode className="w-4 h-4" />
				</div>
			),
			component: <CardNoBarcode />,
		},
		{
			name: "shortcuts",
			label: <Layers2 className="w-4 h-4" />,
			component: <CardShortcut />,
		},
		{
			name: "discount",
			label: <BadgePercent className="w-4 h-4" />,
			component: <CardDiscount />,
		},
		{
			name: "bookmarks",
			label: <BookmarkCheck className="w-4 h-4" />,
			component: <CardBookmark />,
		},
	],
}
