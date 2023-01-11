import { useRef, useState, useEffect } from "react"
import {
	Dialog,
	DialogBody,
	DialogCard,
	DialogFooter,
	DialogHeader,
	Overlay,
} from "../Slider.styles"
import Tabs from "@mui/material/Tabs"
import Tab from "@mui/material/Tab"
import Box from "@mui/material/Box"
import {
	ArtTitle,
	CloseColumn,
	ColumnCenter,
	ErrorMessage,
	SpaceHeader,
	SubTitle,
} from "../../../../assets/styles/common.styles"
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined"
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined"
import Button from "../../../common/Button/Button.component"
import NumPad from "../../../common/NumPad/NumPad"
import { useSelector, useDispatch } from "react-redux"
import {
	setSalePaymentMethods,
	setSaleDate,
	resetSale,
	setUser,
} from "../../../../redux/features/sale"
import {
	usePostSaleProductsMutation,
	usePostSaleMutation,
} from "../../../../redux/services/salesApi"
import { useUpdateProductsMutation } from "../../../../redux/services/productsApi"
import { usePostPrintMutation } from "../../../../redux/services/printApi"
import { usePostDrawerMutation } from "../../../../redux/services/printApi"
import { Modal } from "modal-rjs"
import InfoMessage from "../../../common/InfoMessage/InfoMessage"
import TableMenu from "../../Tables/TableMenu"
import table from "../../../../redux/features/table"
import { current } from "@reduxjs/toolkit"
import { useUpdateTableMutation } from "../../../../redux/services/tablesApi"

function TabPanel(props) {
	const { children, value, index, ...other } = props

	return (
		<div
			role="tabpanel"
			hidden={value !== index}
			id={`simple-tabpanel-${index}`}
			aria-labelledby={`simple-tab-${index}`}
			{...other}
		>
			{value === index && (
				<Box sx={{ p: 3 }}>
					<Box>{children}</Box>
				</Box>
			)}
		</div>
	)
}

function a11yProps(index) {
	return {
		id: `simple-tab-${index}`,
		"aria-controls": `simple-tabpanel-${index}`,
	}
}

const TableSlider = ({ theme, isOpen, setIsOpen, data }) => {
	const dishes = useSelector((state) =>
		state.dishes.dishes.filter((dish) => dish.dish_active === "true")
	)
	const overlayRef = useRef()
	const dispatch = useDispatch()
	const [table, setTable] = useState(data)
	const [value, setValue] = useState(0)
	const [postUpdate, res] = useUpdateTableMutation()

	const handleChange = (event, newValue) => {
		setValue(newValue)
	}

	const closeSlider = (e) => {
		if (overlayRef.current === e.target) {
			setIsOpen(false)
		}
	}

	const updateTable = () => {
		console.log("update table")
	}

	const addProduct = (e) => {
		const id = e.target.dataset.id
		let dish = Object.assign(
			{},
			dishes.filter((dish) => dish.dish_id === id)[0]
		)

		let copyTableProducts = Object.assign([], table?.table_products)
		let copyTableProductsSpec = Object.assign([], table?.table_products[value])
		console.log(copyTableProductsSpec)
		copyTableProductsSpec.push(dish)
		copyTableProducts[value] = copyTableProductsSpec
		console.log(copyTableProducts)
		setTable({...table, table_products: copyTableProducts})
	}

	console.log(table)
	useEffect(() => {
		setTable(data)
	}, [data])
	return isOpen ? (
		<Overlay theme={theme} onClick={closeSlider} ref={overlayRef}>
			<Dialog id="dialog" theme={theme}>
				<DialogHeader>
					<SubTitle>Table {table?.table_id}</SubTitle>
					<CloseOutlinedIcon onClick={() => setIsOpen(false)} />
				</DialogHeader>
				<DialogBody>
					<ArtTitle>Detail</ArtTitle>
					<DialogCard theme={theme}>
						<Box
							sx={{
								flexGrow: 1,
								bgcolor: "background.paper",
								display: "flex",
								height: 224,
								borderBottom: 1,
								borderColor: "divider",
							}}
						>
							<Tabs
								id="tabs"
								orientation="vertical"
								value={value}
								onChange={handleChange}
								variant="scrollable"
								aria-label="basic tabs example"
							>
								{table?.table_products?.map((person, i) => (
									<Tab
										label={<PersonOutlineOutlinedIcon />}
										{...a11yProps(i)}
										key={i + "tab"}
									/>
								))}
								{/* <Tab label={<CreditCardOutlinedIcon />} {...a11yProps(1)} />
								<Tab label={<SellOutlinedIcon />} {...a11yProps(2)} /> */}
							</Tabs>
							{table?.table_products?.map((person, i) => (
								<TabPanel value={value} index={i} key={i + "panel"}>
									{person?.map((item, i) => (
										<CloseColumn key={i + "item"}>
											<p>{item.dish_name}</p>
											<p>{item.dish_price}</p>
										</CloseColumn>
									))}
								</TabPanel>
							))}
						</Box>
					</DialogCard>
				</DialogBody>
				<DialogFooter>
					<Button title="Apply" color="success" onClick={updateTable} />
				</DialogFooter>
			</Dialog>
			<TableMenu
				isOpen={isOpen}
				setIsOpen={setIsOpen}
				theme={theme}
				onClick={addProduct}
			/>
		</Overlay>
	) : null
}

export default TableSlider
