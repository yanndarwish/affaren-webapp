import { useEffect, useState } from "react"
import { useNotify } from "../../../lib/hooks/useNotify"
import { useQuery } from "../../../lib/hooks/useQuery"
import { useSale } from "../../../lib/providers/sale"
import {
	createProductCard,
	deleteCard,
	getProductCards,
} from "../../../lib/api"
import { Grid, Stack } from "@mui/material"
import { Label } from "../../ui/label"
import { Input } from "../../ui/input"
import { Button } from "../../ui/button"
import { Modal, useModal } from "../../shared/modal"
import { Tabs, TabsList, TabsTrigger } from "../../ui/tabs"
import useLongPress from "../../../lib/hooks/useLongPress"
import { useConfig } from "../../../lib/hooks/useConfig"
import { Typography } from "../../ui/typography"
import { useNavigate } from "react-router-dom"

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

export const CardShortcut = () => {
	const { getComponent } = useConfig()
	const modalDelete = useModal()
	const modalAdd = useModal()

	const shortcutComponent = getComponent("pos", "shortcuts")

	const shortcutFilters = shortcutComponent.settings.shortcutTypes

	const { notifyError, notifySuccess } = useNotify()
	const [cards, setCards] = useState([])
	const [filter, setFilter] = useState(
		shortcutComponent.settings.shortcutTypes[0].name
	)
	const [filteredCards, setFilteredCards] = useState([])

	const queryDeleteCard = useQuery({
		queryFn: deleteCard,
		onSuccess: () => {
			modalDelete.closeModal()
			notifySuccess("Card deleted successfully")
			queryGetProductCards.send()
		},
		onError: () => {
			notifyError("An error occurred while deleting the card")
		},
	})

	const queryGetProductCards = useQuery({
		queryFn: getProductCards,
		onSuccess: (data) => {
			setCards(data)
			setFilteredCards(
				data.filter((card) =>
					filter === "all" ? true : card.card_type === filter
				)
			)
		},
		onError: () => {
			notifyError("An error occurred while fetching the product cards")
		},
	})

	const handleGetProductCards = () => {
		queryGetProductCards.send()
	}

	const handleAddCard = () => {
		modalAdd.openModal()
	}

	const handleDelete = (card) => {
		modalDelete.setData(card)
		modalDelete.openModal()
	}

	const handleConfirmDelete = (card) => {
		queryDeleteCard.send(card.card_uuid)
	}

	const handleChangeTab = (name) => {
		setFilter(name)
		setFilteredCards(
			cards.filter((card) => (name === "all" ? true : card.card_type === name))
		)
	}

	useEffect(() => {
		handleGetProductCards()
	}, [])

	return (
		<>
			<div className="flex flex-col h-full p-4 space-y-2 justify-between overflow-hidden">
				<Stack className="overflow-hidden h-full space-y-2">
					<Tabs
						defaultValue={filter}
						onValueChange={handleChangeTab}
						className="w-full space-y-4"
					>
						<TabsList className="w-full p-0 bg-white">
							{shortcutFilters.map((tab) => (
								<TabsTrigger
									key={tab.name}
									value={tab.name}
									className={`w-full ${
										filter === tab.name
											? "!bg-slate-900 !text-white"
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
							{filteredCards.map((card) => (
								<Grid item key={card.card_id} xs={6}>
									<ProductCard card={card} onDelete={handleDelete} />
								</Grid>
							))}
						</Grid>
					</Stack>
				</Stack>

				<Stack className="w-full pt-2">
					<Button className="w-full" onClick={handleAddCard}>
						Add Shortcut
					</Button>
				</Stack>
			</div>
			<ModalDeleteCard
				controller={modalDelete}
				onConfirm={handleConfirmDelete}
			/>
			<ModalAddCard controller={modalAdd} onSuccess={handleGetProductCards} />
		</>
	)
}

const ProductCard = ({ card, onDelete = () => null }) => {
	const sale = useSale()
	const { notifySuccess, notifyInfo } = useNotify()
	const { action, handlers } = useLongPress()

	const handleClick = () => {
		const found = sale.products.find((product) => product.id === card.card_id)
		if (!found) {
			sale.updateSale({
				products: [
					...sale.products,
					{
						id: card.card_id,
						name: card.card_name,
						price: card.card_price,
						taxe: card.card_taxe,
						quantity: 1,
					},
				],
			})
			notifySuccess(`Product ${card.card_name} added to the cart`)
		} else {
			const updated = sale.products.map((product) => {
				if (product.id === found.id) {
					return {
						...product,
						quantity: product.quantity + 1,
					}
				} else {
					return product
				}
			})

			sale.updateSale({ products: updated })
			notifyInfo(`Product ${card.card_name} quantity updated`)
		}
		sale.refocus()
	}

	const handleDelete = () => {
		onDelete(card)
	}

	useEffect(() => {
		if (action === "longpress") {
			handleDelete()
		} else if (action === "click") {
			if (!sale.isRefund) {
				handleClick()
			}
		}
	}, [action])

	return (
		<Stack
			className={`relative long-press w-full h-20 text-white rounded-md flex items-center justify-center ${
				sale.isRefund ? "bg-slate-900/50" : "bg-slate-900"
			}`}
			{...handlers}
		>
			{card.card_name}
		</Stack>
	)
}

const ModalDeleteCard = ({ controller, onConfirm = () => null }) => {
	const card = controller.data

	return (
		<Modal
			open={controller.open}
			title={`Delete Card ${card.card_name}`}
			handleClose={controller.closeModal}
			className="!w-[50vw]"
		>
			<Stack direction="column" spacing={4}>
				<p className="text-center text-lg font-medium text-gray-900">
					Are you sure you want to delete this card?
				</p>
				<Stack direction="row" spacing={2}>
					<Button
						onClick={controller.closeModal}
						variant="outline"
						className="w-full"
					>
						Cancel
					</Button>
					<Button
						onClick={() => onConfirm(card)}
						variant="destructive"
						className="w-full"
					>
						Delete
					</Button>
				</Stack>
			</Stack>
		</Modal>
	)
}

const ModalAddCard = ({ controller, onSuccess = () => null }) => {
	const handleSuccess = () => {
		controller.closeModal()
		onSuccess()
	}

	return (
		<Modal
			open={controller.open}
			title="Add Shortcut"
			handleClose={controller.closeModal}
			className="!w-[50vw]"
		>
			<FormAddCard onSuccess={handleSuccess} />
		</Modal>
	)
}

const tabs = [
	{ name: "Alimentation", label: "Food", value: 5.5 },
	{ name: "Magazine", label: "Press", value: 2.1 },
	{ name: "Décoration/Alcool", label: "Other", value: 20 },
]

const FormAddCard = ({ onSuccess = () => null }) => {
	const { getComponent } = useConfig()
	const navigate = useNavigate()
	const shortcutComponent = getComponent("pos", "shortcuts")
	const shortcutFilters = shortcutComponent.settings.shortcutTypes.filter(
		(type) => type.name !== "all"
	)

	const { notifySuccess, notifyError } = useNotify()
	const [name, setName] = useState("")
	const [price, setPrice] = useState("")
	const [taxe, setTaxe] = useState(5.5)
	const [type, setType] = useState(shortcutFilters[0]?.name || null)

	const queryCreateCard = useQuery({
		queryFn: createProductCard,
		onSuccess: () => {
			notifySuccess("Card created successfully")
			handleReset()
			onSuccess()
		},
		onError: () => {
			notifyError("An error occurred while creating the card")
		},
	})

	const handleSubmit = () => {
		let trimmedName = name.trim()

		trimmedName = trimmedName.replace(/ /g, "-")

		const payload = {
			id: `c-${trimmedName}`,
			name: name,
			price: price,
			taxe: taxe,
			type: type,
		}

		queryCreateCard.send(payload)
	}

	const handleReset = () => {
		setName("")
		setPrice("")
		setTaxe(5.5)
		setType("basic")
	}

	const handleAddType = () => {
		navigate("/settings?shortcuts=true")
	}

	return (
		<Stack direction="column" spacing={2}>
			<div className="space-y-1">
				<Stack
					direction="row"
					spacing={2}
					justifyContent="space-between"
					alignItems="center"
				>
					<Label htmlFor="card-type">Type</Label>
					<Button variant="outline" onClick={handleAddType}>
						Add a shortcut type
					</Button>
				</Stack>

				{shortcutFilters.length > 0 ? (
					<Tabs
						defaultValue={type}
						onValueChange={setType}
						className="w-full h-full space-y-4"
					>
						<TabsList className="w-full p-0 bg-white">
							{shortcutFilters.map((tab) => (
								<TabsTrigger
									key={tab.name}
									value={tab.name}
									className={`w-full ${
										type === tab.name
											? "!bg-slate-900 !text-white"
											: "!bg-white"
									}`}
								>
									{tab.label}
								</TabsTrigger>
							))}
						</TabsList>
					</Tabs>
				) : (
					<Typography variant="muted">No shortcut types found.</Typography>
				)}
			</div>
			<div className="space-y-1">
				<Label htmlFor="card-name">Name</Label>

				<Input
					id="card-name"
					value={name}
					onChange={(e) => setName(e.target.value)}
				/>
			</div>
			<div className="space-y-1">
				<Label htmlFor="card-price">Price</Label>

				<Input
					id="card-price"
					value={price}
					onChange={(e) => setPrice(e.target.value)}
				/>
			</div>
			<div className="space-y-1">
				<Label htmlFor="card-category">Category</Label>
				<Tabs
					defaultValue={taxe}
					onValueChange={setTaxe}
					className="w-full h-full space-y-4"
				>
					<TabsList className="w-full p-0 bg-white">
						{tabs.map((tab) => (
							<TabsTrigger
								key={tab.value}
								value={tab.value}
								className={`w-full ${
									taxe === tab.value ? "!bg-black !text-white" : "!bg-white"
								}`}
							>
								{tab.label}
							</TabsTrigger>
						))}
					</TabsList>
				</Tabs>
			</div>
			<Button onClick={handleSubmit}>Create Card</Button>
		</Stack>
	)
}
