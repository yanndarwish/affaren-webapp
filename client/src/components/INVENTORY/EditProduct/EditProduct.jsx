import { InputAdornment, InputLabel, MenuItem, Select } from "@mui/material"
import { useEffect, useState } from "react"
import {
	ArtTitle,
	Column,
	FullCenter,
	Gap,
} from "../../../assets/common/common.styles"
import Button from "../../common/Button/Button.component"
import Input from "../../common/Input/Input.component"
import {
	useUpdateFullProductMutation,
	useDeleteProductMutation,
} from "../../../redux/services/productsApi"
import { Modal } from "modal-rjs"
import InfoMessage from "../../common/InfoMessage/InfoMessage"

const EditProduct = ({
	product,
	focusOnBarcode,
	resetBarcode,
	sent,
	setSent,
}) => {
	const [name, setName] = useState("")
	const [price, setPrice] = useState("")
	const [taxe, setTaxe] = useState(product?.product_taxe)
	const [barcode, setBarcode] = useState("")
	const [quantity, setQuantity] = useState("")
	const [received, setReceived] = useState("")
	const [alert, setAlert] = useState("")
	const [updateProduct, res] = useUpdateFullProductMutation()
	const [deleteProduct, response] = useDeleteProductMutation()
	const [isOpen, setIsOpen] = useState(false)

	const handleEdit = () => {
		// create new product object
		let newProduct = {
			name: name ? name : product.product_name,
			price: price ? price : product.product_price,
			quantity: quantity
				? parseInt(quantity) + (received === "" ? 0 : parseInt(received))
				: product.product_quantity + (received === "" ? 0 : parseInt(received)),
			taxe: taxe ? parseFloat(taxe) : product.product_taxe,
			barcode: barcode ? barcode : product.product_barcode,
			alert: alert ? parseInt(alert) : product.product_alert,
		}

		updateProduct({ payload: newProduct, id: product.product_id })
		// set sent to get confirmation message
		setSent(true)
		// reset and refocus
		focusOnBarcode()
		resetBarcode()
		document.getElementById("barcode-input").focus()
	}

	const handleDelete = () => {
		setIsOpen(false)
		deleteProduct({ id: product.product_id })
		// set sent to get confirmation message
		setSent(true)
		// reset and refocus
		focusOnBarcode()
		resetBarcode()
		document.getElementById("barcode-input").focus()
	}

	const handleModal = () => {
		setIsOpen(!isOpen)
	}

	const DeletionBody = () => {
		return (
			<Column>
				<h2>Are you sure you want to delete the product ?</h2>
				<FullCenter>
					<Button title="Cancel" color="error" onClick={handleModal} />
					<Button title="Delete" color="success" onClick={handleDelete} />
				</FullCenter>
			</Column>
		)
	}

	useEffect(() => {
		setTaxe(product.product_taxe)
	}, [product])

	return product ? (
		sent && res.isSuccess ? (
			<InfoMessage state="success" text="Product edited successfully" />
		) : sent && response.isSuccess ? (
			<InfoMessage state="success" text="Product deleted successfully" />
		) : sent && res.isError ? (
			<InfoMessage state="error" text="Failed to edit the product" />
		) : sent && response.isError ? (
			<InfoMessage state="error" text="Failed to delete the product" />
		) : (
			<Column>
				<ArtTitle>Edit a Product</ArtTitle>
				<Input
					label="Name"
					fullWidth
					inputAdornment={{
						startAdornment: (
							<InputAdornment data-id="nb-qty" position="start">
								<p data-id="nb-qty">{product.product_name}</p>
							</InputAdornment>
						),
					}}
					onChange={(e) => setName(e)}
				/>
				<Input
					label="Price"
					fullWidth
					inputAdornment={{
						startAdornment: (
							<InputAdornment data-id="nb-qty" position="start">
								<p data-id="nb-qty">{product.product_price}</p>
							</InputAdornment>
						),
					}}
					onChange={(e) => setPrice(e)}
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
				<Gap>
					<Input
						label="Quantity in Stock"
						type="number"
						fullWidth
						inputAdornment={{
							startAdornment: (
								<InputAdornment data-id="nb-qty" position="start">
									<p data-id="nb-qty">{product.product_quantity}</p>
								</InputAdornment>
							),
						}}
						onChange={(e) => setQuantity(e)}
					/>
					<Input
						value={received}
						label="Quantity Received"
						type="number"
						fullWidth
						onChange={(e) => setReceived(e)}
					/>
				</Gap>
				<Input
					label="Barcode"
					fullWidth
					inputAdornment={{
						startAdornment: (
							<InputAdornment data-id="nb-qty" position="start">
								<p data-id="nb-qty">{product.product_barcode}</p>
							</InputAdornment>
						),
					}}
					onChange={(e) => setBarcode(e)}
				/>
				<Input
					label="Alert"
					type="number"
					fullWidth
					inputAdornment={{
						startAdornment: (
							<InputAdornment data-id="nb-qty" position="start">
								<p data-id="nb-qty">{product.product_alert}</p>
							</InputAdornment>
						),
					}}
					onChange={(e) => setAlert(e)}
				/>
				<FullCenter>
					<Button title="Delete Product" color="error" onClick={handleModal} />
					<Button title="Edit Product" onClick={handleEdit} />
				</FullCenter>
				<Modal
					isOpen={isOpen}
					setIsOpen={setIsOpen}
					title={"Delete " + product.product_name}
					bodyContent={<DeletionBody />}
				/>
			</Column>
		)
	) : (
		<ArtTitle>Scan a product to start</ArtTitle>
	)
}

export default EditProduct
