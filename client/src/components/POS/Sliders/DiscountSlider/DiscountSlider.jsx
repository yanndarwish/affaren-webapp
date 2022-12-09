import { useRef, useState } from "react"
import Table from "@mui/material/Table"
import TableBody from "@mui/material/TableBody"
import TableCell from "@mui/material/TableCell"
import TableContainer from "@mui/material/TableContainer"
import TableHead from "@mui/material/TableHead"
import TableRow from "@mui/material/TableRow"
import Paper from "@mui/material/Paper"
import { Checkbox, FormControl, FormLabel, FormControlLabel, Radio, RadioGroup } from "@mui/material"

import {
	Dialog,
	DialogBody,
	DialogFooter,
	DialogHeader,
	Overlay,
} from "../Slider.styles"
import { SubTitle } from "../../../../assets/styles/common.styles"
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined"
import Button from "../../../common/Button/Button.component"
import NumPad from "../../../common/NumPad/NumPad"
import { DialogCard } from "./DiscountSlider.styles"

const DiscountSlider = ({ theme, isOpen, setIsOpen }) => {
	const overlayRef = useRef()
	const [selected, setSelected] = useState([])

	const closeSlider = (e) => {
		if (overlayRef.current === e.target) {
			setIsOpen(false)
		}
	}

	function createData(name, quantity, price) {
		return { name, quantity, price }
	}

	const rows = [
		createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
		createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
		createData("Eclair", 262, 16.0, 24, 6.0),
		createData("Cupcake", 305, 3.7, 67, 4.3),
		createData("Gingerbread", 356, 16.0, 49, 3.9),
	]

	const handleSelectAllClick = (event) => {
		if (event.target.checked) {
			const newSelected = rows.map((n) => n.name)
			setSelected(newSelected)
			return
		}
		setSelected([])
	}

	const handleClick = (event, name) => {
		const selectedIndex = selected.indexOf(name)
		let newSelected = []

		if (selectedIndex === -1) {
			newSelected = newSelected.concat(selected, name)
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

    // console.log(selected)

	const isSelected = (name) => selected.indexOf(name) !== -1

	
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
						<TableContainer component={Paper} sx={{ maxHeight: 200 }}>
							<Table sx={{ minWidth: 650 }} aria-label="simple table">
								<TableHead>
									<TableRow>
										<TableCell padding="checkbox">
											<Checkbox
												color="primary"
												checked={
													rows.length > 0 && selected.length === rows.length
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
									{rows.map((row, index) => {
										const isItemSelected = isSelected(row.name)
										const labelId = `enhanced-table-checkbox-${index}`

										return (
											<TableRow
												key={row.name}
												hover
												onClick={(event) => handleClick(event, row.name)}
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
													{row.name}
												</TableCell>
												<TableCell>{row.quantity}</TableCell>
												<TableCell>{row.price}</TableCell>
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
								name="radio-buttons-group"
                                row
							>
								<FormControlLabel
									value="percent"
									control={<Radio />}
									label="Percent"
								/>
								<FormControlLabel
									value="cash"
									control={<Radio />}
									label="Cash"
								/>
							</RadioGroup>
						</FormControl>
						<NumPad display size="S" />
					</DialogCard>
				</DialogBody>
				<DialogFooter>
					<Button
						title="Apply Discount"
						color="success"
						onClick={() => console.log()}
					/>
				</DialogFooter>
			</Dialog>
		</Overlay>
	) : null
}

export default DiscountSlider
