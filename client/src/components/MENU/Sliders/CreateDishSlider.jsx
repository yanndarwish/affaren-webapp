import { useRef, useState } from "react"
import { ArtTitle, SubTitle } from "../../../assets/common/common.styles"
import {
	Dialog,
	DialogBody,
	DialogFooter,
	DialogHeader,
	Overlay,
} from "../../POS/Sliders/Slider.styles"
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined"
import {
	Checkbox,
	FormControl,
	FormControlLabel,
	InputLabel,
	MenuItem,
	Select,
} from "@mui/material"
import {
	FormWrapper,
	DialogCard,
} from "../../POS/Sliders/NoBarcodeSlider/NoBarcodeSlider.styles"
import Input from "../../common/Input/Input.component"
import Button from "../../common/Button/Button.component"
import { usePostDishMutation } from "../../../redux/services/dishApi"
import InfoMessage from "../../common/InfoMessage/InfoMessage"

const CreateDishSlider = ({ theme, isOpen, setIsOpen }) => {
	const [name, setName] = useState("")
	const [category, setCategory] = useState("starter")
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

	const handleCreateDish = () => {
		let ing = []
		const ingredients = document
			.getElementById("dish-ingredients")
			.value.split(",")
		ingredients.forEach((ingre) => {
			ing.push(ingre.trim())
		})

		const newDish = {
			dishName: name,
			dishIngredients: ing,
			dishCategory: category,
			dishPrice: parseFloat(price),
			dishActive: active ? "true" : "false",
		}
		postDish(newDish)
		resetInputs()
			res.reset()

	}

	const resetInputs = () => {
		setName("")
		setCategory("starter")
		setPrice("")
		setActive(true)
		const ingredients = document.getElementById("dish-ingredients")
		ingredients.value = ""
	}

	return isOpen ? (
		<Overlay theme={theme} onClick={closeSlider} ref={overlayRef}>
			<Dialog id="dialog" theme={theme}>
				<DialogHeader>
					<SubTitle>Create Dish</SubTitle>
					<CloseOutlinedIcon onClick={() => setIsOpen(false)} />
				</DialogHeader>
				<DialogBody>
					<ArtTitle>New Dish Informations</ArtTitle>
					<DialogCard theme={theme}>
						{res.isError ? (
							<InfoMessage state="error" text="Failed to create new dish" />
						) : res.isSuccess ? (
							<InfoMessage
								state="success"
								text="New dish created successfully"
							/>
						) : (
							<FormWrapper>
								<Input label="Name" value={name} onChange={(e) => setName(e)} />
								<Input label="Ingredients" id="dish-ingredients" />
								<FormControl>
									<InputLabel id="demo-simple-select-label">
										Category
									</InputLabel>
									<Select
										labelId="demo-simple-select-label"
										id="menu-category"
										value={category}
										label="Category"
										onChange={(e) => setCategory(e.target.value)}
										fullWidth
										required
									>
										<MenuItem value={"starter"}>Starter</MenuItem>
										<MenuItem value={"main"}>Main</MenuItem>
										<MenuItem value={"desert"}>Desert</MenuItem>
										<MenuItem value={"drink"}>Drink</MenuItem>
									</Select>
								</FormControl>
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
						)}
					</DialogCard>
				</DialogBody>
				<DialogFooter>
					<Button
						title="Add to Menu"
						color="success"
						onClick={handleCreateDish}
					/>
				</DialogFooter>
			</Dialog>
		</Overlay>
	) : null
}

export default CreateDishSlider
