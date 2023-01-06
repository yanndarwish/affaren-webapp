import { useState } from "react"
import {
	ArtTitle,
	Column,
	ColumnCenter,
	ErrorMessage,
	FullCenter,
} from "../../../assets/styles/common.styles"
import { usePostProductMutation } from "../../../redux/services/productsApi"
import Input from "../../common/Input/Input.component"
import Button from "../../common/Button/Button.component"
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline"
import HighlightOffOutlinedIcon from "@mui/icons-material/HighlightOffOutlined"

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
			<FullCenter>
				<ColumnCenter>
					<FullCenter>
						<CheckCircleOutlineIcon sx={{ fontSize: "64px" }} color="success" />
					</FullCenter>
					<ArtTitle>Product created successfully</ArtTitle>
				</ColumnCenter>
			</FullCenter>
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
		<FullCenter>
			<ColumnCenter>
				<HighlightOffOutlinedIcon sx={{ fontSize: "64px", color: "red" }} />
				<ErrorMessage>Failed to create product</ErrorMessage>
			</ColumnCenter>
		</FullCenter>
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
