import { useRef, useState } from "react"
import {
	Dialog,
	DialogBody,
	DialogFooter,
	DialogHeader,
	Overlay,
} from "../Slider.styles"
import { ArtTitle, SubTitle } from "../../../../assets/styles/common.styles"
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined"
import Button from "../../../common/Button/Button.component"
import NumPad from "../../../common/NumPad/NumPad"
import Input from "../../../common/Input/Input.component"
import { FormControl, InputLabel, Select, MenuItem } from "@mui/material"
import {
	FormWrapper,
	DialogCard,
} from "../NoBarcodeSlider/NoBarcodeSlider.styles"
import { FormFlex } from "./AddCardSlider.styles"

const AddCardSlider = ({ theme, isOpen, setIsOpen }) => {
	const overlayRef = useRef()
	const [product, setProduct] = useState({
		taxe: 5,
		quantity: 1,
		price: 0,
		name: "",
		image: "",
	})

	const handleChange = (e, field) => {
		let obj = { ...product }
		obj[field] = e.target?.value ? e.target.value : e
		setProduct(obj)
	}

	const closeSlider = (e) => {
		if (overlayRef.current === e.target) {
			setIsOpen(false)
		}
	}

	return isOpen ? (
		<Overlay theme={theme} onClick={closeSlider} ref={overlayRef}>
			<Dialog id="dialog" theme={theme}>
				<DialogHeader>
					<SubTitle>Add Card</SubTitle>
					<CloseOutlinedIcon onClick={() => setIsOpen(false)} />
				</DialogHeader>
				<DialogBody>
					<ArtTitle>New Card Informations</ArtTitle>
					<DialogCard theme={theme}>
						<FormControl fullWidth>
							<FormWrapper>
								<FormFlex>
									<InputLabel id="demo-simple-select-label">
										Category
									</InputLabel>
									<Select
										labelId="demo-simple-select-label"
										id="demo-simple-select"
										value={product.taxe}
										label="Category"
										onChange={(e) => handleChange(e, "taxe")}
										fullWidth
										required
									>
										<MenuItem value={5}>Alimentation</MenuItem>
										<MenuItem value={10}>Magazine</MenuItem>
										<MenuItem value={20}>Décoration/Alcool</MenuItem>
									</Select>
									<Input
										type="text"
										label="Name"
										onChange={(e) => handleChange(e, "name")}
										value={product.name}
										fullWidth
									/>
								</FormFlex>
								<FormFlex>
									<Input
										type="number"
										label="Price"
										onChange={(e) => handleChange(e, "price")}
										value={product.price}
										fullWidth
									/>
									<Input
										type="text"
										label="Image"
										onChange={(e) => handleChange(e, "image")}
										value={product.image}
										fullWidth
									/>
								</FormFlex>
							</FormWrapper>
						</FormControl>
						<NumPad />
					</DialogCard>
				</DialogBody>
				<DialogFooter>
					<Button
						title="Add Card"
						color="success"
						onClick={() => console.log(product)}
					/>
				</DialogFooter>
			</Dialog>
		</Overlay>
	) : null
}

export default AddCardSlider
