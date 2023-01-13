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
	Column,
	SubTitle,
	VerticalCenter,
} from "../../../../assets/styles/common.styles"
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined"
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined"
import Button from "../../../common/Button/Button.component"
import { useDispatch, useSelector } from "react-redux"
import TableMenu from "../../Tables/TableMenu"
import {
	useDeleteProductTableMutation,
	useGetTableProductsQuery,
	usePostTableProductMutation,
} from "../../../../redux/services/tableProductsApi"
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline"
import AddIcon from "@mui/icons-material/Add"
import IconButton from "@mui/material/IconButton"
import {
	addProduct,
	updateProducts,
	setSaleTable,
} from "../../../../redux/features/sale"

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
	const dispatch = useDispatch()
	const dishes = useSelector((state) =>
		state.dishes.dishes.filter((dish) => dish.dish_active === "true")
	)
	const overlayRef = useRef()
	const [peopleSet, setPeopleSet] = useState([])
	const [value, setValue] = useState(0)
	const [skip, setSkip] = useState(true)
	const { data } = useGetTableProductsQuery(
		{ id: dataTable?.table_id },
		{ skip }
	)
	const [deleteProduct, res] = useDeleteProductTableMutation()
	const [postUpdateTableProducts, respo] = usePostTableProductMutation()

	const handleChange = (event, newValue) => {
		setValue(newValue)
	}

	const closeSlider = (e) => {
		if (overlayRef.current === e.target) {
			setIsOpen(false)
			setValue(0)
		}
	}

	const close = () => {
		setIsOpen(false)
		setValue(0)
	}

	const handleAddPerson = () => {
		setPeopleSet([...peopleSet, peopleSet.length])
	}

	const addProductToPerson = (e) => {
		const id = e.target.dataset.id
		let dish = Object.assign(
			{},
			dishes.filter((dish) => dish.dish_id === id)[0]
		)
		// create new dish
		let newDish = {
			table_id: dataTable?.table_id,
			table_person: value,
			dish_id: dish.dish_id,
			dish_name: dish.dish_name,
			dish_category: dish.dish_category,
			dish_quantity: 1,
			dish_price: dish.dish_price,
			dish_taxe: dish.product_taxe,
			table_year: dataTable.table_year,
			table_month: dataTable.table_month,
			table_day: dataTable.table_day,
		}

		let copy = Object.assign([], data)
		copy.push(newDish)
		// deleteProducts({ id: dataTable.table_id })
		postUpdateTableProducts({ products: [newDish] })
	}

	const handleDelete = (e) => {
		const id = e.target.dataset.id
			? e.target.dataset.id
			: e.target.parentNode.dataset.id
		const person = e.target.dataset.person
			? e.target.dataset.person
			: e.target.parentNode.dataset.person

		deleteProduct({
			tableId: dataTable.table_id,
			personId: parseInt(person),
			dishId: id,
		})
		// dispatch(updateTableProducts(filteredOut))
	}

	const getPeopleNumber = () => {
		if (data?.length > 0) {
			let peopleIds = [0]
			data?.forEach((product) => {
				peopleIds.push(product.table_person)
			})
			let set = new Set(peopleIds)
			let array = Array.from(set).sort()
			setPeopleSet(array)
		} else {
			setPeopleSet([0])
		}
	}

	const handlePayment = () => {
		console.log(data)
		let array = []
		data?.forEach((dish) => {
			let found = array.find((product) => product.id === dish.dish_id)

			if (!found) {
				let product = {
					id: dish.dish_id,
					name: dish.dish_name,
					price: dish.dish_price,
					taxe: dish.dish_taxe,
					quantity: dish.dish_quantity,
				}
				array.push(product)
				dispatch(addProduct({ products: product }))
			} else {
				found = {
					...found,
					quantity: found.quantity + 1,
					price: (dish.dish_price * (found.quantity + 1)).toFixed(2),
				}

				const updated = array.map((product) => {
					if (product.id === found.id) {
						console.log(found)
						let index = array.findIndex((obj) => obj.id === found.id)
						array[index] = found
						return found
					} else {
						console.log(product)
						return product
					}
				})
				console.log(updated)

				dispatch(updateProducts({ products: updated }))
			}
		})
		dispatch(setSaleTable({ table: dataTable.table_id }))
		setIsOpen(false)
		setValue(0)
	}

	useEffect(() => {
		if (dataTable?.table_id) {
			setSkip(false)
		}
	}, [dataTable])

	useEffect(() => {
		getPeopleNumber()
	}, [data])

	return isOpen ? (
		<Overlay theme={theme} onClick={closeSlider} ref={overlayRef}>
			<Dialog id="dialog" theme={theme}>
				<DialogHeader>
					<SubTitle>Table {dataTable?.table_id}</SubTitle>
					<CloseOutlinedIcon onClick={() => close()} />
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
										{data
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
					<Button
						title="Go to Payment"
						color="success"
						onClick={handlePayment}
					/>
				</DialogFooter>
			</Dialog>
			<TableMenu
				isOpen={isOpen}
				setIsOpen={setIsOpen}
				theme={theme}
				onClick={addProductToPerson}
			/>
		</Overlay>
	) : null
}

export default TableSlider