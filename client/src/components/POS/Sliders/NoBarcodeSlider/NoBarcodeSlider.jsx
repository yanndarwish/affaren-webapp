import { useRef, useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import {
	Dialog,
	DialogBody,
	DialogFooter,
	DialogHeader,
	Overlay,
} from "../Slider.styles"
import {
	FormControl,
	InputLabel,
	Select,
	MenuItem,
	InputAdornment,
} from "@mui/material"
import { ArtTitle, SubTitle } from "../../../../assets/common/common.styles"
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined"
import Button from "../../../common/Button/Button.component"
import Input from "../../../common/Input/Input.component"
import NumPad from "../../../common/NumPad/NumPad"
import { FormWrapper, DialogCard } from "./NoBarcodeSlider.styles"
import BackspaceOutlinedIcon from "@mui/icons-material/BackspaceOutlined"
import { addProduct } from "../../../../redux/features/sale"

const NoBarcodeSlider = ({ theme, isOpen, setIsOpen }) => {
	const products = useSelector((state) => state.sale.products)
	const dispatch = useDispatch()
	const overlayRef = useRef()
	const [focusedInput, setFocusedInput] = useState("")
	const [qtyError, setQtyError] = useState(false)
	const [priceError, setPriceError] = useState(false)
	const [product, setProduct] = useState({
		id: "nb-1",
		taxe: 5.5,
		quantity: "",
		price: "",
		name: "Alimentation",
	})

	const closeSlider = (e) => {
		if (overlayRef.current === e.target) {
			setIsOpen(false)
		}
	}

	const handleChange = (e, field) => {
		let obj = { ...product }
		let name
		let id
		if (field === "taxe") {
			if (e.target.value === 5.5) {
				name = "Alimentation"
				id = "nb-1"
			} else if (e.target.value === 2.1) {
				name = "Magazine"
				id = "nb-2"
			} else if (e.target.value === 20) {
				name = "Décoration/Alcool"
				id = "nb-3"
			}
			obj["name"] = name
			obj["id"] = id
		}

		obj[field] = e.target.value
		setProduct(obj)
	}

	const handleInputClick = (e) => {
		setFocusedInput(
			e.target.id
				? e.target.id
				: e.target.dataset?.id
				? e.target.dataset?.id
				: e.target.parentNode.previousSibling?.id
				? e.target.parentNode.previousSibling?.id
				: e.target.querySelector("input")?.id
		)
	}

	const handleCorrect = (e) => {
		const input = e.target.parentNode.previousSibling
			? e.target.parentNode.previousSibling
			: e.target.parentNode.parentNode.previousSibling

		input.value = input.value.slice(0, -1)
	}

	const addNoBarcodeProduct = () => {
		const quantity = document.getElementById("nb-qty").value
		const price = document.getElementById("nb-price").value

		if (quantity && price) {
			let obj = { ...product }
			obj["quantity"] = parseInt(quantity)
			obj["price"] = parseFloat(price * quantity).toFixed(2)
			obj["id"] = `nb-${products.length + 1}`

			setPriceError(false)
			setQtyError(false)
			setProduct(obj)
			dispatch(addProduct({ products: obj }))
			setIsOpen(false)
			setProduct({...product, taxe: 5.5})
		} else if (!price && !quantity) {
			setPriceError(true)
			setQtyError(true)
		} else if (!price) {
			setQtyError(false)

			setPriceError(true)
		} else if (!quantity) {
			setPriceError(false)

			setQtyError(true)
		}
	}

	return isOpen ? (
		<Overlay theme={theme} onClick={closeSlider} ref={overlayRef}>
			<Dialog id="dialog" theme={theme}>
				<DialogHeader>
					<SubTitle>No Barcode</SubTitle>
					<CloseOutlinedIcon onClick={() => setIsOpen(false)} />
				</DialogHeader>
				<DialogBody>
					<ArtTitle>Product</ArtTitle>
					<DialogCard theme={theme}>
						<FormControl fullWidth>
							<FormWrapper>
								<InputLabel id="demo-simple-select-label">Category</InputLabel>
								<Select
									labelId="demo-simple-select-label"
									id="nb-category"
									value={product.taxe}
									label="Category"
									onChange={(e) => handleChange(e, "taxe")}
									required
								>
									<MenuItem value={5.5}>Alimentation</MenuItem>
									<MenuItem value={2.1}>Magazine</MenuItem>
									<MenuItem value={20}>Décoration/Alcool</MenuItem>
								</Select>
								<Input
									id="nb-qty"
									data-id="nb-qty"
									onClick={handleInputClick}
									inputAdornment={{
										startAdornment: (
											<InputAdornment data-id="nb-qty" position="start">
												<p data-id="nb-qty">Quantity</p>
											</InputAdornment>
										),
										endAdornment: (
											<InputAdornment
												position="end"
												data-id="nb-qty"
												onClick={handleCorrect}
											>
												<BackspaceOutlinedIcon data-id="nb-qty" />
											</InputAdornment>
										),
									}}
									error={qtyError}
									helperText={qtyError && "Required"}
								/>

								<Input
									id="nb-price"
									data-id="nb-price"
									onClick={handleInputClick}
									inputAdornment={{
										startAdornment: (
											<InputAdornment data-id="nb-price" position="start">
												<p data-id="nb-price">Price</p>
											</InputAdornment>
										),
										endAdornment: (
											<InputAdornment
												data-id="nb-price"
												position="end"
												onClick={handleCorrect}
											>
												<BackspaceOutlinedIcon data-id="nb-price" />
											</InputAdornment>
										),
									}}
									error={priceError}
									helperText={priceError && "Required"}
								/>
							</FormWrapper>
						</FormControl>
						<NumPad target={focusedInput} />
					</DialogCard>
				</DialogBody>
				<DialogFooter>
					<Button
						title="Add Product"
						color="success"
						onClick={addNoBarcodeProduct}
					/>
				</DialogFooter>
			</Dialog>
		</Overlay>
	) : null
}

export default NoBarcodeSlider
