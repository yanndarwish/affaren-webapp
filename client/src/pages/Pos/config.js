import {
	BadgePercent,
	Barcode,
	BookmarkCheck,
	ChefHat,
	Home,
	Layers2,
	Slash,
} from "lucide-react"
import { CardNoBarcode } from "../../components/POS/cardNoBarcode"
import { CardShortcut } from "../../components/POS/cardShortcut"
import { CardDiscount } from "../../components/POS/cardDiscount"
import { CardBookmark } from "../../components/POS/cardBookmark"
import { CardRestauration } from "../../components/POS/cardRestauration"

export const NoBarcode = ({ className }) => {
	return (
		<div className="relative flex items-center">
			<Slash className={`absolute left-0 ${className}`} />
			<Barcode className={`${className}`} />
		</div>
	)
}

export const NoRestaurantTable = ({ className }) => {
	return (
		<div className="relative flex items-center">
			<Slash className={`absolute left-0 ${className}`} />
			<ChefHat className={`${className}`} />
		</div>
	)
}

export const config = {
	name: "pos",
	label: "Point of sale",
	icon: Home,
	tabs: [
		{
			name: "no-barcode",
			label: <NoBarcode className="w-4 h-4" />,
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
		{
			name: "restauration",
			label: <ChefHat className="w-4 h-4" />,
			component: <CardRestauration />,
		},
	],
}
