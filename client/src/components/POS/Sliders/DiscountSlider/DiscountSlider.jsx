import { useRef, useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import Table from "@mui/material/Table"
import TableBody from "@mui/material/TableBody"
import TableCell from "@mui/material/TableCell"
import TableContainer from "@mui/material/TableContainer"
import TableHead from "@mui/material/TableHead"
import TableRow from "@mui/material/TableRow"
import Paper from "@mui/material/Paper"
import {
	Checkbox,
	FormControl,
	FormLabel,
	FormControlLabel,
	Radio,
	RadioGroup,
} from "@mui/material"

import {
	Dialog,
	DialogBody,
	DialogFooter,
	DialogHeader,
	Overlay,
} from "../Slider.styles"
import { SubTitle } from "../../../../assets/common/common.styles"
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined"
import Button from "../../../common/Button/Button.component"
import NumPad from "../../../common/NumPad/NumPad"
import { DialogCard } from "./DiscountSlider.styles"
import { updateProducts, setDiscount } from "../../../../redux/features/sale"

const DiscountSlider = ({ theme, isOpen, setIsOpen }) => {
	const products = useSelector((state) => state.sale.products)
	const dispatch = useDispatch()
	const overlayRef = useRef()
	const [selected, setSelected] = useState([])
	const [discountType, setDiscountType] = useState("percent")
	const [discountAmount, setDiscountAmount] = useState(0)

	const closeSlider = (e) => {
		if (overlayRef.current === e.target) {
			setIsOpen(false)
		}
	}

	const handleSelectAllClick = (event) => {
		if (event.target.checked) {
			const newSelected = products.map((n) => n.id)
			setSelected(newSelected)
			return
		}
		setSelected([])
	}

	const handleClick = (event, id) => {
		const selectedIndex = selected.indexOf(id)
		let newSelected = []

		if (selectedIndex === -1) {
			newSelected = newSelected.concat(selected, id)
		} else if (selectedIndex === 0) {
			newSelected = newSelected.concat(selected.slice(1))
		} else if (selectedIndex === selected.length - 1) {
			newSelected = newSelected.concat(selected.slice(0, -1))
		} else if (selectedIndex > 0) {
			newSelected = newSelected.concat(
				selected.slice(0, selectedIndex),
				selected.slice(selectedIndex + 1)
			)
		}

		setSelected(newSelected)
	}

	const toggleDiscountType = (e) => {
		const discountType = document.querySelector(
			'input[name="discount-type"]:checked'
		).value
		setDiscountType(discountType)
	}

	const applyDiscount = () => {
		let discountedProducts = []
		let reduction
		let newPrice
		// find the products
		selected.forEach((id) => {
			const found = products.find((product) => product.id === id)
			// apply discount
			if (discountType === "percent") {
				reduction = (found.price * discountAmount) / 100
				newPrice = Math.floor((found.price - reduction) * 100) / 100
			} else {
				reduction = Math.floor((discountAmount / selected.length) * 100) / 100
				newPrice = Math.floor((found.price - reduction) * 100) / 100
			}
			// create new updated object
			let obj = { ...found }
			obj.price = newPrice
			discountedProducts.push(obj)

			let productDiscount = {
				productId: id,
				discountType: discountType,
				discountAmount: discountAmount,
				originalPrice: found.price,
				reduction: reduction,
				newPrice: newPrice,
			}

			dispatch(setDiscount({ discount: productDiscount }))
		})

		const updated = products.map((product) => {
			const found = discountedProducts.find(item => item.id === product.id)
			if (found) {
				return found
			} else {
				return product
			}

		})

		dispatch(updateProducts({ products: updated }))
		resetDiscount()
		setIsOpen(false)
	}

	const resetDiscount = () => {
		setDiscountAmount(0)
		setDiscountType("percent")
		setSelected([])
		document.getElementById("percent-checkbox").checked = true
	}

	const isSelected = (id) => selected.indexOf(id) !== -1

	return isOpen ? (
		<Overlay theme={theme} onClick={closeSlider} ref={overlayRef}>
			<Dialog id="dialog" theme={theme}>
				<DialogHeader>
					<SubTitle>Discount</SubTitle>
					<CloseOutlinedIcon onClick={() => setIsOpen(false)} />
				</DialogHeader>
				<DialogBody>
					{/* <ArtTitle>Product List</ArtTitle> */}
					<DialogCard theme={theme}>
						<TableContainer component={Paper} sx={{ height: "100%" }}>
							<Table
								sx={{ minWidth: 650, height: "100%" }}
								aria-label="simple table"
							>
								<TableHead>
									<TableRow>
										<TableCell padding="checkbox">
											<Checkbox
												color="primary"
												checked={
													products.length > 0 &&
													selected.length === products.length
												}
												onChange={handleSelectAllClick}
												inputProps={{
													"aria-label": "select all desserts",
												}}
											/>
										</TableCell>
										<TableCell>Name</TableCell>
										<TableCell>Qty</TableCell>
										<TableCell>Price</TableCell>
									</TableRow>
								</TableHead>
								<TableBody>
									{products.map((product, index) => {
										const isItemSelected = isSelected(product.id)
										const labelId = `enhanced-table-checkbox-${index}`

										return (
											<TableRow
												key={product.name}
												hover
												onClick={(event) => handleClick(event, product.id)}
												role="checkbox"
												aria-checked={isItemSelected}
												tabIndex={-1}
												selected={isItemSelected}
												// sx={{
												// 	"&:last-child td, &:last-child th": { border: 0 },
												// }}
											>
												<TableCell padding="checkbox">
													<Checkbox
														color="primary"
														checked={isItemSelected}
														inputProps={{
															"aria-labelledby": labelId,
														}}
													/>
												</TableCell>
												<TableCell component="th" scope="row">
													{product.name}
												</TableCell>
												<TableCell>{product.quantity}</TableCell>
												<TableCell>{product.price}</TableCell>
											</TableRow>
										)
									})}
								</TableBody>
							</Table>
						</TableContainer>
						<FormControl>
							<FormLabel id="demo-radio-buttons-group-label">Type</FormLabel>
							<RadioGroup
								aria-labelledby="type-radio-buttons-group-label"
								defaultValue="percent"
								name="discount-type"
								row
							>
								<FormControlLabel
									id="percent-checkbox"
									value="percent"
									control={<Radio />}
									label="Percent"
									onClick={toggleDiscountType}
								/>
								<FormControlLabel
									value="cash"
									control={<Radio />}
									label="Cash"
									onClick={toggleDiscountType}
								/>
							</RadioGroup>
						</FormControl>
						<NumPad
							display
							unit={discountType === "percent" ? "%" : "€"}
							value={discountAmount}
							setValue={setDiscountAmount}
						/>
					</DialogCard>
				</DialogBody>
				<DialogFooter>
					<Button
						title="Apply Discount"
						color="success"
						onClick={applyDiscount}
					/>
				</DialogFooter>
			</Dialog>
		</Overlay>
	) : null
}

export default DiscountSlider
