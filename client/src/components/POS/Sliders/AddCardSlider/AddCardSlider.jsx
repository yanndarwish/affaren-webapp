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
import {
	FormControl,
	InputLabel,
	Select,
	MenuItem,
	InputAdornment,
} from "@mui/material"
import BackspaceOutlinedIcon from "@mui/icons-material/BackspaceOutlined"

import {
	FormWrapper,
	DialogCard,
} from "../NoBarcodeSlider/NoBarcodeSlider.styles"
import { FormFlex } from "./AddCardSlider.styles"
import { usePostCardMutation } from "../../../../redux/services/cardApi"
import { login } from "../../../../redux/features/login"

const AddCardSlider = ({ theme, isOpen, setIsOpen }) => {
	const overlayRef = useRef()
	const [product, setProduct] = useState({
		id: "",
		taxe: 5.5,
		price: "",
		name: "",
	})
	const [postCard, res] = usePostCardMutation()
	const [focusedInput, setFocusedInput] = useState("")

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

	const handleChange = (e, field) => {
		let obj = { ...product }
		let value = e.target?.value ? e.target.value : e
		obj[field] = value
		let id
		if (field === "name") {
			id = `c-${value}`
			obj["id"] = id
		}
		setProduct(obj)
	}

	const handleAddCard = () => {
		const newProduct = {
			...product,
			price: parseFloat(document.getElementById("c-price").value),
		}
		console.log(newProduct)
		postCard(newProduct)
		setIsOpen(false)
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
										<MenuItem value={5.5}>Alimentation</MenuItem>
										<MenuItem value={10}>Magazine</MenuItem>
										<MenuItem value={20}>Décoration/Alcool</MenuItem>
									</Select>
									<Input
										id="c-price"
										onClick={handleInputClick}
										type="text"
										onChange={(e) => handleChange(e, "price")}
										fullWidth
										inputAdornment={{
											startAdornment: (
												<InputAdornment data-id="nb-qty" position="start">
													<p data-id="nb-qty">Price</p>
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
								</FormFlex>
								<FormFlex>
									<Input
										label="Name"
										onClick={handleInputClick}
										type="text"
										onChange={(e) => handleChange(e, "name")}
										value={product.name}
										fullWidth
									/>
								</FormFlex>
							</FormWrapper>
						</FormControl>
						<NumPad target={focusedInput} />
					</DialogCard>
				</DialogBody>
				<DialogFooter>
					<Button
						title="Add Card"
						color="success"
						onClick={() => handleAddCard()}
					/>
				</DialogFooter>
			</Dialog>
		</Overlay>
	) : null
}

export default AddCardSlider
