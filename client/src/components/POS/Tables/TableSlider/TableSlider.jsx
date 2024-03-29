import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined"
import { useRef, useState, useEffect, useContext } from "react"
import { useDispatch, useSelector } from "react-redux"
import {
	Dialog,
	DialogBody,
	DialogCard,
	DialogFooter,
	DialogHeader,
	Overlay,
	Wrapper,
} from "../../Sliders/Slider.styles"
import { ArtTitle, SubTitle } from "../../../../assets/common/common.styles"
import TableMenu from "../TableMenu"
import {
	useDeleteProductTableMutation,
	usePatchProductTableMutation,
	usePostTableProductMutation,
	useGetActiveTablesProductsMutation,
} from "../../../../redux/services/tableProductsApi"
// import { WebSocketContext } from "../../../../utils/context/webSocket"
import TablePayment from "../TablePayment/TablePayment"
import TableProducts from "../TableProducts/TableProducts"
import DeleteTable from "../DeleteTable/DeleteTable"
import TablePaid from "../TablePaid/TablePaid"
import InfoMessage from "../../../common/InfoMessage/InfoMessage"
import { setLunchUpdate } from "../../../../redux/features/tableProducts"

const TableSlider = ({ theme, isOpen, setIsOpen, dataTable }) => {
	const dispatch = useDispatch()
	// const ws = useContext(WebSocketContext)
	const overlayRef = useRef()
	const [peopleSet, setPeopleSet] = useState([])
	const [value, setValue] = useState(0)
	const [table, setTable] = useState([])
	const [deleteProduct, res] = useDeleteProductTableMutation()
	const [postUpdateTableProducts, respo] = usePostTableProductMutation()
	const [patchProduct, response] = usePatchProductTableMutation()
	const [getActiveDishes, r] = useGetActiveTablesProductsMutation()
	const lunchUpdate = useSelector((state) => state.tableProducts.lunchUpdate)
	const dishes = useSelector((state) =>
		state.dishes.dishes.filter((dish) => dish.dish_active === "true")
	)
	const activeDishes = useSelector(
		(state) => state.tableProducts.activeTablesProducts
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
			dish_status: "waiting",
			table_number: dataTable.table_number,
		}

		postUpdateTableProducts({ products: [newDish] })

		// ws?.sendMessage({
		// 	type: "lunch",
		// 	action: "add",
		// })

		dispatch(setLunchUpdate())

	}

	const handleDelete = (e) => {
		const id = e.target.dataset.id
			? e.target.dataset.id
			: e.target.parentNode.dataset.id
		let person = e.target.dataset.person
			? e.target.dataset.person
			: e.target.parentNode.dataset.person
		person = parseInt(person)

		deleteProduct({
			tableId: dataTable.table_id,
			personId: person,
			dishId: id,
		})

		// ws?.sendMessage({
		// 	type: "lunch",
		// 	action: "remove",
		// })

		dispatch(setLunchUpdate())
	}

	const getPeopleNumber = () => {
		if (table?.length > 0) {
			let peopleIds = [0]
			table?.forEach((product) => {
				peopleIds.push(product.table_person)
			})
			let set = new Set(peopleIds)
			let array = Array.from(set).sort()
			setPeopleSet(array)
			if (value > 0) {
				if (table.filter((item) => item.table_person === value).length === 0) {
					setValue(0)
				}
			}
		} else {
			setPeopleSet([0])
		}
	}

	const findPersonMeals = (table, value) => {
		return table?.filter((item) => item.table_person === value)
	}

	const checkSalmon = (meals) => {
		let containsSalmon = false
		meals
			.filter((item) => item.dish_category === "main")
			.forEach((meal) => {
				if (meal.dish_name.toLowerCase().includes("saumon")) {
					containsSalmon = true
				}
			})

		return containsSalmon
	}

	const getMealCat = (meal) => {
		if (meal.dish_category !== "beverage" && meal.dish_category !== "formula") {
			return meal.dish_category
		}
	}

	// const formulaAlreadyExists = (meals, formula) => {
	// 	let similarFormula = meals?.filter(
	// 		(item) => item.dish_id === formula.dish_id
	// 	)
	// 	return similarFormula.length > 0
	// }

	const findFormula = (meals, formulas, hasSalmon) => {
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
			if (
				formulaCat === mealsCat &&
				formula.dish_name.toLowerCase().includes("saumon") &&
				hasSalmon
			) {
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
	}

	const patchProductPrice = (meal) => {
		patchProduct({
			tableId: meal.table_id,
			personId: meal.table_person,
			dishId: meal.dish_id,
		})
	}

	const addFormula = (formula) => {
		let newFormula = {
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
			table_number: dataTable.table_number,
		}

		postUpdateTableProducts({ products: [newFormula] })

		// ws?.sendMessage({
		// 	type: "lunch",
		// 	action: "formula",
		// })
		dispatch(setLunchUpdate())
	}

	const checkForFormulas = () => {
		let allMeals = findPersonMeals(table, value)
		let meals = allMeals?.filter(
			(item) =>
				item.dish_category !== "drink" && item.dish_category !== "formula"
		)

		let prevFormulas = allMeals?.filter(
			(item) => item.dish_category === "formula"
		)
		prevFormulas?.forEach((prevFormula) => {
			deleteOldFormula(prevFormula)
		})

		if (meals[0]?.dish_status !== "paid") {
			let dishesCat = []
			meals.forEach((meal) => {
				dishesCat.push(getMealCat(meal))
			})

			let foundFormula = findFormula(dishesCat, formulas, checkSalmon(meals))
			if (foundFormula) {
				meals.forEach((meal) => {
					patchProductPrice(meal)
				})
				// 100ms delay to prevent data from being refetched before all updates are done
				setTimeout(() => {
					addFormula(foundFormula)
				}, 100)
			}
		}
	}

	useEffect(() => {
		setTimeout(() => {
			getActiveDishes()
		}, 50)
	}, [lunchUpdate])

	useEffect(() => {
		if (dataTable?.table_id) {
			setTable(
				activeDishes
					?.filter((item) => item.table_id === dataTable?.table_id)
					.sort((a, b) => a.dish_category - b.dish_category)
			)
		}
	}, [activeDishes])

	useEffect(() => {
		getPeopleNumber()
	}, [table])

	return isOpen ? (
		<Overlay theme={theme} onClick={closeSlider} ref={overlayRef}>
			<Wrapper>
				<Dialog id="dialog" theme={theme}>
					<DialogHeader>
						<SubTitle>Table {dataTable?.table_number}</SubTitle>
						<DeleteTable tableId={dataTable?.table_id} setIsOpen={setIsOpen} />

						<CloseOutlinedIcon onClick={() => close()} />
					</DialogHeader>
					<DialogBody>
						<ArtTitle>Detail</ArtTitle>
						<DialogCard theme={theme}>
							<TableProducts
								theme={theme}
								table={table}
								value={value}
								peopleSet={peopleSet}
								handleChange={handleChange}
								handleDelete={handleDelete}
								handleAddPerson={handleAddPerson}
								applyFormula={checkForFormulas}
							/>
							{res.isError && (
								<InfoMessage state="error" text="Failed to delete product" />
							)}
							{respo.isError && (
								<InfoMessage state="error" text="Failed to create product" />
							)}
							{response.isError && (
								<InfoMessage state="error" text="Failed to update product" />
							)}
						</DialogCard>
					</DialogBody>
					<DialogFooter>
						<TablePayment
							table={table}
							setIsOpen={setIsOpen}
							value={value}
							setValue={setValue}
						/>
					</DialogFooter>
					<TablePaid setIsOpen={setIsOpen} tableId={dataTable?.table_id} />
				</Dialog>
				<TableMenu
					isOpen={isOpen}
					setIsOpen={setIsOpen}
					theme={theme}
					onClick={(e) => addProductToPerson({ e })}
				/>
			</Wrapper>
		</Overlay>
	) : null
}

export default TableSlider
