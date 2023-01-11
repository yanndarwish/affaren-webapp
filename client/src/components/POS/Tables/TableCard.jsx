import { CardTitle, StyledTableCard, Trash } from "./TableCard.styles"
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline"
import { Modal } from "modal-rjs"
import { useRef, useState } from "react"

const TableCard = ({ theme, id, name, price, onClick }) => {
	const [isOpen, setIsOpen] = useState(false)
	const cardRef = useRef()
	const titleRef = useRef()
	const trashRef = useRef()

	const openModal = () => {
		setIsOpen(!isOpen)
	}

	return (
		<StyledTableCard
			ref={cardRef}
			theme={theme}
			className="table-card"
			data-id={id}
			data-name={name}
			data-price={price}
			onClick={onClick}
		>
			<CardTitle ref={titleRef}>{name}</CardTitle>
			<Trash data-id={id} data-name={name}>
				<DeleteOutlineIcon
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
			/>
		</StyledTableCard>
	)
}

export default TableCard
