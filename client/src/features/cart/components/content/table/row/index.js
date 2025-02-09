import { TableRow, TableCell } from "../../../../../../components/ui/table"
import { Checkbox } from "../../../../../../components/ui/checkbox"
import { Stack } from "@mui/material"
import { Typography } from "../../../../../../components/ui/typography"
import { QuantityControl } from "../quantity"
import { ProductActions } from "../actions"

export const CartRow = ({
	index,
	product,
	sale,
	onSelect = () => null,
	onQuantityUpdate = () => null,
	onSelectedQuantityUpdate = () => null,
	onRemove = () => null,
	onAddToDiscount = () => null,
}) => {
	const getProductInfo = (product, sale) => {
		const paidProduct = sale.paidProducts.find((p) => p.id === product.id)
		const selectedProduct = sale.selectedProducts.find(
			(p) => p.id === product.id
		)
		const isSelected = !!selectedProduct
		const discountedProduct = sale.discount.find(
			(p) => p.productId === product.id
		)

		const info = {
			isSelected,
			selectedProduct,
			discountedProduct,
			paidProduct,
			isFullyPaid: false,
			isPartiallyPaid: false,
			displayQuantity: product.quantity - (paidProduct?.quantity || 0),
			price: product.price * product.quantity,
			addIsDisabled: false,
			removeIsDisabled: false,
		}

		// Update paid status
		if (paidProduct) {
			info.isFullyPaid = paidProduct.quantity === product.quantity
			info.isPartiallyPaid = paidProduct.quantity < product.quantity
			info.displayQuantity = product.quantity - paidProduct.quantity
			info.price = product.price * info.displayQuantity
		}

		// Update quantity and price if selected
		if (selectedProduct) {
			// info.displayQuantity = selectedProduct.quantity
			info.price = selectedProduct.price * selectedProduct.quantity
		}

		// Update disabled states
		info.addIsDisabled =
			info.isFullyPaid || selectedProduct?.quantity === info.displayQuantity
		info.removeIsDisabled = info.isFullyPaid || selectedProduct?.quantity === 1

		return info
	}

	const {
		isSelected,
		isFullyPaid,
		price,
		addIsDisabled,
		removeIsDisabled,
		discountedProduct,
	} = getProductInfo(product, sale)

	const handleQuantityUpdate = (id, value) => {
		const handler = isSelected ? onSelectedQuantityUpdate : onQuantityUpdate
		handler(id, value)
	}

	return (
		<TableRow
			className={isFullyPaid ? "opacity-50 line-through bg-green-300/50" : ""}
		>
			<TableCell className="font-medium">
				<Checkbox
					checked={isSelected}
					disabled={isFullyPaid}
					onCheckedChange={() => onSelect(product)}
					aria-label="Select row"
				/>
			</TableCell>
			<TableCell className="font-medium">{index + 1}</TableCell>
			<TableCell className="max-w-40 text-ellipsis overflow-hidden whitespace-nowrap">
				{product.name}
			</TableCell>
			<TableCell>
				<QuantityControl
					product={product}
					productInfo={getProductInfo(product, sale)}
					addIsDisabled={addIsDisabled}
					removeIsDisabled={removeIsDisabled}
					onUpdate={handleQuantityUpdate}
				/>
			</TableCell>
			<TableCell className="text-right">
				{discountedProduct ? (
					<Stack
						direction="row"
						spacing={2}
						alignItems="center"
						justifyContent="flex-end"
					>
						<Typography variant="muted" className="text-gray-400">
							{(
								Math.round(discountedProduct.originalPrice * 100) / 100
							).toFixed(2)}
						</Typography>
						<Typography variant="small" className="w-10">
							{(Math.round(discountedProduct.newPrice * 100) / 100).toFixed(2)}
						</Typography>
					</Stack>
				) : (
					<Typography variant="small" className="w-10">
						{(Math.round(price * 100) / 100).toFixed(2)}
					</Typography>
				)}
			</TableCell>
			<TableCell className="text-right">
				<ProductActions
					product={product}
					sale={sale}
					isSelected={isSelected}
					disabled={isFullyPaid}
					onRemove={onRemove}
					onAddToDiscount={onAddToDiscount}
				/>
			</TableCell>
		</TableRow>
	)
}
