import BarcodeSection from "../../components/POS/BarcodeSection/BarcodeSection.jsx"
import Cart from "../../components/POS/Cart/index.js"
import { Stack } from "@mui/material"
import { useEffect, useState } from "react"
import {
	Tabs,
	TabsContent,
	TabsList,
	TabsTrigger,
} from "../../components/ui/tabs/index.js"

import { PageTitle } from "../../components/shared/pageTitle/index.jsx"
import { Card } from "../../components/ui/card/index.js"
import { TotalSection } from "../../components/POS/totalSection/index.js"
import { useSale } from "../../lib/providers/sale/index.js"
import { useNotify } from "../../lib/hooks/useNotify/index.js"
import { useConfig } from "../../lib/hooks/useConfig/index.js"
import { config } from "./config.js"
import {
	FixedContainer,
	PageContainer,
} from "../../components/shared/containers/index.js"
import { useNavigate, useSearchParams } from "react-router-dom"
import { useModal } from "../../components/shared/modal/index.jsx"
import { ModalOpening } from "../../components/POS/modals/opening/index.js"
import { Button } from "../../components/ui/button/index.js"
import { Utensils } from "lucide-react"

const Pos = () => {
	const navigate = useNavigate()
	const [selectedTab, setSelectedTab] = useState(config.tabs[0].name)
	const [searchParams] = useSearchParams()
	const { notifySuccess, notifyInfo } = useNotify()
	const { isActiveComponent, isActiveModule } = useConfig()
	const sale = useSale()
	const modalOpening = useModal()

	const opening = searchParams.get("opening")

	const handleDiscount = () => {
		setSelectedTab(config.tabs[2].name)
	}

	const handleBookmark = () => {
		setSelectedTab(config.tabs[3].name)
	}

	const handleClickReservations = () => {
		navigate("/calendar?new=2")
	}

	const handleClickOrder = () => {
		navigate("/calendar?new=1")
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
				category: foundProduct.product_category_id,
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
			return (
				isActiveComponent(config.name, tab.name) || isActiveModule(tab.name)
			)
		})
	}

	useEffect(() => {
		if (opening) {
			modalOpening.openModal()
		}
	}, [opening])

	useEffect(() => {
		sale.refocus()
	}, [])

	return (
		<PageContainer className="grid gap-4 md:grid-cols-12 grid-rows-1 h-full">
			<FixedContainer className="col-span-8">
				<Stack
					direction="column"
					spacing={2}
					className="w-full h-full relative"
				>
					<Stack
						direction="row"
						spacing={2}
						justifyContent="space-between"
						className="w-full"
					>
						{isActiveComponent("pos", "barcode") && (
							<BarcodeSection onSuccess={updateCart} />
						)}
						{isActiveModule("restauration") && isActiveComponent("restauration", "reservations") && (
							<Button
								variant="outline"
								size="icon"
								onClick={handleClickReservations}
							>
								<Utensils />
							</Button>
						)}
					</Stack>
					<Stack className="h-full overflow-y-hidden">
						{isActiveComponent("pos", "cart") && (
							<Cart onDiscount={handleDiscount} onBookmark={handleBookmark} />
						)}
					</Stack>
					<Stack className="sticky bottom-0 w-full">
						<TotalSection />
					</Stack>
				</Stack>
			</FixedContainer>
			<FixedContainer className="col-span-4">
				<Card className="relative h-full overflow-hidden">
					<Tabs
						value={selectedTab}
						onValueChange={setSelectedTab}
						className="flex flex-col w-full h-full justify-between"
					>
						<TabsList className="w-full">
							{displayedTabs().map((tab) => (
								<TabsTrigger key={tab.name} value={tab.name} className="w-full">
									{tab.label}
								</TabsTrigger>
							))}
						</TabsList>
						<FixedContainer className="h-full">
							{displayedTabs().map((tab) => {
								if (tab.name === selectedTab) {
									return (
										<TabsContent
											key={tab.name}
											value={tab.name}
											className="h-full m-0"
										>
											{tab.component}
										</TabsContent>
									)
								}
							})}
						</FixedContainer>
					</Tabs>
				</Card>
			</FixedContainer>
			<ModalOpening controller={modalOpening} />
		</PageContainer>
	)
}

export default Pos
