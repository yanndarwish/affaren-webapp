import { useRef, useState, useEffect, useContext } from "react"
import {
	Dialog,
	DialogBody,
	DialogCard,
	DialogFooter,
	DialogHeader,
	Overlay,
	Wrapper,
} from "../Slider.styles"
import Tabs from "@mui/material/Tabs"
import Tab from "@mui/material/Tab"
import Box from "@mui/material/Box"
import {
	ArtTitle,
	Column,
	SpaceHeaderCenter,
	SubTitle,
} from "../../../../assets/common/common.styles"
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined"
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined"
import Button from "../../../common/Button/Button.component"
import { useDispatch, useSelector } from "react-redux"
import TableMenu from "../../Tables/TableMenu"
import {
	useDeleteProductTableMutation,
	useGetTableProductsMutation,
	usePatchProductTableMutation,
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
import {
	setUpdateOrder,
	updateTableProducts,
} from "../../../../redux/features/tableProducts"
import { WebSocketContext } from "../../../../utils/context/webSocket"
import { tableRowClasses, toolbarClasses } from "@mui/material"

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
	const ws = useContext(WebSocketContext)
	const updateOrder = useSelector((state) => state.tableProducts.updateOrder)

	const dispatch = useDispatch()
	const overlayRef = useRef()
	const [peopleSet, setPeopleSet] = useState([])
	const [value, setValue] = useState(0)
	const [table, setTable] = useState([])
	const [deleteProduct, res] = useDeleteProductTableMutation()
	const [postUpdateTableProducts, respo] = usePostTableProductMutation()
	const [patchProduct, response] = usePatchProductTableMutation()
	const [getProducts, re] = useGetTableProductsMutation()
	const tableProducts = useSelector(
		(state) => state.tableProducts.tableProducts
	)
	const dishes = useSelector((state) =>
		state.dishes.dishes.filter((dish) => dish.dish_active === "true")
	)
	const formulas = useSelector((state) =>
		state.dishes.dishes.filter(
			(dish) => dish.dish_active === "true" && dish.dish_category === "formula"
		)
	)

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

	const addProductToPerson = ({ e, formula }) => {
		let newDish
		if (formula) {
			newDish = {
				table_id: dataTable?.table_id,
				table_person: value,
				dish_id: formula.dish_id,
				dish_name: formula.dish_name,
				dish_category: formula.dish_category,
				dish_quantity: 1,
				dish_price: formula.dish_price,
				dish_taxe: formula.product_taxe,
				table_year: dataTable.table_year,
				table_month: dataTable.table_month,
				table_day: dataTable.table_day,
			}
		} else {
			const id = e.target.dataset.id
			let dish = Object.assign(
				{},
				dishes.filter((dish) => dish.dish_id === id)[0]
			)
			// create new dish
			newDish = {
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
				dish_status: "todo",
			}
		}
		// deleteProducts({ id: dataTable.table_id })
		postUpdateTableProducts({ products: [newDish] })
		ws?.sendMessage("TableProducts")
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
		ws?.sendMessage("TableProducts")
	}

	const getPeopleNumber = () => {
		if (tableProducts?.length > 0) {
			let peopleIds = [0]
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

	const hasOtherFormulas = (tableProducts) => {
		let formulas = tableProducts?.filter(
			(item) => item.dish_category === "formula"
		)
		return formulas.length > 0
	}

	const findPersonMeals = (tableProducts, value) => {
		return tableProducts?.filter((item) => item.table_person === value)
	}

	const getMealCat = (meal) => {
		if (meal.dish_category !== "beverage" && meal.dish_category !== "formula") {
			return meal.dish_category
		}
	}

	const formulaAlreadyExists = (meals, formula) => {
		let similarFormula = meals?.filter(
			(item) => item.dish_id === formula.dish_id
		)
		return similarFormula.length > 0
	}

	const findFormula = (meals, formulas) => {
		let match = 0
		let formulaMatch
		let mealsCat = JSON.stringify(meals.sort())
		// loop through all active formulas to find matches with person's meals category
		formulas.forEach((formula) => {
			let catMatch = 0
			let formulaCategories = Object.assign([], formula.dish_ingredients)
			let formulaCat = JSON.stringify(formulaCategories.sort())
			meals.forEach((cat) => {
				if (formulaCategories.includes(cat)) {
					catMatch = catMatch + 1
				}
			})

			if (
				catMatch === formulaCategories.length &&
				catMatch > match &&
				formulaCat === mealsCat
			) {
				match = catMatch
				formulaMatch = formula
			}
		})
		return formulaMatch
	}

	const deleteOldFormula = (formula) => {
		deleteProduct({
			tableId: formula.table_id,
			personId: formula.table_person,
			dishId: formula.dish_id,
		})
		ws?.sendMessage("TableProducts")
	}

	const patchProductPrice = (meal) => {
		patchProduct({
			tableId: meal.table_id,
			personId: meal.table_person,
			dishId: meal.dish_id,
		})
	}

	const checkForFomulas = () => {
		let allMeals = findPersonMeals(tableProducts, value) //including formulas and drinks
		let meals = allMeals.filter(
			(item) =>
				item.dish_category !== "beverage" && item.dish_category !== "formula"
		)
		// get categories of meals (excluding formulas and drinks)
		let dishesCat = []
		allMeals
			?.filter(
				(item) =>
					item.dish_category !== "beverage" && item.dish_category !== "formula"
			)
			.forEach((meal) => {
				dishesCat.push(getMealCat(meal))
			})
		// find matching formulas based on categories
		let foundFormula = findFormula(dishesCat, formulas)

		if (foundFormula) {
			if (formulaAlreadyExists(allMeals, foundFormula)) {
				return
			} else {
				let prevFormulas = allMeals?.filter(
					(item) => item.dish_category === "formula"
				)
				// even if has no other formula, update prices of dishes...
				meals.forEach((meal) => {
					patchProductPrice(meal)
				})
				// delete old formulas
				prevFormulas.forEach((prevFormula) => {
					deleteOldFormula(prevFormula)
				})
				// ... and create new formula
				addProductToPerson({ formula: foundFormula })
			}
		}
	}

	const handlePayment = () => {
		dispatch(updateProducts({ products: [] }))
		let array = []

		tableProducts?.forEach((dish) => {
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
						let index = array.findIndex((obj) => obj.id === found.id)
						array[index] = found
						return found
					} else {
						return product
					}
				})

				dispatch(updateProducts({ products: updated }))
			}
		})
		dispatch(setSaleTable({ table: dataTable.table_id }))
		setIsOpen(false)
		setValue(0)
	}

	useEffect(() => {
		if (dataTable?.table_id) {
			getProducts({ id: dataTable?.table_id })
		}
	}, [dataTable])

	useEffect(() => {
		if (tableProducts.length > 0) {
			getPeopleNumber()
			checkForFomulas()
		}
	}, [tableProducts])

	useEffect(() => {
		if (updateOrder) {
			getProducts({ id: dataTable?.table_id })
			dispatch(setUpdateOrder({ order: false }))
		}
	}, [updateOrder])

	return isOpen ? (
		<Overlay theme={theme} onClick={closeSlider} ref={overlayRef}>
			<Wrapper>
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
											{tableProducts
												?.filter(
													(product) => product.table_person === parseInt(id)
												)
												.map((item, i) => (
													<SpaceHeaderCenter key={id + "-" + i}>
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
													</SpaceHeaderCenter>
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
					onClick={(e) => addProductToPerson({e})}
				/>
			</Wrapper>
		</Overlay>
	) : null
}

export default TableSlider
