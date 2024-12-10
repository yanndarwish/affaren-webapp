import { useState } from "react"
import { Column, FullCenter } from "../../../assets/common/common.styles"
import {
	usePostProductMutation,
	useUpdateFullProductMutation,
} from "../../../redux/services/productsApi"
import Input from "../../common/Input/Input.component"
import Button from "../../common/Button/Button.component"
import { InputLabel, MenuItem, Select } from "@mui/material"

export const FormProduct = ({ data, onSubmit = () => null }) => {
	const [name, setName] = useState(data?.product_name || "")
	const [price, setPrice] = useState(data?.product_price || "")
	const [taxe, setTaxe] = useState(data?.product_taxe || 5.5)
	const [quantity, setQuantity] = useState(data?.product_quantity || 0)
	const [barcode, setBarcode] = useState(data?.product_barcode || "")
	const [nameError, setNameError] = useState(false)
	const [priceError, setPriceError] = useState(false)
	const [qtyError, setQtyError] = useState(false)
	const [barcodeError, setBarcodeError] = useState(false)

	const [postProduct, resCreate] = usePostProductMutation()
	const [updateProduct, resUpdate] = useUpdateFullProductMutation()

	const checkForm = () => {
		!name ? setNameError(true) : setNameError(false)
		!price || isNaN(price) ? setPriceError(true) : setPriceError(false)
		isNaN(quantity) ? setQtyError(true) : setQtyError(false)
		!barcode || isNaN(barcode) ? setBarcodeError(true) : setBarcodeError(false)
	}

	const isFormValid = () => {
		return (
			name &&
			price &&
			!isNaN(price) &&
			!isNaN(quantity) &&
			barcode &&
			!isNaN(barcode)
		)
	}

	const handleCreate = () => {
		postProduct({ name, price, quantity, taxe, barcode })
	}

	const handleUpdate = () => {
		updateProduct({
			payload: { name, price, quantity, taxe, barcode },
			id: data.product_id,
		})
	}

	const handleSubmit = () => {
		checkForm()

		console.log(isFormValid())

		if (isFormValid()) {
			if (data) {
				handleUpdate()
			} else {
				handleCreate()
			}

			onSubmit()
		}
	}

	return (
		<Column>
			<Input
				value={name}
				label="Name"
				fullWidth
				onChange={(e) => setName(e)}
				error={nameError}
				helperText={nameError && "Required"}
			/>
			<Input
				value={price}
				label="Price"
				fullWidth
				onChange={(e) => setPrice(e)}
				error={priceError}
				helperText={priceError && "Required"}
			/>
			<InputLabel id="demo-simple-select-label">Category</InputLabel>
			<Select
				labelId="demo-simple-select-label"
				id="demo-simple-select"
				value={taxe}
				onChange={(e) => setTaxe(e.target.value)}
				fullWidth
				required
			>
				<MenuItem value={5.5}>Alimentation</MenuItem>
				<MenuItem value={2.1}>Magazine</MenuItem>
				<MenuItem value={20}>Décoration/Alcool</MenuItem>
			</Select>
			<Input
				value={quantity}
				label="Quantity in Stock"
				type="number"
				fullWidth
				onChange={(e) => setQuantity(e)}
				error={qtyError}
				helperText={qtyError && "Required"}
			/>
			<Input
				value={barcode}
				label="Barcode"
				fullWidth
				onChange={(e) => setBarcode(e)}
				error={barcodeError}
				helperText={barcodeError && "Required"}
			/>
			<FullCenter>
				<Button
					title={data ? "Update Product" : "Create Product"}
					onClick={handleSubmit}
				/>
			</FullCenter>
		</Column>
	)
}
