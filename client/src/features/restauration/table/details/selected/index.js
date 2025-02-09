import { Stack } from "@mui/material"
import { Minus, Plus } from "lucide-react"
import { Button } from "../../../../../components/ui/button"
import { Typography } from "../../../../../components/ui/typography"
import { useSale } from "../../../../../lib/providers/sale"
import { useNotify } from "../../../../../lib/hooks/useNotify"
import { NoRestaurantTable } from "../../../../../pages/Pos/config"
import { getTablePrice } from "../../../../../lib/restauration/utils"
import { useConfig } from "../../../../../lib/hooks/useConfig"
import { roundUpToTwoDecimals } from "../../../../../lib/pos"
import { Separator } from "../../../../../components/ui/separator"

export const SelectedProducts = ({ products, uuid }) => {
	const { updateTableProductQty } = useSale()
	const { config } = useConfig()
	const { notifyInfo } = useNotify()

	const handleProductQty = (uuid, productId, qty) => {
		updateTableProductQty(uuid, productId, qty)
		notifyInfo(
			`${products.find((p) => p.id === productId).name} quantity updated`
		)
	}

	return (
		<Stack spacing={2} className="h-full bg-muted/50 rounded-md p-4 w-1/3">
			{products.length === 0 ? (
				<div className="flex flex-col items-center justify-center space-y-8 h-full">
					<NoRestaurantTable className="w-10 h-10 text-gray-200" />
					<p className="text-md text-gray-500">No products selected</p>
				</div>
			) : (
				<Stack
					className="h-full overflow-y-auto"
					direction="column"
					spacing={2}
					justifyContent="space-between"
				>
					<Stack className="overflow-y-auto" spacing={1}>
						{products.map((product, index) => (
							<Stack
								key={index}
								direction="row"
								justifyContent="space-between"
								alignItems="center"
								className="w-full"
								spacing={1}
							>
								<Typography
									variant="p"
									className="w-full text-left whitespace-nowrap overflow-hidden text-ellipsis"
								>
									{product.name}
								</Typography>
								<Stack direction="row" spacing={1} alignItems="center">
									<Button
										size="icon"
										variant="outline"
										onClick={() => handleProductQty(uuid, product.id, -1)}
									>
										<Minus />
									</Button>
									<Typography variant="p">{product.quantity}</Typography>
									<Button
										size="icon"
										variant="outline"
										onClick={() => handleProductQty(uuid, product.id, 1)}
									>
										<Plus />
									</Button>
								</Stack>
							</Stack>
						))}
					</Stack>
					<Stack spacing={2}>
						<Separator />
						<Stack direction="row" justifyContent="flex-end" spacing={1}>
							<Typography variant="h4">Total</Typography>
							<Stack direction="row" className="items-center">
								<Typography variant="h4">
									{roundUpToTwoDecimals(getTablePrice({ products }))}
								</Typography>

								<config.general.currency.symbol className="w-5 h-5" />
							</Stack>
						</Stack>
					</Stack>
				</Stack>
			)}
		</Stack>
	)
}
