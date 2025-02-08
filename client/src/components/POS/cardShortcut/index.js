import { z } from "zod"
import { useEffect, useState } from "react"
import { useNotify } from "../../../lib/hooks/useNotify"
import { useQuery } from "../../../lib/hooks/useQuery"
import { useSale } from "../../../lib/providers/sale"
import {
	createProductCard,
	deleteCard,
	getProductCards,
	getProductCategories,
	updateCard,
} from "../../../lib/api"
import { Grid, Stack } from "@mui/material"
import { Label } from "../../ui/label"
import { Input } from "../../ui/input"
import { Button } from "../../ui/button"

import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "../../ui/select"

import { Modal, useModal } from "../../shared/modal"
import { Tabs, TabsList, TabsTrigger } from "../../ui/tabs"
import useLongPress from "../../../lib/hooks/useLongPress"
import { useConfig } from "../../../lib/hooks/useConfig"
import { Typography } from "../../ui/typography"
import { useNavigate } from "react-router-dom"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"

import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "../../ui/form"

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
	const modalAdd = useModal()

	const shortcutComponent = getComponent("pos", "shortcuts")

	const shortcutFilters = shortcutComponent.settings.shortcutTypes

	const { notifyError } = useNotify()
	const [cards, setCards] = useState([])
	const [filter, setFilter] = useState(
		shortcutComponent.settings.shortcutTypes[0].name
	)
	const [filteredCards, setFilteredCards] = useState([])

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
							{filteredCards
								.sort((a, b) => a.card_name.localeCompare(b.card_name))
								.map((card) => (
									<Grid item key={card.card_uuid} xs={6}>
										<ProductCard
											card={card}
											onSuccess={handleGetProductCards}
										/>
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
			<ModalAddCard controller={modalAdd} onSuccess={handleGetProductCards} />
		</>
	)
}

const ProductCard = ({ card, onSuccess = () => null }) => {
	const sale = useSale()
	const { notifySuccess, notifyInfo } = useNotify()
	const { action, handlers } = useLongPress()
	const modalUpdate = useModal()

	const handleUpdate = () => {
		modalUpdate.setData(card)
		modalUpdate.openModal()
	}

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
						category: card.product_category_id,
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

	useEffect(() => {
		if (action === "longpress") {
			handleUpdate()
		} else if (action === "click") {
			if (!sale.isRefund) {
				handleClick()
			}
		}
	}, [action])

	return (
		<>
			<Stack
				className={`relative long-press w-full h-20 text-white rounded-md flex items-center justify-center ${
					sale.isRefund ? "bg-slate-900/50" : "bg-slate-900"
				}`}
				{...handlers}
			>
				{card.card_name}
			</Stack>
			<ModalUpdateCard controller={modalUpdate} onSuccess={onSuccess} />
		</>
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

const ModalUpdateCard = ({ controller, onSuccess = () => null }) => {
	const card = controller.data
	const modalDelete = useModal()
	const { notifySuccess, notifyError } = useNotify()

	const queryDeleteCard = useQuery({
		queryFn: deleteCard,
		onSuccess: () => {
			notifySuccess("Card deleted successfully")
			handleSuccess()
		},
		onError: () => {
			notifyError("An error occurred while deleting the card")
		},
	})

	const handleDelete = () => {
		modalDelete.setData(card)
		modalDelete.openModal()
	}

	const handleConfirmDelete = () => {
		queryDeleteCard.send(card.card_uuid)
	}

	const handleSuccess = () => {
		controller.closeModal()
		onSuccess()
	}

	return (
		<Modal
			open={controller.open}
			title="Update Card"
			handleClose={controller.closeModal}
			className="!w-[50vw]"
			topRight={
				<Button variant="destructive" onClick={handleDelete}>
					Delete
				</Button>
			}
		>
			<FormAddCard card={card} onSuccess={handleSuccess} />
			<ModalDeleteCard
				controller={modalDelete}
				onConfirm={handleConfirmDelete}
			/>
		</Modal>
	)
}

const tabs = [
	{ name: "Alimentation", label: "Food", value: 5.5 },
	{ name: "Magazine", label: "Press", value: 2.1 },
	{ name: "Décoration/Alcool", label: "Other", value: 20 },
]

const shortcutSchema = z.object({
	name: z.string().min(1, { message: "Please enter a name." }),
	price: z
		.number({ required_error: "Please enter a price." })
		.min(0.01, { message: "Price must be greater than 0." }),
	taxe: z.number().min(1, { message: "Please enter a taxe." }),
	type: z.string().min(1, { message: "Please enter a type." }),
	category: z.number().min(1, { message: "Please enter a category." }),
})

const FormAddCard = ({ card, onSuccess = () => null }) => {
	const navigate = useNavigate()
	const { getComponent } = useConfig()
	const { notifySuccess, notifyError } = useNotify()
	const [productCategories, setProductCategories] = useState([])

	const shortcutComponent = getComponent("pos", "shortcuts")
	const shortcutFilters = shortcutComponent.settings.shortcutTypes.filter(
		(type) => type.name !== "all"
	)
	const form = useForm({
		resolver: zodResolver(shortcutSchema),
		defaultValues: {
			name: card?.card_name || "",
			price: card?.card_price || 0,
			taxe: card?.card_taxe || 5.5,
			type: card?.card_type || shortcutFilters[0]?.name || null,
			category: card?.product_category_id || "",
		},
	})

	const queryGetProductCategories = useQuery({
		queryFn: getProductCategories,
		onSuccess: (data) => {
			setProductCategories(data)
		},
		onError: () => {
			notifyError("An error occurred while fetching the product categories")
		},
	})

	const queryCreateCard = useQuery({
		queryFn: createProductCard,
		onSuccess: () => {
			notifySuccess("Card created successfully")
			form.reset({
				name: "",
				price: 0,
				taxe: 5.5,
				type: shortcutFilters[0]?.name || null,
				category: productCategories[0]?.product_category_id || "",
			})
			onSuccess()
		},
		onError: () => {
			notifyError("An error occurred while creating the card")
		},
	})

	const queryUpdateCard = useQuery({
		queryFn: updateCard,
		onSuccess: () => {
			notifySuccess("Card updated successfully")
			onSuccess()
		},
		onError: () => {
			notifyError("An error occurred while updating the card")
		},
	})

	const handleSubmit = (data) => {
		let trimmedName = data.name.trim()

		trimmedName = trimmedName.replace(/ /g, "-")

		const payload = {
			id: `c-${trimmedName}`,
			name: data.name,
			price: data.price,
			taxe: data.taxe,
			type: data.type,
			category: data.category,
		}

		if (card) {
			queryUpdateCard.send({ uuid: card.card_uuid, body: payload })
		} else {
			queryCreateCard.send(payload)
		}
	}

	const handleAddType = () => {
		navigate("/settings?shortcuts=true")
	}

	useEffect(() => {
		queryGetProductCategories.send()
	}, [])

	return (
		<Stack direction="column" spacing={2}>
			<Form {...form}>
				<form
					onSubmit={form.handleSubmit(handleSubmit)}
					className="space-y-4 w-full"
				>
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
							<FormField
								control={form.control}
								name="type"
								render={({ field }) => (
									<FormItem>
										<FormControl>
											<Tabs
												value={field.value}
												onValueChange={field.onChange}
												className="w-full h-full space-y-4"
											>
												<TabsList className="w-full p-0 bg-white">
													{shortcutFilters.map((tab) => (
														<TabsTrigger
															key={tab.name}
															value={tab.name}
															className={`w-full ${
																field.value === tab.name
																	? "!bg-slate-900 !text-white"
																	: "!bg-white"
															}`}
														>
															{tab.label}
														</TabsTrigger>
													))}
												</TabsList>
											</Tabs>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
						) : (
							<Typography variant="muted">No shortcut types found.</Typography>
						)}
					</div>
					<FormField
						control={form.control}
						name="category"
						render={({ field }) => (
							<FormItem>
								<FormLabel htmlFor="category">Category</FormLabel>
								<FormControl>
									<Select
										value={field.value}
										onValueChange={(e) => field.onChange(Number(e))}
									>
										<SelectTrigger>
											<SelectValue placeholder="Select a category" />
										</SelectTrigger>
										<SelectContent>
											{productCategories.map((category) => (
												<SelectItem
													key={category.product_category_id}
													value={category.product_category_id}
												>
													{category.product_category_name}
												</SelectItem>
											))}
										</SelectContent>
									</Select>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="name"
						render={({ field }) => (
							<FormItem>
								<FormLabel htmlFor="card-name">Name</FormLabel>
								<FormControl>
									<Input
										id="card-name"
										value={field.value}
										onChange={field.onChange}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="price"
						render={({ field }) => (
							<FormItem>
								<FormLabel htmlFor="card-price">Price</FormLabel>
								<FormControl>
									<Input
										id="card-price"
										value={field.value}
										type="number"
										onChange={(event) =>
											field.onChange(
												event.target.value === "" ? "" : +event.target.value
											)
										}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="taxe"
						render={({ field }) => (
							<FormItem>
								<FormLabel htmlFor="card-category">Taxe</FormLabel>
								<FormControl>
									<Tabs
										defaultValue={field.value}
										onValueChange={field.onChange}
										className="w-full h-full space-y-4"
									>
										<TabsList className="w-full p-0 bg-white">
											{tabs.map((tab) => (
												<TabsTrigger
													key={tab.value}
													value={tab.value}
													className={`w-full ${
														field.value === tab.value
															? "!bg-black !text-white"
															: "!bg-white"
													}`}
												>
													{tab.value}%
												</TabsTrigger>
											))}
										</TabsList>
									</Tabs>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					<Button type="submit" className="w-full">
						{card ? "Update Card" : "Create Card"}
					</Button>
				</form>
			</Form>
		</Stack>
	)
}
