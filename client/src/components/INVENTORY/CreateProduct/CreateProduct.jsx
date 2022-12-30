import { useState } from "react"
import {
	ArtTitle,
	Column,
	FullCenter,
} from "../../../assets/styles/common.styles"
import { usePostProductMutation } from "../../../redux/services/productsApi"
import Input from "../../common/Input/Input.component"
import Button from "../../common/Button/Button.component"

const CreateProduct = () => {
	const [name, setName] = useState("")
	const [price, setPrice] = useState("")
	const [taxe, setTaxe] = useState("")
	const [barcode, setBarcode] = useState("")
	const [quantity, setQuantity] = useState("")
	const [alert, setAlert] = useState("")
	const [sent, setSent] = useState(false)
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
	}

	return sent && res.isSuccess ? (
		<Column>
			<FullCenter>
				<ArtTitle>Product created successfully</ArtTitle>
			</FullCenter>
            <FullCenter>
                <Column>
			{Object.keys(newProduct).map((key, i) => (
                <h5 key={i}>
					{key} : {newProduct[key]}
				</h5>
			))}
            </Column>
            </FullCenter>
		</Column>
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
