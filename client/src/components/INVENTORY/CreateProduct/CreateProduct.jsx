import { useState } from "react"
import {
	ArtTitle,
	Column,
	ColumnCenter,
	FullCenter,
} from "../../../assets/styles/common.styles"
import { usePostProductMutation } from "../../../redux/services/productsApi"
import Input from "../../common/Input/Input.component"
import Button from "../../common/Button/Button.component"
import InfoMessage from "../../common/InfoMessage/InfoMessage"

const CreateProduct = ({
	inputBarcode,
	focusOnBarcode,
	resetBarcode,
	sent,
	setSent,
}) => {
	const [name, setName] = useState("")
	const [price, setPrice] = useState("")
	const [taxe, setTaxe] = useState("")
	const [barcode, setBarcode] = useState(
		inputBarcode
			? inputBarcode.endsWith("/n")
				? inputBarcode.slice(0, -2)
				: inputBarcode
			: ""
	)
	const [quantity, setQuantity] = useState("")
	const [alert, setAlert] = useState("")
	const [newProduct, setNewProduct] = useState("")
	const [postProduct, res] = usePostProductMutation()

	const handleCreate = () => {
		let newProduct = {
			name: name,
			price: price,
			quantity: quantity,
			taxe: taxe,
			barcode: barcode,
			alert: alert,
		}
		setNewProduct(newProduct)
		postProduct(newProduct)
		setSent(true)
		focusOnBarcode()
		resetInputs()
		resetBarcode()
	}

	const resetInputs = () => {
		setName("")
		setPrice("")
		setTaxe("")
		setBarcode("")
		setQuantity("")
		setAlert("")
	}

	return sent && res.isSuccess ? (
		<Column>
			<InfoMessage state="success" text="Product created successfully" />
			<FullCenter>
				<ColumnCenter>
					{Object.keys(newProduct).map((key, i) => (
						<h5 key={i}>
							{key} : {newProduct[key]}
						</h5>
					))}
				</ColumnCenter>
			</FullCenter>
		</Column>
	) : sent && res.isError ? (
		<InfoMessage state="error" text="Failed to create product" />
	) : (
		<Column>
			<FullCenter>
				<ArtTitle>Create a Product</ArtTitle>
			</FullCenter>
			<Input value={name} label="Name" fullWidth onChange={(e) => setName(e)} />
			<Input
				value={price}
				label="Price"
				fullWidth
				onChange={(e) => setPrice(e)}
			/>
			<Input value={taxe} label="Taxe" fullWidth onChange={(e) => setTaxe(e)} />
			<Input
				value={quantity}
				label="Quantity in Stock"
				type="number"
				fullWidth
				onChange={(e) => setQuantity(e)}
			/>
			<Input
				value={barcode}
				label="Barcode"
				fullWidth
				onChange={(e) => setBarcode(e)}
			/>
			<Input
				value={alert}
				label="Alert"
				type="number"
				fullWidth
				onChange={(e) => setAlert(e)}
			/>
			<FullCenter>
				<Button title="Create Product" onClick={handleCreate} />
			</FullCenter>
		</Column>
	)
}

export default CreateProduct
