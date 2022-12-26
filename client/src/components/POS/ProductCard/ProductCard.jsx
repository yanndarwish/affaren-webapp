import {
	CardTitle,
	StyledProductCard,
	Trash,
} from "./ProductCard.styles"
import { useRef, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { addProduct, updateProducts } from "../../../redux/features/sale"
import { Modal } from "modal-rjs"
import "../../common/Modal/modal.css"
import Button from "../../common/Button/Button.component"
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined"
import { useDeleteCardMutation } from "../../../redux/services/cardApi"

const ProductCard = ({ id, name, image, price, taxe, theme, onDelete }) => {
	const products = useSelector((state) => state.sale.products)
	const dispatch = useDispatch()
	const cardRef = useRef()
	const titleRef = useRef()
	const trashRef = useRef()
	const [isOpen, setIsOpen] = useState(false)
	const [deleteItem, setDeleteItem] = useState({})
	const [deleteCard, res] = useDeleteCardMutation()

	const handleClick = (e) => {
		if (cardRef.current === e.target || titleRef.current === e.target) {
			const { id, name, price, taxe } =
				e.target === titleRef.current
					? e.target.parentNode.dataset
					: e.target.dataset
			const data = {
				id: id,
				name: name,
				price: price,
				taxe: taxe,
			}

			console.log(data)
			let found = products.find((product) => product.id === data.id)

			if (!found) {
				let product = {
					id: data.id,
					name: data.name,
					price: parseFloat(data.price),
					taxe: data.taxe,
					quantity: 1,
				}
				dispatch(addProduct({ products: product }))
			} else {
				found = {
					...found,
					quantity: found.quantity + 1,
					price: (data.price * (found.quantity + 1)).toFixed(2),
				}

				const updated = products.map((product) => {
					if (product.id === found.id) {
						return found
					} else {
						return product
					}
				})

				dispatch(updateProducts({ products: updated }))
			}
		}
	}

	const openModal = (e) => {
		let targetId =
			trashRef.current === e.target
				? e.target.dataset.id
				: e.target.parentNode.dataset.id
		let targetName =
			trashRef.current === e.target
				? e.target.dataset.name
				: e.target.parentNode.dataset.name

		setDeleteItem({ id: targetId, name: targetName })
		setIsOpen(true)
	}

	const handleDelete = () => {
		deleteCard({ id: deleteItem.id })
		onDelete(deleteItem.id)
		setIsOpen(false)
	}

	const ModalContent = () => {
		return <p>Are you sure you want to delete the card {deleteItem.name} ?</p>
	}

	const ModalFooter = () => {
		return <Button title="Delete" onClick={handleDelete}></Button>
	}

	return (
		<StyledProductCard
			ref={cardRef}
			theme={theme}
			className="product-card"
			data-id={id}
			data-name={name}
			data-price={price}
			data-taxe={taxe}
			onClick={handleClick}
		>
			<CardTitle ref={titleRef}>{name}</CardTitle>
			<Trash data-id={id} data-name={name}>
				<DeleteOutlinedIcon
					data-id={id}
					data-name={name}
					onClick={openModal}
					ref={trashRef}
				/>
			</Trash>
			<Modal
				isOpen={isOpen}
				setIsOpen={setIsOpen}
				title="Delete Card"
				bodyContent={<ModalContent />}
				footerContent={<ModalFooter />}
			/>
		</StyledProductCard>
	)
}

export default ProductCard
