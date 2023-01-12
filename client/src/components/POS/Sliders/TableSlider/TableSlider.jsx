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
	Column,
	ColumnCenter,
	ErrorMessage,
	SpaceHeader,
	SubTitle,
	VerticalCenter,
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
import {
	useDeleteTableProductsMutation,
	useGetTableProductsQuery,
	usePostTableProductMutation,
} from "../../../../redux/services/tableProductsApi"
import { updateTableProducts } from "../../../../redux/features/tableProducts"
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline"
import AddIcon from "@mui/icons-material/Add"
import IconButton from "@mui/material/IconButton"

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

const TableSlider = ({ theme, isOpen, setIsOpen, dataTable }) => {
	const dishes = useSelector((state) =>
		state.dishes.dishes.filter((dish) => dish.dish_active === "true")
	)
	const tableProducts = useSelector(
		(state) => state.tableProducts.tableProducts
	)
	const overlayRef = useRef()
	const dispatch = useDispatch()
	const [table, setTable] = useState(dataTable)
	const [peopleSet, setPeopleSet] = useState([])
	const [value, setValue] = useState(0)
	const [skip, setSkip] = useState(true)
	const [postUpdate, res] = useUpdateTableMutation()
	useGetTableProductsQuery({ id: table?.table_id }, { skip })
	const [deleteProducts, resp] = useDeleteTableProductsMutation()
	const [postUpdateTableProducts, respo] = usePostTableProductMutation()

	const handleChange = (event, newValue) => {
		setValue(newValue)
	}

	const closeSlider = (e) => {
		if (overlayRef.current === e.target) {
			setIsOpen(false)
		}
	}

	const handleAddPerson = () => {
		console.log("add person")
		console.log(peopleSet)
		console.log(peopleSet.length)
		setPeopleSet([...peopleSet, peopleSet.length])
		// setValue(value)
	}

	const updateTable = () => {
		let products = tableProducts

		deleteProducts({ id: table.table_id })
		postUpdateTableProducts({ products: products })
		setIsOpen(!isOpen)
	}

	const addProduct = (e) => {
		const id = e.target.dataset.id
		let dish = Object.assign(
			{},
			dishes.filter((dish) => dish.dish_id === id)[0]
		)
		// check if dish is already in the persons array and update qty

		// create new dish
		let newDish = {
			table_id: table.table_id,
			table_person: value,
			dish_id: dish.dish_id,
			dish_name: dish.dish_name,
			dish_category: dish.dish_category,
			dish_quantity: 1,
			dish_price: dish.dish_price,
			dish_taxe: dish.product_taxe,
			table_year: table.table_year,
			table_month: table.table_month,
			table_day: table.table_day,
		}

		let copy = Object.assign([], tableProducts)
		copy.push(newDish)
		dispatch(updateTableProducts(copy))
	}

	const handleDelete = (e) => {
		const id = e.target.dataset.id
			? e.target.dataset.id
			: e.target.parentNode.dataset.id
		const person = e.target.dataset.person
			? e.target.dataset.person
			: e.target.parentNode.dataset.person
		const filteredOut = tableProducts.filter(
			(product) =>
				product.dish_id !== id || product.table_person !== parseInt(person)
		)

		dispatch(updateTableProducts(filteredOut))
	}

	const getPeopleNumber = () => {

		console.log("get people number")
		console.log(peopleSet)
		console.log(value)
		console.log(tableProducts)
		if (tableProducts.length > 0) {
			let peopleIds = [0]
			setSkip(true)
			tableProducts?.forEach((product) => {
				peopleIds.push(product.table_person)
			})
			let set = new Set(peopleIds)
			let array = Array.from(set).sort()
			setPeopleSet(array)
		} else {
			setPeopleSet([0])
		}
	}
	useEffect(() => {
		setTable(dataTable)
	}, [dataTable])

	useEffect(() => {
		getPeopleNumber()
	}, [tableProducts])

	useEffect(() => {
		if (table?.table_id) {
			getPeopleNumber()
			setSkip(false)
		}
	}, [table])
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
								height: 300,
								borderBottom: 1,
								borderColor: "divider",
								overflow: "scroll",
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
								{peopleSet?.map((id, i) => (
									<Tab
										label={<PersonOutlineOutlinedIcon />}
										{...a11yProps(i)}
										key={i + "tab"}
									/>
								))}
								<Tab label={<AddIcon />} onClick={handleAddPerson} />
							</Tabs>
							{peopleSet?.map((id, i) => (
								<TabPanel value={value} index={i} key={i + "panel"}>
									<Column>
										{tableProducts
											?.filter(
												(product) => product.table_person === parseInt(id)
											)
											.map((item, i) => (
												<VerticalCenter key={id + "-" + i}>
													<h3>{item.dish_name}</h3>
													<h3>{item.dish_price} €</h3>
													<IconButton
														aria-label="delete"
														color="error"
														data-id={item.dish_id}
														data-person={id}
														onClick={handleDelete}
													>
														<DeleteOutlineIcon
															data-id={item.dish_id}
															data-person={id}
														/>
													</IconButton>
												</VerticalCenter>
											))}
									</Column>
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
