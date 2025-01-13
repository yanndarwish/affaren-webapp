import { Stack } from "@mui/material"
import { ProductCard } from "../product"

export const ListProducts = ({ products, filter, uuid }) => {
	return (
		<Stack className="overflow-y-auto w-2/3">
			<div className="grid gap-4 grid-cols-2">
				{products
					.filter((product) => filter === "all" || product.type === filter)
					.map((product) => (
						<ProductCard key={product.id} product={product} uuid={uuid} />
					))}
			</div>
		</Stack>
	)
}
