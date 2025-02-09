import { Grid, Stack } from "@mui/material"
import { BadgePercent, Trash2Icon } from "lucide-react"

import { useSale } from "../../../../lib/providers/sale"

import { Tabs, TabsList, TabsTrigger } from "../../../../components/ui/tabs"
import { NumPad } from "../../../../components/common/NumPad/NumPad"
import { Separator } from "../../../../components/ui/separator"
import { Checkbox } from "../../../../components/ui/checkbox"
import { Button } from "../../../../components/ui/button"
import { useDiscount } from "../../hooks/use-discount"

export const DiscountContainer = () => {
	const sale = useSale()
	const {
		discountAmount,
		selected,
		discountType,
		setDiscountAmount,
		types,
		setDiscountType,
		handleRemoveDiscount,
		handleTypeNumber,
		handleCorrect,
		handleResetDiscount,
		handleApplyDiscount,
		handleSelect,
	} = useDiscount()

	return (
		<>
			<div className="flex flex-col h-full p-4 space-y-2 justify-between overflow-hidden">
				{sale.discount.length === 0 ? (
					<div className="flex flex-col items-center justify-center space-y-8 h-full">
						<BadgePercent className="w-10 h-10 text-gray-200" />
						<p className="text-md text-gray-500">
							No products in discount list
						</p>
					</div>
				) : (
					<Stack className="space-y-2 h-full overflow-hidden">
						<Tabs
							defaultValue={discountType.name}
							onValueChange={setDiscountType}
							className="w-full space-y-4"
						>
							<TabsList className="w-full p-0 bg-white">
								{types.map((tab) => (
									<TabsTrigger
										key={tab.name}
										value={tab.name}
										className={`w-full ${
											discountType === tab.name
												? "!bg-black !text-white"
												: "!bg-white"
										}`}
									>
										{tab.label}
									</TabsTrigger>
								))}
							</TabsList>
						</Tabs>
						<Stack className="overflow-y-auto h-full">
							<Grid container rowSpacing={1} columnSpacing={1}>
								{sale.discount.map((product, i) => (
									<Grid
										item
										xs={12}
										key={product.productId}
										className="space-y-2"
									>
										<Stack
											direction="row"
											alignItems="center"
											justifyContent="space-between"
										>
											<Stack
												direction="row"
												alignItems="center"
												className="space-x-4"
											>
												<Checkbox
													checked={selected.some(
														(p) => p.productId === product.productId
													)}
													onCheckedChange={() => handleSelect(product)}
													aria-label="Select row"
												/>
												<div>{product.productName}</div>
											</Stack>
											<Stack
												direction="row"
												justifyContent="flex-end"
												alignItems="center"
												className="space-x-2"
											>
												<Button
													size="icon"
													onClick={() =>
														handleRemoveDiscount(product.productId)
													}
												>
													<Trash2Icon />
												</Button>
											</Stack>
										</Stack>
										{i !== sale.discount.length - 1 && (
											<Separator className="p-0 m-0" />
										)}
									</Grid>
								))}
							</Grid>
						</Stack>
					</Stack>
				)}

				<Stack className="flex flex-col w-full pt-2 space-y-8">
					{sale.discount.length !== 0 && (
						<NumPad
							display
							unit={types.find((tab) => tab.name === discountType).unit}
							value={discountAmount}
							setValue={setDiscountAmount}
							onClick={handleTypeNumber}
							onCorrect={handleCorrect}
						/>
					)}
					<Stack direction="row" className="w-full space-x-4">
						<Button
							onClick={handleResetDiscount}
							variant="destructive"
							className="w-full"
							disabled={sale.discount.length === 0}
						>
							Clear all
						</Button>
						<Button
							className="w-full"
							disabled={sale.discount.length === 0}
							onClick={handleApplyDiscount}
						>
							Apply Discount
						</Button>
					</Stack>
				</Stack>
			</div>
		</>
	)
}
