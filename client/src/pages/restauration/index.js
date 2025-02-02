import { useEffect, useState } from "react"
import { Plus, Puzzle, SlidersHorizontal } from "lucide-react"
import {
	FixedContainer,
	PageContainer,
} from "../../components/shared/containers"
import { Stack } from "@mui/material"
import { Input } from "../../components/ui/input"
import { Button } from "../../components/ui/button"
import { useConfig } from "../../lib/hooks/useConfig"
import { useModal } from "../../components/shared/modal"
import { ModalAddProduct } from "../../components/restauration/modals/addProduct"
import { ProductCard } from "../../components/POS/cardRestauration/table/details/product"
import { RestaurantTabsSelector } from "../../components/POS/cardRestauration/table/details/tabs"
import { useLocation } from "react-router-dom"
import {
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
} from "../../components/ui/sidebar"
import TestProvider, { useTest } from "../../lib/hooks/useTest"

const sections = [
	{
		name: "Products",
		icon: SlidersHorizontal,
		url: "/restauration#products",
		id: "general",
	},
	{
		name: "Menus",
		icon: Puzzle,
		url: "/restauration#menus",
		id: "modules",
	},
]

const Restauration = () => {
	const location = useLocation()

	const isActive = (url) => {
		return `${location.pathname}${location.hash}` === `${url}`
	}

	return (
		<TestProvider>
			<PageContainer className="grid gap-4 md:grid-cols-12 grid-rows-1 h-full">
				<FixedContainer className="col-span-3 rounded-xl border border-gray-100">
					<RestaurationSidebar sections={sections} />
				</FixedContainer>
				<FixedContainer className="col-span-9 flex flex-col overflow-hidden ">
					{isActive("/restauration#products") && <ProductsSection />}
					{isActive("/restauration#menus") && <MenuSection />}
				</FixedContainer>
			</PageContainer>
		</TestProvider>
	)
}

const ProductsSection = () => {
	const [filter, setFilter] = useState("all")
	const modalAddProduct = useModal()
	const { getModule } = useConfig()

	const handleChangeFilter = (value) => {
		if (value === filter) {
			setFilter("all")
		} else {
			setFilter(value)
		}
	}

	const handleAdd = () => {
		modalAddProduct.openModal()
	}

	const handleSearch = (searchString) => {
		console.log(searchString)
	}

	return (
		<Stack className="h-full" spacing={2}>
			<Stack spacing={2}>
				<Stack direction="row" justifyContent="space-between">
					<Searchbar onSearch={handleSearch} />
					<Button className="w-fit" onClick={handleAdd}>
						<Plus />
					</Button>
				</Stack>
				<RestaurantTabsSelector
					value={filter}
					tabs={getModule("restauration").settings.filters}
					onChange={handleChangeFilter}
				/>
			</Stack>
			<div className="flex-1 overflow-hidden">
				<Menu filter={filter} />
			</div>
			<ModalAddProduct controller={modalAddProduct} />
		</Stack>
	)
}

const MenuSection = () => {
	return <div>MenuSection</div>
}

export default Restauration

const Searchbar = ({ onSearch = () => null }) => {
	const [searchValue, setSearchValue] = useState("")

	return (
		<Stack direction="row" spacing={1}>
			<div className="flex w-full max-w-sm items-center space-x-2">
				<Input
					id="search-input"
					type="text"
					placeholder="Search..."
					value={searchValue}
					onChange={(e) => setSearchValue(e.target.value)}
				/>
			</div>
			<Button onClick={() => onSearch(searchValue)}>Search</Button>
			{searchValue.length > 0 && (
				<Button onClick={() => setSearchValue("")}>Reset</Button>
			)}
		</Stack>
	)
}

const Menu = ({ filter }) => {
	const { getModule } = useConfig()

	const getFilterOrder = (type) => {
		const filter = getModule("restauration").settings.filters.find(
			(f) => f.name === type
		)
		return filter?.order || Infinity // Return Infinity for unknown types to push them to the end
	}

	const orderedProducts = mockLunchProducts.sort((a, b) => {
		const orderA = getFilterOrder(a.type)
		const orderB = getFilterOrder(b.type)
		return orderA - orderB
	})

	return (
		<div className="h-full overflow-y-auto">
			{/* Your menu content here */}
			<div className="grid grid-cols-2 gap-4">
				{/* Example content to demonstrate scroll */}
				{orderedProducts
					.filter((product) => product.type === filter || filter === "all")
					.map((product, i) => (
						<ProductCard key={product.id} product={product} />
					))}
			</div>
		</div>
	)
}

const RestaurationSidebar = ({ sections }) => {
	const location = useLocation()
	const { getSaleId } = useTest()

	const isActive = (url) => {
		return `${location.pathname}${location.hash}` === `${url}`
	}

	useEffect(() => {
		console.log("here")
		getSaleId((data) => {
			// Your custom success handler
			console.log("Got sale ID:", data.nextSaleId)
			// Do something with the data
		})
	}, [])

	return (
		<Stack className="p-4">
			<SidebarMenu>
				{sections.map((section) => (
					<SidebarMenuItem className="h-10" key={section.url}>
						<SidebarMenuButton asChild isActive={isActive(section.url)}>
							<a href={section.url}>
								<section.icon />
								<span>{section.name}</span>
							</a>
						</SidebarMenuButton>
					</SidebarMenuItem>
				))}
			</SidebarMenu>
		</Stack>
	)
}

const mockLunchProducts = [
	{
		id: "1",
		name: "Product 1 hfjshflwjkshf hdsjkfhdslqfhl fhdsjqlfh",
		price: 10,
		taxe: 5.5,

		type: "starter",
		ingredients: ["Ingredient 1", "Ingredient 2"],
	},
	{
		id: "2",
		name: "Product 2",
		price: 20,
		taxe: 5.5,

		type: "main",
		ingredients: ["Ingredient 1", "Ingredient 2"],
	},
	{
		id: "3",
		name: "Product 3",
		price: 30,
		taxe: 5.5,
		type: "dessert",
		ingredients: ["Ingredient 1", "Ingredient 2"],
	},
	{
		id: "4",
		name: "Product 4",
		price: 40,
		taxe: 5.5,
		type: "soft-drink",
		ingredients: ["Ingredient 1", "Ingredient 2"],
	},
	{
		id: "5",
		name: "Product 5",
		price: 50,
		taxe: 5.5,
		type: "alcohol",
		ingredients: ["Ingredient 1", "Ingredient 2"],
	},
	{
		id: "6",
		name: "Product 6",
		price: 60,
		taxe: 5.5,
		type: "alcohol",
		ingredients: ["Ingredient 1", "Ingredient 2"],
	},
	{
		id: "7",
		name: "Product 7",
		price: 70,
		taxe: 5.5,
		type: "alcohol",
		ingredients: ["Ingredient 1", "Ingredient 2"],
	},
	{
		id: "8",
		name: "Product 8",
		price: 80,
		taxe: 5.5,
		type: "starter",
		ingredients: ["Ingredient 1", "Ingredient 2"],
	},
	{
		id: "9",
		name: "Product 9",
		price: 90,
		taxe: 5.5,
		type: "main",
		ingredients: ["Ingredient 1", "Ingredient 2"],
	},
	{
		id: "10",
		name: "Product 10",
		price: 100,
		taxe: 5.5,
		type: "dessert",
		ingredients: ["Ingredient 1", "Ingredient 2"],
	},
	{
		id: "11",
		name: "Product 11",
		price: 110,
		taxe: 5.5,
		type: "soft-drink",
		ingredients: ["Ingredient 1", "Ingredient 2"],
	},
	{
		id: "12",
		name: "Product 12",
		price: 120,
		taxe: 5.5,
		type: "alcohol",
		ingredients: ["Ingredient 1", "Ingredient 2"],
	},
	{
		id: "13",
		name: "Product 13",
		price: 130,
		taxe: 5.5,
		type: "alcohol",
		ingredients: ["Ingredient 1", "Ingredient 2"],
	},
]
