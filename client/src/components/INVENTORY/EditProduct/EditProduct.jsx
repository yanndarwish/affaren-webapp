import { InputAdornment } from "@mui/material"
import { useState } from "react"
import {
	ArtTitle,
	Column,
	FullCenter,
	Gap,
} from "../../../assets/styles/common.styles"
import Button from "../../common/Button/Button.component"
import Input from "../../common/Input/Input.component"
import {
	useUpdateFullProductMutation,
	useDeleteProductMutation,
} from "../../../redux/services/productsApi"
import { Modal } from "modal-rjs"

const EditProduct = ({ product }) => {
	const [name, setName] = useState("")
	const [price, setPrice] = useState("")
	const [taxe, setTaxe] = useState("")
	const [barcode, setBarcode] = useState("")
	const [quantity, setQuantity] = useState("")
	const [received, setReceived] = useState("")
	const [alert, setAlert] = useState("")
	const [updateProduct, res] = useUpdateFullProductMutation()
	const [deleteProduct, response] = useDeleteProductMutation()
	const [sent, setSent] = useState(false)
	const [isOpen, setIsOpen] = useState(false)

	const handleEdit = () => {
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
		setSent(true)
	}

	console.log(response)
	console.log(response.isSuccess)

	const handleDelete = () => {
		console.log("delete")
		setIsOpen(false)
		deleteProduct({ id: product.product_id })
		setSent(true)
	}

	const handleModal = () => {
		setIsOpen(!isOpen)
	}

	const ModalBody = () => {
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

	return product ? (
		sent && res.isSuccess ? (
			<FullCenter>
				<ArtTitle>Product edited successfully</ArtTitle>
			</FullCenter>
		) : sent && response.isSuccess ? (
			<FullCenter>
				<ArtTitle>Product deleted successfully</ArtTitle>
			</FullCenter>
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
				<Input
					label="Taxe"
					fullWidth
					inputAdornment={{
						startAdornment: (
							<InputAdornment data-id="nb-qty" position="start">
								<p data-id="nb-qty">{product.product_taxe} %</p>
							</InputAdornment>
						),
					}}
					onChange={(e) => setTaxe(e)}
				/>
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
					bodyContent={<ModalBody />}
				/>
			</Column>
		)
	) : (
		<ArtTitle>Scan a product to start</ArtTitle>
	)
}

export default EditProduct
