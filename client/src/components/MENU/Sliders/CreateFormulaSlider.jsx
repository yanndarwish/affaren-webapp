import { useRef, useState } from "react"
import {
	ArtTitle,
	HorizontalCenter,
	SubTitle,
} from "../../../assets/common/common.styles"
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

const CreateFormulaSlider = ({ theme, isOpen, setIsOpen }) => {
	const [inputList, setInputList] = useState([])
	const [name, setName] = useState("")
	const [price, setPrice] = useState("")
	const [active, setActive] = useState(true)
	const [nameError, setNameError] = useState(false)
	const [priceError, setPriceError] = useState(false)

	const overlayRef = useRef()
	const [postDish, res] = usePostDishMutation()

	const closeSlider = (e) => {
		if (overlayRef.current === e.target) {
			setIsOpen(false)
			res.reset()
		}
	}

	const handleCreateFormula = () => {
		!name ? setNameError(true) : setNameError(false)
		!price || isNaN(price) ? setPriceError(true) : setPriceError(false)

		if (name && price && !isNaN(price)) {
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
			resetInputs()
			res.reset()
		}
	}

	const handleClose = () => {
		res.reset()
		setIsOpen(false)
	}

	const resetInputs = () => {
		setName("")
		setInputList([])
		setPrice("")
		setActive(true)
		const categories = document.querySelectorAll(".formula-category")
		categories.forEach((input) => {
			input.value = "starter"
		})
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
					<MenuItem value={"drink"}>Drink</MenuItem>
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
										error={nameError}
										helperText={nameError && "Required"}
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
										error={priceError}
										helperText={priceError && "Required"}
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
					{res.isSuccess ? (
						<Button title="Close" color="success" onClick={handleClose} />
					) : (
						<Button
							title="Add to Menu"
							color="success"
							onClick={handleCreateFormula}
						/>
					)}
				</DialogFooter>
			</Dialog>
		</Overlay>
	) : null
}

export default CreateFormulaSlider
