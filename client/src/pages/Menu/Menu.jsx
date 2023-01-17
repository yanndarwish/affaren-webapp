import React, { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import {
	ArtTitle,
	Column,
	Container,
	Gap,
	SpaceHeader,
	Title,
} from "../../assets/common/common.styles"
import Button from "../../components/common/Button/Button.component"
import InfoMessage from "../../components/common/InfoMessage/InfoMessage"
import MenuFilter from "../../components/MENU/MenuFilter"
import MenuTable from "../../components/MENU/MenuTable"
import {
	useDeleteDishMutation,
	useGetDishesQuery,
} from "../../redux/services/dishApi"
import CreateDishSlider from "../../components/MENU/Sliders/CreateDishSlider"
import EditDishSlider from "../../components/MENU/Sliders/EditDishSlider"
import { Modal } from "modal-rjs"
import CreateFormulaSlider from "../../components/MENU/Sliders/CreateFormulaSlider"
import EditFormulaSlider from "../../components/MENU/Sliders/EditFormulaSlider"

const Menu = () => {
	const loggedIn = useSelector((state) => state.login.loggedIn)
	const theme = useSelector((state) => state.theme.theme)
	const dishes = useSelector((state) => state.dishes.dishes)
	const [deleteIsOpen, setDeleteIsOpen] = useState(false)
	const [createIsOpen, setCreateIsOpen] = useState(false)
	const [createFormulaIsOpen, setCreateFormulaIsOpen] = useState(false)
	const [editIsOpen, setEditIsOpen] = useState(false)
	const [editFormulaIsOpen, setEditFormulaIsOpen] = useState(false)
	const [selected, setSelected] = useState({})
	const [deleteDish, res] = useDeleteDishMutation()

	const navigate = useNavigate()

	const { isError } = useGetDishesQuery()

	const redirect = () => {
		!loggedIn && navigate("/login")
	}

	const openCreateSlide = () => {
		setCreateIsOpen(!createIsOpen)
	}

	const openCreateFormulaSlide = () => {
		setCreateFormulaIsOpen(!createIsOpen)
	}

	const openEdit = (e) => {
		const id = e.target.dataset.id
			? e.target.dataset.id
			: e.target.parentNode.dataset.id
		setSelected(dishes.filter((dish) => dish.dish_id === id)[0])
		setEditIsOpen(!editIsOpen)
	}

	const openEditFormula = (e) => {
		const id = e.target.dataset.id
			? e.target.dataset.id
			: e.target.parentNode.dataset.id
		setSelected(dishes.filter((dish) => dish.dish_id === id)[0])
		setEditFormulaIsOpen(!editIsOpen)
	}

	const openDelete = (e) => {
		res.reset()
		const id = e.target.dataset.id
			? e.target.dataset.id
			: e.target.parentNode.dataset.id
		setSelected(dishes.filter((dish) => dish.dish_id === id)[0])
		setDeleteIsOpen(!deleteIsOpen)
	}

	const handleDelete = () => {
		deleteDish({ id: selected.dish_id })
	}

	const ModalBody = () => {
		return res.isError ? (
			<InfoMessage state="error" text="Failed to delete the dish" />
		) : res.isSuccess ? (
			<InfoMessage state="success" text="Dish deleted successfully" />
		) : (
			<ArtTitle>
				Are you sure you want to delete {selected.dish_name} from the menu ?
			</ArtTitle>
		)
	}

	const ModalFooter = () => {
		return (
			<SpaceHeader>
				<Button
					title="Cancel"
					color="error"
					onClick={() => setDeleteIsOpen(!deleteIsOpen)}
				/>
				<Button title="Delete" color="success" onClick={handleDelete} />
			</SpaceHeader>
		)
	}

	useEffect(() => {
		redirect()
	}, [])

	return (
		<Container theme={theme}>
			<SpaceHeader>
				<Title>Menu</Title>
				<Gap>
					<Button title="Create Formula" onClick={openCreateFormulaSlide} />
					<Button title="Create Dish" onClick={openCreateSlide} />
				</Gap>
			</SpaceHeader>
			{isError ? (
				<InfoMessage state="error" text="Failed to load the menu" />
			) : (
				<Column>
					<MenuFilter />
					<MenuTable
						openDelete={openDelete}
						openEdit={openEdit}
						openEditFormula={openEditFormula}
					/>
				</Column>
			)}
			<CreateDishSlider
				isOpen={createIsOpen}
				setIsOpen={setCreateIsOpen}
				theme={theme}
			/>
			<CreateFormulaSlider
				isOpen={createFormulaIsOpen}
				setIsOpen={setCreateFormulaIsOpen}
				theme={theme}
			/>
			{Object.keys(selected).length > 0 && (
				<EditDishSlider
					isOpen={editIsOpen}
					setIsOpen={setEditIsOpen}
					theme={theme}
					dish={selected}
					setDish={setSelected}
				/>
			)}
			{Object.keys(selected).length > 0 && (
				<EditFormulaSlider
					isOpen={editFormulaIsOpen}
					setIsOpen={setEditFormulaIsOpen}
					theme={theme}
					dish={selected}
					setDish={setSelected}
				/>
			)}
			<Modal
				title="Delete"
				isOpen={deleteIsOpen}
				setIsOpen={setDeleteIsOpen}
				bodyContent={<ModalBody />}
				footerContent={res.isUninitialized && <ModalFooter />}
			/>
		</Container>
	)
}

export default Menu
