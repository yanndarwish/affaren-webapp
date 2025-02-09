import { CardContent } from "../../../../components/ui/card"
import { EmptyCart } from "./empty"
import { CartTable } from "./table"

export const CartContent = ({
	sale,
	onSelect,
	onQuantityUpdate,
	onSelectedQuantityUpdate,
	onRemove,
	onAddToDiscount,
}) => (
	<CardContent className="h-full overflow-hidden">
		{sale.products.length === 0 ? (
			<EmptyCart />
		) : (
			<CartTable
				sale={sale}
				onSelect={onSelect}
				onQuantityUpdate={onQuantityUpdate}
				onSelectedQuantityUpdate={onSelectedQuantityUpdate}
				onRemove={onRemove}
				onAddToDiscount={onAddToDiscount}
			/>
		)}
	</CardContent>
)
