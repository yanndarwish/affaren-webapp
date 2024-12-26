import BarcodeSection from "../../components/POS/BarcodeSection/BarcodeSection"
import Cart from "../../components/POS/Cart"
import { Stack } from "@mui/material"
import { useState } from "react"
import {
	Tabs,
	TabsContent,
	TabsList,
	TabsTrigger,
} from "../../components/ui/tabs"

import { PageTitle } from "../../components/shared/pageTitle"
import { Card } from "../../components/ui/card"
import { TotalSection } from "../../components/POS/totalSection/index.js"
import { useSale } from "../../lib/providers/sale"
import { useNotify } from "../../lib/hooks/useNotify/index.js"
import { useConfig } from "../../lib/hooks/useConfig/index.js"
import { config } from "./config.js"

const Pos = () => {
	const [selectedTab, setSelectedTab] = useState(config.tabs[0].name)
	const { notifySuccess, notifyInfo } = useNotify()
	const { isActiveComponent } = useConfig()
	const sale = useSale()

	const handleDiscount = () => {
		setSelectedTab(config.tabs[2].name)
	}

	const handleBookmark = () => {
		setSelectedTab(config.tabs[3].name)
	}

	const updateCart = (data) => {
		const foundProduct = data[0]
		let found = sale.products.find(
			(product) => product.id === foundProduct.product_id
		)

		if (!found) {
			let product = {
				id: foundProduct.product_id,
				name: foundProduct.product_name,
				price: parseFloat(foundProduct.product_price),
				taxe: foundProduct.product_taxe,
				quantity: 1,
			}

			sale.updateSale({ products: [...sale.products, product] })
			notifySuccess(`Product ${foundProduct.product_name} added to the cart`)
		} else {
			found = {
				...found,
				quantity: found.quantity + 1,
			}

			const updated = sale.products.map((product) => {
				if (product.id === found.id) {
					return found
				} else {
					return product
				}
			})
			sale.updateSale({ products: updated })
			notifyInfo(`Product ${foundProduct.product_name} quantity updated`)
		}
	}

	const displayedTabs = () => {
		return config.tabs.filter((tab) => {
			return isActiveComponent(config.name, tab.name)
		})
	}

	return (
		<Stack
			direction="row"
			alignItems="flex-start"
			spacing={2}
			className="h-full"
		>
			<Stack direction="column" spacing={2} className="w-full h-full relative">
				<PageTitle title={`Sale N°${sale.id ?? 1}`} />
				{isActiveComponent("pos", "barcode") && (
					<BarcodeSection onSuccess={updateCart} />
				)}
				<Stack className="h-full overflow-y-auto">
					{isActiveComponent("pos", "cart") && (
						<Cart onDiscount={handleDiscount} onBookmark={handleBookmark} />
					)}
				</Stack>
				<Stack className="sticky bottom-0 w-full">
					<TotalSection />
				</Stack>
			</Stack>

			<Card className="relative w-[400px] h-full">
				<Tabs
					value={selectedTab}
					onValueChange={setSelectedTab}
					className="w-full h-full"
				>
					<TabsList className="w-full">
						{displayedTabs().map((tab) => (
							<TabsTrigger key={tab.name} value={tab.name} className="w-full">
								{tab.label}
							</TabsTrigger>
						))}
					</TabsList>
					{displayedTabs().map((tab) => (
						<TabsContent key={tab.name} value={tab.name}>
							{tab.component}
						</TabsContent>
					))}
				</Tabs>
			</Card>
		</Stack>
	)
}

export default Pos
