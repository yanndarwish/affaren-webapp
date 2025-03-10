import { useEffect, useState } from "react"
import { useSearchParams } from "react-router-dom"

import { Input } from "../../ui/input"
import { Label } from "../../ui/label"
import { Button } from "../../ui/button"
import { Tabs, TabsList, TabsTrigger } from "../../ui/tabs"

import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "../../ui/select"

import {
	createProduct,
	getProductCategories,
	putProduct,
} from "../../../lib/api"
import { useQuery } from "../../../lib/hooks/useQuery"
import { useNotify } from "../../../lib/hooks/useNotify"

const tabs = [
	{ name: "Alimentation", label: "Food", value: 5.5 },
	{ name: "Magazine", label: "Press", value: 2.1 },
	{ name: "Décoration/Alcool", label: "Other", value: 20 },
]

export const FormProduct = ({ data, onSubmit = () => null }) => {
	const { notifySuccess, notifyError } = useNotify()
	let [searchParams] = useSearchParams()

	const barcodeParam = searchParams.get("new")

	const [name, setName] = useState(data?.product_name || "")
	const [price, setPrice] = useState(data?.product_price || "")
	const [taxe, setTaxe] = useState(data?.product_taxe || 5.5)
	const [quantity, setQuantity] = useState(data?.product_quantity || 0)
	const [barcode, setBarcode] = useState(data?.product_barcode || "")
	const [category, setCategory] = useState(data?.product_category_id || "")

	const [productCategories, setProductCategories] = useState([])

	const queryGetProductCategories = useQuery({
		queryFn: getProductCategories,
		onSuccess: (data) => {
			setProductCategories(data)
		},
		onError: () => {
			notifyError("Error while fetching product categories")
		},
	})

	const queryCreateProduct = useQuery({
		queryFn: createProduct,
		onSuccess: () => {
			notifySuccess("Product created successfully")
			onSubmit()
		},
		onError: () => {
			notifyError("Error while creating product")
		},
	})

	const queryUpdateProduct = useQuery({
		queryFn: putProduct,
		onSuccess: () => {
			notifySuccess("Product updated successfully")
			onSubmit()
		},
		onError: () => {
			notifyError("Error while updating product")
		},
	})

	const isFormValid = () => {
		const numPrice = parseFloat(price)
		const numQuantity = parseInt(quantity)
		const numBarcode = String(barcode).trim()

		return (
			name &&
			numPrice > 0 &&
			!isNaN(numPrice) &&
			!isNaN(numQuantity) &&
			numBarcode.length > 0 &&
			category
		)
	}

	const handleCreate = () => {
		queryCreateProduct.send({ name, price, quantity, taxe, barcode, category })
	}

	const handleUpdate = () => {
		queryUpdateProduct.send({
			body: { name, price, quantity, taxe, barcode, category },
			id: data.product_id,
		})
	}

	const handleBarcodeChange = (e) => {
		const value = e.target.value
		const trimmedValue = value.endsWith("/n") ? value.slice(0, -2) : value
		setBarcode(trimmedValue)
	}

	const handleSubmit = () => {
		if (isFormValid()) {
			if (data) {
				handleUpdate()
			} else {
				handleCreate()
			}
		}
	}

	useEffect(() => {
		if (barcodeParam) {
			setBarcode(barcodeParam)
		}
	}, [barcodeParam])

	useEffect(() => {
		queryGetProductCategories.send()
	}, [])

	return (
		<div className="flex flex-col gap-6">
			<div className="grid gap-2">
				<Label htmlFor="taxe">Taxe</Label>
				<Tabs
					id="taxe"
					value={taxe}
					onValueChange={setTaxe}
					className="w-full space-y-4"
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
								{tab.value}%
							</TabsTrigger>
						))}
					</TabsList>
				</Tabs>
			</div>
			<div className="grid gap-2">
				<Label htmlFor="category">Category</Label>
				<Select value={category} onValueChange={setCategory}>
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
			</div>
			<div className="grid gap-2">
				<Label htmlFor="name">Name</Label>
				<Input
					id="name"
					type="text"
					value={name}
					onChange={(e) => setName(e.target.value)}
					placeholder="Product Name"
					required
					autoFocus
				/>
			</div>
			<div className="grid gap-2">
				<Label htmlFor="price">Price</Label>
				<Input
					id="price"
					type="number"
					value={price}
					onChange={(e) => setPrice(e.target.value)}
					placeholder="Product Price"
					required
					step="0.01"
					min="0"
					inputMode="decimal"
				/>
			</div>
			<div className="grid gap-2">
				<Label htmlFor="quantity">Quantity in Stock</Label>
				<Input
					id="quantity"
					type="number"
					value={quantity}
					onChange={(e) => setQuantity(e.target.value)}
					placeholder="Product Quantity"
					required
					step="1"
					min="0"
					inputMode="numeric"
				/>
			</div>
			<div className="grid gap-2">
				<Label htmlFor="barcode">Barcode</Label>
				<Input
					id="barcode"
					type="text"
					value={barcode}
					onChange={handleBarcodeChange}
					placeholder="Product Barcode"
					required
					inputMode="numeric"
				/>
			</div>
			<Button type="submit" onClick={handleSubmit}>
				{data ? "Update Product" : "Create Product"}
			</Button>
		</div>
	)
}
