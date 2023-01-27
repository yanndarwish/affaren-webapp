import Button from "../../../common/Button/Button.component"
import InfoMessage from "../../../common/InfoMessage/InfoMessage"
import { useDeleteTableMutation } from "../../../../redux/services/tablesApi"
import { Modal } from "modal-rjs"
import { useState } from "react"
import {
	ArtTitle,
	SpaceHeaderCenter,
} from "../../../../assets/common/common.styles"

const DeleteTable = ({ tableId, setIsOpen }) => {
	const [deleteTable, res] = useDeleteTableMutation()
	const [modalIsOpen, setModalIsOpen] = useState(false)

	const handleDelete = () => {
		deleteTable({ id: tableId })
		res.isSuccess && setIsOpen(false)
		res.reset()
	}

	const handleModal = () => {
		setModalIsOpen(!modalIsOpen)
	}

	const closeTable = () => {
		setModalIsOpen(!modalIsOpen)
		setIsOpen(false)
	}

	const ModalBody = () => {
		return res.isError ? (
			<InfoMessage state="error" text="Failed to delete table" />
		) : res.isSuccess ? (
			<InfoMessage state="success" text="Table deleted successfully" />
		) : (
			<ArtTitle>Are you sure you want to delete table {tableId} ?</ArtTitle>
		)
	}

	const ModalFooter = () => {
		return res.isSuccess ? (
			<Button title="Close" color="success" onClick={closeTable} />
		) : (
			<SpaceHeaderCenter>
				<Button title="Cancel" color="error" onClick={handleModal} />
				<Button title="Delete" color="success" onClick={handleDelete} />
			</SpaceHeaderCenter>
		)
	}

	return (
		<>
			<Button title="Delete Table" onClick={handleModal} />
			<Modal
				isOpen={modalIsOpen}
				setIsOpen={setModalIsOpen}
				bodyContent={<ModalBody />}
				footerContent={<ModalFooter />}
			/>
		</>
	)
}

export default DeleteTable
