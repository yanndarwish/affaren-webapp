import { useRef, useState } from "react"
import {
	ArtTitle,
	FullCenter,
	SubTitle,
} from "../../../assets/styles/common.styles"
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

const EditFormulaSlider = ({ theme, isOpen, setIsOpen, dish, setDish }) => {
	const selectedDish = dish
	const [inputList, setInputList] = useState([])
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
			setIngredients(dish?.dish_ingredients)
		}
	}

	const handleEditDish = () => {
		let cat = []
		const categories = document.querySelectorAll(".formula-category")

		categories.forEach((el) => {
			cat.push(el.querySelector("input").value)
		})

		const newDish = {
			dishName: name,
			dishIngredients: cat,
			dishCategory: category,
			dishPrice: parseFloat(price),
			dishActive: active ? "true" : "false",
		}
		updateDish({payload: newDish, id: selectedDish.dish_id})
		console.log({payload: newDish, id: selectedDish.dish_id})
	}

	const ItemInput = ({ id, value }) => {
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
					defaultValue={value ? value : "starter"}
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

	const populateInputList = () => {
		setInputList([])
		ingredients &&
			ingredients.forEach((item, i) => {
				setInputList((current) => [
					...current,
					<ItemInput key={i} value={item} />,
				])
			})
	}

	const handleRemoveItemInput = () => {
		setInputList(inputList.slice(0, -1))
	}

	useEffect(() => {
		initialize(selectedDish)
	}, [selectedDish])

	useEffect(() => {
		populateInputList()
	}, [ingredients])

	return isOpen ? (
		<Overlay theme={theme} onClick={closeSlider} ref={overlayRef}>
			<Dialog id="dialog" theme={theme}>
				<DialogHeader>
					<SubTitle>Edit Formula</SubTitle>
					<CloseOutlinedIcon onClick={() => setIsOpen(false)} />
				</DialogHeader>
				<DialogBody>
					<ArtTitle>Edit Formula Informations</ArtTitle>
					<DialogCard theme={theme}>
						{res.isError ? (
							<InfoMessage state="error" text="Failed to edit new formula" />
						) : res.isSuccess ? (
							<InfoMessage
								state="success"
								text="New formula edited successfully"
							/>
						) : (
							<FormControl fullWidth>
								<FormWrapper>
									<Input
										label="Name"
										value={name}
										onChange={(e) => setName(e)}
									/>
									{inputList}
									<FullCenter>
										<Button title="Add Item" onClick={handleAddItemInput} />
										<Button
											title="Remove Item"
											onClick={handleRemoveItemInput}
										/>
									</FullCenter>
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

export default EditFormulaSlider
