import { Stack } from "@mui/material"
import { Typography } from "../../../../../ui/typography"
import { useSale } from "../../../../../../lib/providers/sale"
import { useConfig } from "../../../../../../lib/hooks/useConfig"
import { useNotify } from "../../../../../../lib/hooks/useNotify"
import { roundUpToTwoDecimals } from "../../../../../../lib/pos"

export const ProductCard = ({ product, uuid }) => {
	const { config, getModule } = useConfig()
	const { addTableProduct } = useSale()
	const { notifyInfo } = useNotify()

	const handleAddProduct = () => {
		addTableProduct(uuid, product)
		notifyInfo(`Product ${product.name} added to table`)
	}

	const coloredType = getModule("restauration").settings.filters.find(
		(filter) => filter.name === product.type
	)

	return (
		<div
			className="px-4 py-3 rounded-md cursor-pointer"
			onClick={handleAddProduct}
			style={{
				backgroundColor: coloredType.color,
			}}
		>
			<Stack
				direction="row"
				justifyContent="space-between"
				alignItems="center"
				spacing={2}
			>
				<Typography
					variant="large"
					className="whitespace-nowrap overflow-hidden text-ellipsis max-w-full block"
				>
					{product.name}
				</Typography>
				<Stack direction="row" className="items-center">
					<Typography variant="muted" className="font-semibold">
						{roundUpToTwoDecimals(product.price)}
					</Typography>
					<config.general.currency.symbol className="w-4 h-4 text-gray-500" />
				</Stack>
			</Stack>

			<Typography
				variant="muted"
				className="whitespace-nowrap overflow-hidden text-ellipsis max-w-full block"
			>
				{product.ingredients.join(", ")}
			</Typography>
		</div>
	)
}

export const SelectedProductCard = ({ product }) => {
	return (
		<div className="px-4 py-3 border rounded-md">
			<Stack direction="row" justifyContent="space-between">
				<Typography variant="large">{product.name}</Typography>
				<Typography variant="lead">{product.quantity}</Typography>
			</Stack>
			<Typography
				variant="muted"
				className="whitespace-nowrap overflow-hidden text-ellipsis max-w-full block"
			>
				{product.ingredients.join(", ")}
			</Typography>
		</div>
	)
}
