import { useState } from "react"
import { useSale } from "../../../lib/providers/sale"
import { Stack } from "@mui/material"
import { Button } from "../../ui/button"
import { Modal, useModal } from "../../shared/modal"
import { useConfig } from "../../../lib/hooks/useConfig"
import { Typography } from "../../ui/typography"

import { Separator } from "../../ui/separator"
import { NoRestaurantTable } from "../../../pages/Pos/config"
import { Minus, Plus, UserRound } from "lucide-react"
import { ModalAddTable } from "./modals/add"
import { TableLine } from "./table/line"
import { ModalTableDetails } from "./modals/details"

const mockCards = [
	{ card_id: "1", card_name: "Card 1", card_price: 10, card_taxe: 5.5 },
	{ card_id: "2", card_name: "Card 2", card_price: 20, card_taxe: 2.1 },
	{ card_id: "3", card_name: "Card 3", card_price: 30, card_taxe: 20 },
	{ card_id: "4", card_name: "Card 4", card_price: 40, card_taxe: 5.5 },
	{ card_id: "5", card_name: "Card 5", card_price: 50, card_taxe: 2.1 },
	{ card_id: "6", card_name: "Card 6", card_price: 60, card_taxe: 20 },
	{ card_id: "7", card_name: "Card 7", card_price: 70, card_taxe: 5.5 },
	{ card_id: "8", card_name: "Card 8", card_price: 80, card_taxe: 2.1 },
	{ card_id: "9", card_name: "Card 9", card_price: 90, card_taxe: 20 },
	{ card_id: "10", card_name: "Card 10", card_price: 100, card_taxe: 5.5 },
	{ card_id: "11", card_name: "Card 11", card_price: 110, card_taxe: 2.1 },
	{ card_id: "12", card_name: "Card 12", card_price: 120, card_taxe: 20 },
	{ card_id: "13", card_name: "Card 13", card_price: 130, card_taxe: 5.5 },
	{ card_id: "14", card_name: "Card 14", card_price: 140, card_taxe: 2.1 },
	{ card_id: "15", card_name: "Card 15", card_price: 150, card_taxe: 20 },
	{ card_id: "16", card_name: "Card 16", card_price: 160, card_taxe: 5.5 },
	{ card_id: "17", card_name: "Card 17", card_price: 170, card_taxe: 2.1 },
	{ card_id: "18", card_name: "Card 18", card_price: 180, card_taxe: 20 },
	{ card_id: "19", card_name: "Card 19", card_price: 190, card_taxe: 5.5 },
	{ card_id: "20", card_name: "Card 20", card_price: 200, card_taxe: 2.1 },
]

export const CardRestauration = () => {
	const { tables } = useSale()
	const modalAddTable = useModal()
	const modalTableDetails = useModal()

	const handleAddTable = () => {
		modalAddTable.openModal()
	}

	const handleClickTable = (table, uuid) => {
		modalTableDetails.setData({ table, uuid })
		modalTableDetails.openModal()
	}

	return (
		<>
			<div className="flex flex-col h-full p-4 space-y-2 justify-between overflow-hidden">
				<Stack className="overflow-hidden h-full space-y-2">
					{Object.keys(tables).length === 0 ? (
						<div className="flex flex-col items-center justify-center space-y-8 h-full">
							<NoRestaurantTable className="w-10 h-10 text-gray-200" />
							<p className="text-md text-gray-500">No tables</p>
						</div>
					) : (
						<Stack className="space-y-4 h-full overflow-y-auto">
							{Object.keys(tables).map((uuid, i) => (
								<Stack key={uuid} className="space-y-4">
									<TableLine
										uuid={uuid}
										table={tables[uuid]}
										onClick={() => handleClickTable(tables[uuid], uuid)}
									/>
									{i !== Object.keys(tables).length - 1 && <Separator />}
								</Stack>
							))}
						</Stack>
					)}
				</Stack>
				<Stack className="w-full pt-2">
					<Button className="w-full" onClick={handleAddTable}>
						Add Table
					</Button>
				</Stack>
			</div>
			<ModalAddTable controller={modalAddTable} />
			<ModalTableDetails controller={modalTableDetails} />
		</>
	)
}

const mockProducts = [
	{
		id: "1",
		name: "Product 1",
		price: 10,
		type: "starter",
		ingredients: ["Ingredient 1", "Ingredient 2"],
		quantity: 1,
	},
	{
		id: "2",
		name: "Product 2",
		price: 20,
		type: "main",
		ingredients: ["Ingredient 1", "Ingredient 2"],
		quantity: 1,
	},
	{
		id: "3",
		name: "Product 3",
		price: 30,
		type: "dessert",
		ingredients: ["Ingredient 1", "Ingredient 2"],
		quantity: 1,
	},
	{
		id: "4",
		name: "Product 4",
		price: 40,
		type: "soft-drink",
		ingredients: ["Ingredient 1", "Ingredient 2"],
		quantity: 2,
	},
	{
		id: "5",
		name: "Product 5",
		price: 50,
		type: "alcohol",
		ingredients: ["Ingredient 1", "Ingredient 2"],
		quantity: 1,
	},
	{
		id: "6",
		name: "Product 6",
		price: 60,
		type: "starter",
		ingredients: ["Ingredient 1", "Ingredient 2"],
		quantity: 1,
	},
	{
		id: "7",
		name: "Product 7",
		price: 70,
		type: "main",
		ingredients: ["Ingredient 1", "Ingredient 2"],
		quantity: 1,
	},
	{
		id: "8",
		name: "Product 8",
		price: 80,
		type: "dessert",
		ingredients: ["Ingredient 1", "Ingredient 2"],
		quantity: 1,
	},
	{
		id: "9",
		name: "Product 9",
		price: 90,
		type: "soft-drink",
		ingredients: ["Ingredient 1", "Ingredient 2"],
		quantity: 1,
	},
	{
		id: "10",
		name: "Product 10",
		price: 100,
		type: "alcohol",
		ingredients: [
			"Ingredient 1",
			"Ingredient 2",
			"Ingredient 3",
			"Ingredient 4",
			"Ingredient 5",
		],
		quantity: 3,
	},
]
