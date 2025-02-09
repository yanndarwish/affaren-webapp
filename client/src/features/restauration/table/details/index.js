import { useState } from "react"

import { useSale } from "../../../../lib/providers/sale"
import { useConfig } from "../../../../lib/hooks/useConfig"

import { Stack } from "@mui/material"
import { ListProducts } from "./list"
import { PeopleSection } from "./people"
import { SelectedProducts } from "./selected"
import { Button } from "../../../../components/ui/button"
import { RestaurantTabsSelector } from "./tabs"
import { Separator } from "../../../../components/ui/separator"
import { useModal } from "../../../../components/shared/modal"
import { ModalDeleteTable } from "../../modals/delete"
import { useNotify } from "../../../../lib/hooks/useNotify"

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

export const TableDetails = ({ table, uuid, onSuccess = () => null }) => {
	const [filter, setFilter] = useState("all")

	const { notifySuccess } = useNotify()
	const { removeTable, applyTable } = useSale()
	const { getModule } = useConfig()
	const modalDelete = useModal()

	const handleChangeTab = (value) => {
		if (value === filter) {
			setFilter("all")
		} else {
			setFilter(value)
		}
	}

	const handleDeleteTable = () => {
		modalDelete.setData(table)
		modalDelete.openModal()
	}

	const handleConfirmDeleteTable = () => {
		removeTable(uuid)
		modalDelete.closeModal()
		notifySuccess("Table removed successfully")
		onSuccess()
	}

	const handleApplyTable = () => {
		applyTable(uuid)
		notifySuccess("Table applied")
		onSuccess()
	}

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
		<Stack
			direction="column"
			spacing={2}
			className="h-full overflow-hidden"
			justifyContent="space-between"
		>
			<Stack direction="column" spacing={2} className="h-full overflow-y-auto">
				<RestaurantTabsSelector
					value={filter}
					tabs={getModule("restauration").settings.filters}
					onChange={handleChangeTab}
				/>
				<Stack
					direction="row"
					spacing={2}
					className="w-full h-full overflow-y-auto"
				>
					<ListProducts
						products={orderedProducts}
						filter={filter}
						uuid={uuid}
					/>
					<SelectedProducts products={table.products} uuid={uuid} />
				</Stack>
			</Stack>
			<Separator />

			<Stack direction="row" spacing={2} justifyContent="space-between">
				<PeopleSection people={table.people} uuid={uuid} />
				<Stack direction="row" spacing={1}>
					<Button variant="destructive" onClick={handleDeleteTable}>
						Delete Table
					</Button>
					<Button onClick={handleApplyTable}>Apply Table</Button>
				</Stack>
			</Stack>
			<ModalDeleteTable
				controller={modalDelete}
				onConfirm={handleConfirmDeleteTable}
			/>
		</Stack>
	)
}
