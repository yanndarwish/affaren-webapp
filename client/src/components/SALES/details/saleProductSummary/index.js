import { Divider, Stack } from "@mui/material"
import { Apple, Flag, Newspaper, Shapes } from "lucide-react"
import { useConfig } from "../../../../lib/hooks/useConfig"

export const SaleProductSummary = ({ products, readOnly = false }) => {
	const { config } = useConfig()

	if (!products) return null

	const foodProducts = products.filter(
		(product) => product.product_taxe === "5.5"
	)

	const pressProducts = products.filter(
		(product) => product.product_taxe === "2.1"
	)

	const otherProducts = products.filter(
		(product) => product.product_taxe === "20"
	)

	return (
		<>
			<Stack direction="row" gap={2}>
				{!readOnly && (
					<>
						<ProductTypeCard value={foodProducts.length} icon={<Apple />} />
						<ProductTypeCard
							value={pressProducts.length}
							icon={<Newspaper />}
						/>
						<ProductTypeCard value={otherProducts.length} icon={<Shapes />} />
						<ProductTypeCard
							value={products.length}
							icon={<Flag />}
							primary
							className="w-full"
						/>
					</>
				)}
			</Stack>

			<Stack
				direction="column"
				className="border border-gray-100 rounded-lg p-4 w-full"
				spacing={1}
			>
				{products.map((product, i) => (
					<Stack key={product.product_id} spacing={1}>
						<Stack
							direction="row"
							spacing={2}
							justifyContent="space-between"
							className="w-full"
						>
							<p className="text-sm text-gray-500 text-left text-ellipsis overflow-hidden whitespace-nowrap w-[100%]">
								{product.product_name}
							</p>
							<Stack
								direction="row"
								spacing={2}
								className="w-full"
								justifyContent="flex-end"
							>
								<p className="text-sm font-medium text-center ">
									{product.product_quantity}
								</p>
								{!readOnly && (
									<Stack direction="row" alignItems="center" spacing={0.5}>
										<p className="text-sm text text-end font-medium w-20">
											{product.product_price}
										</p>
										<config.general.currency.symbol className="w-4 h-4" />
									</Stack>
								)}
							</Stack>
						</Stack>
						{i !== products.length - 1 && <Divider sx={{ opacity: 0.4 }} />}
					</Stack>
				))}
			</Stack>
		</>
	)
}

const ProductTypeCard = ({ value, icon, primary }) => {
	return (
		<Stack
			direction="row"
			spacing={2}
			justifyContent="center"
			className={`border border-gray-100 rounded-lg p-2 w-full ${
				primary ? "bg-primary text-white" : ""
			}`}
		>
			{icon}
			<p>{value}</p>
		</Stack>
	)
}
