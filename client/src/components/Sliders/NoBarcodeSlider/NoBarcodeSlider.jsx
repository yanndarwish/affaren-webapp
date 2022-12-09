import { useRef, useState } from "react"
import {
	Dialog,
	DialogBody,
	DialogFooter,
	DialogHeader,
	Overlay,
} from "../Slider.styles"
import { FormControl, InputLabel, Select, MenuItem } from "@mui/material"
import { ArtTitle, SubTitle } from "../../../assets/styles/common.styles"
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined"
import Button from "../../Button/Button.component"
import Input from "../../Input/Input.component"
import NumPad from "../../NumPad/NumPad"
import { FormWrapper, DialogCard } from "./NoBarcodeSlider.styles"

const NoBarcodeSlider = ({ theme, isOpen, setIsOpen }) => {
	const overlayRef = useRef()
	const [product, setProduct] = useState({ taxe: 5, quantity: 1, price: 0, name:"Alimentation" })

	const closeSlider = (e) => {
		if (overlayRef.current === e.target) {
			setIsOpen(false)
		}
	}

	const handleChange = (e, field) => {
		let obj = { ...product }
		let name
		if (field === "taxe") {
			if(e.target.value === 5) {
				name = "Alimentation"
			} else if (e.target.value === 10) {
				name = "Magazine"
			} else if (e.target.value === 20) {
				name = "Décoration/Alcool"
			}
			obj["name"] = name 
		}

		obj[field] = e.target?.value ? e.target.value : e
		setProduct(obj)
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
									type="number"
									label="Quantity"
									onChange={(e) => handleChange(e, "quantity")}
									value={product.quantity}
								/>

								<Input
									type="number"
									label="Price"
									onChange={(e) => handleChange(e, "price")}
									value={product.price}
								/>
							</FormWrapper>
						</FormControl>
						<NumPad />
					</DialogCard>
				</DialogBody>
				<DialogFooter>
					<Button
						title="Add Product"
						color="success"
						onClick={() => console.log(product)}
					/>
				</DialogFooter>
			</Dialog>
		</Overlay>
	) : null
}

export default NoBarcodeSlider
