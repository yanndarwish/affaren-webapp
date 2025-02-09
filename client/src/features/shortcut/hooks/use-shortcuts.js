import { z } from "zod"
import { useForm } from "react-hook-form"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { zodResolver } from "@hookform/resolvers/zod"

import {
	getShortcuts,
	createShortcut,
	updateShortcut,
	getProductCategories,
	deleteShortcut,
} from "../../../lib/api"
import { useSale } from "../../../lib/providers/sale"
import { useQuery } from "../../../lib/hooks/useQuery"
import { useNotify } from "../../../lib/hooks/useNotify"
import { useConfig } from "../../../lib/hooks/useConfig"
import { useModal } from "../../../components/shared/modal"

const shortcutSchema = z.object({
	name: z.string().min(1, { message: "Please enter a name." }),
	price: z
		.number({ required_error: "Please enter a price." })
		.min(0.01, { message: "Price must be greater than 0." }),
	taxe: z.number().min(1, { message: "Please enter a taxe." }),
	type: z.string().min(1, { message: "Please enter a type." }),
	category: z.number().min(1, { message: "Please enter a category." }),
})

export const useShortcuts = ({ shortcut, onSuccess = () => null }) => {
	const { notifySuccess, notifyError, notifyInfo } = useNotify()
	const { getComponent } = useConfig()
	const navigate = useNavigate()
	const modalUpdate = useModal()
	const modalDelete = useModal()
	const modalAdd = useModal()
	const sale = useSale()

	const [shortcuts, setShortcuts] = useState([])
	const [filteredShortcuts, setFilteredShortcuts] = useState([])
	const [productCategories, setProductCategories] = useState([])

	const shortcutComponent = getComponent("pos", "shortcuts")
	const shortcutFilters = shortcutComponent.settings.shortcutTypes
	const filteredShortcutFilters = shortcutFilters.filter(
		(type) => type.name !== "all"
	)

	const [filter, setFilter] = useState(shortcutFilters[0].name)

	const form = useForm({
		resolver: zodResolver(shortcutSchema),
		defaultValues: {
			name: shortcut?.card_name || "",
			price: shortcut?.card_price || 0,
			taxe: shortcut?.card_taxe || 5.5,
			type: shortcut?.card_type || shortcutFilters[0]?.name || null,
			category: shortcut?.product_category_id || "",
		},
	})

	const queryGetShortcuts = useQuery({
		queryFn: getShortcuts,
		onSuccess: (data) => {
			setShortcuts(data)
			setFilteredShortcuts(
				data.filter((shortcut) =>
					filter === "all" ? true : shortcut.card_type === filter
				)
			)
		},
		onError: () => {
			notifyError("An error occurred while fetching the product cards")
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

	const queryCreateShortcut = useQuery({
		queryFn: createShortcut,
		onSuccess: () => {
			notifySuccess("Shortcut created successfully")
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
			notifyError("An error occurred while creating the shortcut")
		},
	})

	const queryUpdateShortcut = useQuery({
		queryFn: updateShortcut,
		onSuccess: () => {
			notifySuccess("Shortcut updated successfully")
			onSuccess()
		},
		onError: () => {
			notifyError("An error occurred while updating the shortcut")
		},
	})

	const queryDeleteShortcut = useQuery({
		queryFn: deleteShortcut,
		onSuccess: () => {
			notifySuccess("Shortcut deleted successfully")
			modalDelete.closeModal()
			modalUpdate.closeModal()
			onSuccess()
		},
		onError: () => {
			notifyError("An error occurred while deleting the shortcut")
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

		if (shortcut) {
			queryUpdateShortcut.send({ uuid: shortcut.card_uuid, body: payload })
		} else {
			queryCreateShortcut.send(payload)
		}
	}

	const handleAddType = () => {
		navigate("/settings?shortcuts=true")
	}

	const handleChangeTab = (name) => {
		setFilter(name)
		setFilteredShortcuts(
			shortcuts.filter((shortcut) =>
				name === "all" ? true : shortcut.card_type === name
			)
		)
	}

	const handleGetShortcuts = () => {
		queryGetShortcuts.send()
	}

	const handleConfirmDelete = (shortcut) => {
		queryDeleteShortcut.send(shortcut.card_uuid)
	}

	const handleAddToSale = (shortcut) => {
		const found = sale.products.find(
			(product) => product.id === shortcut.card_id
		)
		if (!found) {
			sale.updateSale({
				products: [
					...sale.products,
					{
						id: shortcut.card_id,
						name: shortcut.card_name,
						price: shortcut.card_price,
						taxe: shortcut.card_taxe,
						quantity: 1,
						category: shortcut.product_category_id,
					},
				],
			})
			notifySuccess(`Product ${shortcut.card_name} added to the cart`)
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
			notifyInfo(`Product ${shortcut.card_name} quantity updated`)
		}
		sale.refocus()
	}

	useEffect(() => {
		queryGetProductCategories.send()
		handleGetShortcuts()
	}, [])

	return {
		form,
		productCategories,
		shortcutFilters,
		filteredShortcutFilters,
		handleSubmit,
		handleAddType,
		shortcuts,
		filteredShortcuts,
		handleGetShortcuts,
		modalAdd,
		modalUpdate,
		modalDelete,
		filter,
		handleChangeTab,
		handleAddToSale,
		handleConfirmDelete,
	}
}
