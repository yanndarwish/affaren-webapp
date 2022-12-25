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
import { ArtTitle, SubTitle } from "../../../../assets/styles/common.styles"
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
	const [product, setProduct] = useState({
		id: "",
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
		if (field === "taxe") {
			if (e.target.value === 5.5) {
				name = "Alimentation"
			} else if (e.target.value === 10) {
				name = "Magazine"
			} else if (e.target.value === 20) {
				name = "Décoration/Alcool"
			}
			obj["name"] = name
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

		let obj = {...product}
		obj["quantity"] = parseInt(quantity)
		obj["price"] = parseFloat(price * quantity)
		obj["id"] = `nb-${products.length + 1}`
		
		setProduct(obj)
		dispatch(addProduct({products: obj}))
		setIsOpen(false)
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
									id="demo-simple-select"
									value={product.taxe}
									label="Category"
									onChange={(e) => handleChange(e, "taxe")}
									required
								>
									<MenuItem value={5}>Alimentation</MenuItem>
									<MenuItem value={10}>Magazine</MenuItem>
									<MenuItem value={20}>Décoration/Alcool</MenuItem>
								</Select>
								<Input
									id="nb-qty"
									data-id="nb-qty"
									onClick={handleInputClick}
									inputAdornment={{
										startAdornment: (
											<InputAdornment
												data-id="nb-qty"
												position="start"
											>
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
								/>

								<Input
									id="nb-price"
									data-id="nb-price"
									onClick={handleInputClick}
									inputAdornment={{
										startAdornment: (
											<InputAdornment
												data-id="nb-price"
												position="start"
											>
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
