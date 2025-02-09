import {
	BadgePercent,
	Barcode,
	BookmarkCheck,
	ChefHat,
	Home,
	Layers2,
	Slash,
} from "lucide-react"
import { NoBarcodeContainer } from "../../features/no-barcode/components/container"
import { ShortcutContainer } from "../../features/shortcut/components/container"
import { DiscountContainer } from "../../features/discount/components/container"
import { BookmarkContainer } from "../../features/bookmarks/components/container"
import { CardRestauration } from "../../features/restauration"

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
			component: <NoBarcodeContainer />,
		},
		{
			name: "shortcuts",
			label: <Layers2 className="w-4 h-4" />,
			component: <ShortcutContainer />,
		},
		{
			name: "discount",
			label: <BadgePercent className="w-4 h-4" />,
			component: <DiscountContainer />,
		},
		{
			name: "bookmarks",
			label: <BookmarkCheck className="w-4 h-4" />,
			component: <BookmarkContainer />,
		},
		{
			name: "restauration",
			label: <ChefHat className="w-4 h-4" />,
			component: <CardRestauration />,
		},
	],
}
