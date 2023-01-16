import { useRef, useState } from "react"
import {
	ArtTitle,
	ErrorMessage,
	HorizontalCenter,
	SubTitle,
} from "../../../assets/common/common.styles"
import {
	Dialog,
	DialogBody,
	DialogCard,
	DialogFooter,
	DialogHeader,
	Overlay,
} from "../../POS/Sliders/Slider.styles"
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined"
import {
	Checkbox,
	FormControl,
	FormControlLabel,
	FormGroup,
	InputLabel,
	MenuItem,
	Select,
} from "@mui/material"
import { FormWrapper } from "../../POS/Sliders/NoBarcodeSlider/NoBarcodeSlider.styles"
import { FormFlex } from "../../POS/Sliders/AddCardSlider/AddCardSlider.styles"
import Input from "../../common/Input/Input.component"
import Button from "../../common/Button/Button.component"
import { usePostDishMutation } from "../../../redux/services/dishApi"
import InfoMessage from "../../common/InfoMessage/InfoMessage"

const CreateFormulaSlider = ({ theme, isOpen, setIsOpen }) => {
	const [inputList, setInputList] = useState([])
	const [name, setName] = useState("")
	const [price, setPrice] = useState("")
	const [active, setActive] = useState(true)
	const overlayRef = useRef()
	const [postDish, res] = usePostDishMutation()

	const closeSlider = (e) => {
		if (overlayRef.current === e.target) {
			setIsOpen(false)
			res.reset()
		}
	}

	const handleCreateFormula = () => {
		let cat = []
		const categories = document.querySelectorAll(".formula-category")

		categories.forEach((el) => {
			cat.push(el.querySelector("input").value)
		})
		const newDish = {
			dishName: name,
			dishIngredients: cat,
			dishCategory: "formula",
			dishPrice: parseFloat(price),
			dishActive: active ? "true" : "false",
		}
		postDish(newDish)
	}

	const ItemInput = () => {
		return (
			<FormControl fullWidth>
				<InputLabel id="demo-simple-select-label">Category</InputLabel>
				<Select
					className="formula-category"
					labelId="demo-simple-select-label"
					id="menu-category"
					label="Category"
					fullWidth
					required
					defaultValue="starter"
				>
					<MenuItem value={"starter"}>Starter</MenuItem>
					<MenuItem value={"main"}>Main</MenuItem>
					<MenuItem value={"desert"}>Desert</MenuItem>
				</Select>
			</FormControl>
		)
	}

	const handleAddItemInput = () => {
		setInputList(inputList.concat(<ItemInput key={inputList.length} />))
	}
	return isOpen ? (
		<Overlay theme={theme} onClick={closeSlider} ref={overlayRef}>
			<Dialog id="dialog" theme={theme}>
				<DialogHeader>
					<SubTitle>Create Formula</SubTitle>
					<CloseOutlinedIcon onClick={() => setIsOpen(false)} />
				</DialogHeader>
				<DialogBody>
					<ArtTitle>New Formula Informations</ArtTitle>
					<DialogCard theme={theme}>
						{res.isError ? (
							<InfoMessage state="error" text="Failed to create new dish" />
						) : res.isSuccess ? (
							<InfoMessage
								state="success"
								text="New dish created successfully"
							/>
						) : (
							<FormControl fullWidth>
								<FormWrapper>
									<Input
										label="Name"
										value={name}
										onChange={(e) => setName(e)}
									/>
									<FormControl fullWidth>
										<InputLabel id="demo-simple-select-label">
											Category
										</InputLabel>
										<Select
											className="formula-category"
											labelId="demo-simple-select-label"
											id="menu-category"
											label="Category"
											fullWidth
											required
											defaultValue="starter"
										>
											<MenuItem value={"starter"}>Starter</MenuItem>
											<MenuItem value={"main"}>Main</MenuItem>
											<MenuItem value={"desert"}>Desert</MenuItem>
										</Select>
									</FormControl>
									{inputList}

									<HorizontalCenter>
										<Button title="Add Item" onClick={handleAddItemInput} />
									</HorizontalCenter>
									<Input
										label="Price"
										value={price}
										onChange={(e) => setPrice(e)}
									/>
									<FormControlLabel
										control={
											<Checkbox
												checked={active}
												onChange={() => setActive(!active)}
											/>
										}
										label="Active"
									/>
								</FormWrapper>
							</FormControl>
						)}
					</DialogCard>
				</DialogBody>
				<DialogFooter>
					<Button
						title="Add to Menu"
						color="success"
						onClick={handleCreateFormula}
					/>
				</DialogFooter>
			</Dialog>
		</Overlay>
	) : null
}

export default CreateFormulaSlider
