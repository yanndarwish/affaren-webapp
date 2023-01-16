import { useRef, useState } from "react"
import { ArtTitle, SubTitle } from "../../../assets/common/common.styles"
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
	InputLabel,
	MenuItem,
	Select,
} from "@mui/material"
import { FormWrapper } from "../../POS/Sliders/NoBarcodeSlider/NoBarcodeSlider.styles"
import Input from "../../common/Input/Input.component"
import Button from "../../common/Button/Button.component"
import { useUpdateDishMutation } from "../../../redux/services/dishApi"
import InfoMessage from "../../common/InfoMessage/InfoMessage"
import { useEffect } from "react"

const EditDishSlider = ({ theme, isOpen, setIsOpen, dish, setDish }) => {
	const selectedDish = dish
	const [name, setName] = useState("")
	const [category, setCategory] = useState("")
	const [price, setPrice] = useState("")
	const [active, setActive] = useState(false)
	const [ingredients, setIngredients] = useState("")
	const overlayRef = useRef()
	const [updateDish, res] = useUpdateDishMutation()

	const closeSlider = (e) => {
		if (overlayRef.current === e.target) {
			setIsOpen(false)
			res.reset()
			setDish([])
		}
	}

	const initialize = (dish) => {
		if (dish) {
			setName(dish?.dish_name)
			setCategory(dish?.dish_category)
			setPrice(dish?.dish_price)
			setActive(dish?.dish_active === "true" ? true : false)
			setIngredients(dish?.dish_ingredients?.join(", "))
		}
	}

	const handleEditDish = () => {
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
		updateDish({ payload: newDish, id: selectedDish.dish_id })
	}

	useEffect(() => {
		initialize(selectedDish)
	}, [selectedDish])

	return isOpen ? (
		<Overlay theme={theme} onClick={closeSlider} ref={overlayRef}>
			<Dialog id="dialog" theme={theme}>
				<DialogHeader>
					<SubTitle>Edit Dish</SubTitle>
					<CloseOutlinedIcon onClick={() => setIsOpen(false)} />
				</DialogHeader>
				<DialogBody>
					<ArtTitle>Edit Dish Informations</ArtTitle>
					<DialogCard theme={theme}>
						{res.isError ? (
							<InfoMessage state="error" text="Failed to edit new dish" />
						) : res.isSuccess ? (
							<InfoMessage
								state="success"
								text="New dish edited successfully"
							/>
						) : (
							<FormControl fullWidth>
								<FormWrapper>
									<Input
										label="Name"
										value={name}
										onChange={(e) => setName(e)}
									/>
									<Input
										value={ingredients}
										label="Ingredients"
										id="dish-ingredients"
										onChange={(e) => setIngredients(e)}
									/>
									<FormControl fullWidth>
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
							</FormControl>
						)}
					</DialogCard>
				</DialogBody>
				<DialogFooter>
					<Button title="Edit" color="success" onClick={handleEditDish} />
				</DialogFooter>
			</Dialog>
		</Overlay>
	) : null
}

export default EditDishSlider
