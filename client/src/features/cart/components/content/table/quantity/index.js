import { cn } from "../../../../../../lib/utils"
import { Plus, Minus } from "lucide-react"

export const QuantityControl = ({
	product,
	productInfo,
	onUpdate,
	addIsDisabled,
	removeIsDisabled,
}) => {
	return (
		<div className="flex items-center gap-8 justify-center">
			<Minus
				className={cn(
					"cursor-pointer",
					removeIsDisabled && "opacity-50 cursor-not-allowed"
				)}
				onClick={() => !removeIsDisabled && onUpdate(product.id, -1)}
			/>
			<span className="text-sm text-gray-500">
				{productInfo.isSelected
					? productInfo.selectedProduct?.quantity +
					  " / " +
					  productInfo.displayQuantity
					: productInfo.displayQuantity}
				{productInfo.isPartiallyPaid && (
					<span className="text-xs text-orange-500 ml-1">
						({productInfo.paidProduct.quantity} paid)
					</span>
				)}
			</span>
			<Plus
				className={cn(
					"cursor-pointer",
					addIsDisabled && "opacity-50 cursor-not-allowed"
				)}
				onClick={() => !addIsDisabled && onUpdate(product.id, 1)}
			/>
		</div>
	)
}
