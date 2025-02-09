import { Stack } from "@mui/material"
import { Delete } from "lucide-react"

import { useSale } from "../../../../lib/providers/sale"

import { Label } from "../../../../components/ui/label"
import { Input } from "../../../../components/ui/input"
import { Button } from "../../../../components/ui/button"
import { NumPad } from "../../../../components/common/NumPad/NumPad"
import { Tabs, TabsList, TabsTrigger } from "../../../../components/ui/tabs"

import { tabs } from "../../utils"
import { useNoBarcode } from "../../hooks/use-no-barcode"

export const NoBarcodeContainer = () => {
	const sale = useSale()
	const {
		product,
		focusedInput,
		handleChangeTab,
		handleInputClick,
		addNoBarcodeProduct,
		handleSubtractQuantity,
		handleAddQuantity,
		handleTypeQuantity,
		handleTypePrice,
		handleTypeNumber,
		handleCorrectQuantity,
		handleCorrectPrice,
	} = useNoBarcode()

	return (
		<>
			<div className="flex flex-col h-full p-4 space-y-2 justify-between overflow-hidden">
				<Stack className="overflow-hidden h-full space-y-4">
					<Tabs
						defaultValue={product.taxe}
						onValueChange={handleChangeTab}
						className="w-full"
					>
						<TabsList className="w-full p-0 bg-white">
							{tabs.map((tab) => (
								<TabsTrigger
									key={tab.value}
									value={tab.value}
									className={`w-full ${
										product.taxe === tab.value
											? "!bg-slate-900 !text-white"
											: "!bg-white"
									}`}
								>
									{tab.label}
								</TabsTrigger>
							))}
						</TabsList>
					</Tabs>
					<Stack className="space-y-4">
						<Stack className="space-y-1">
							<Label htmlFor="nb-qty">Quantity</Label>
							<div className="flex w-full max-w-sm items-center space-x-2">
								<Button
									onClick={handleSubtractQuantity}
									className="w-full"
									variant="outline"
								>
									-
								</Button>
								<Input
									id="nb-qty"
									onClick={handleInputClick}
									value={product.quantity}
									onChange={handleTypeQuantity}
									className={
										"text-center" +
										(focusedInput === "nb-qty" ? " border-2 border-black" : "")
									}
								/>
								<Button
									onClick={handleAddQuantity}
									className="w-full"
									variant="outline"
								>
									+
								</Button>
								<Button onClick={handleCorrectQuantity}>
									<Delete data-id="nb-qty" />
								</Button>
							</div>
						</Stack>
						<Stack className="space-y-1">
							<Label htmlFor="nb-price">Price</Label>
							<div className="flex w-full max-w-sm items-center space-x-2">
								<Input
									id="nb-price"
									onClick={handleInputClick}
									value={product.price}
									onChange={handleTypePrice}
									className={
										focusedInput === "nb-price" ? "border-2 border-black" : ""
									}
								/>
								<Button onClick={handleCorrectPrice}>
									<Delete data-id="nb-price" />
								</Button>
							</div>
						</Stack>
					</Stack>
				</Stack>
				<Stack className="flex flex-col w-full pt-2 space-y-8">
					<NumPad onClick={handleTypeNumber} />
					<Button
						onClick={addNoBarcodeProduct}
						className="w-full"
						disabled={sale.isRefund}
					>
						Add product
					</Button>
				</Stack>
			</div>
		</>
	)
}
