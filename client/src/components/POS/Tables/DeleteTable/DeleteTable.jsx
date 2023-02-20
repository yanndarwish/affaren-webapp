import Button from "../../../common/Button/Button.component"
import InfoMessage from "../../../common/InfoMessage/InfoMessage"
import { useDeleteTableMutation } from "../../../../redux/services/tablesApi"
import { useDeleteTableProductsMutation } from "../../../../redux/services/tableProductsApi"
import { Modal } from "modal-rjs"
import { useContext, useState } from "react"
import {
	ArtTitle,
	SpaceHeaderCenter,
} from "../../../../assets/common/common.styles"
// import { WebSocketContext } from "../../../../utils/context/webSocket"
import { setLunchUpdate } from "../../../../redux/features/tableProducts"
import { useDispatch } from "react-redux"

const DeleteTable = ({ tableId, setIsOpen }) => {
	// const ws = useContext(WebSocketContext)
	const dispatch = useDispatch()
	const [deleteTable, res] = useDeleteTableMutation()
	const [deleteProducts, response] = useDeleteTableProductsMutation()
	const [modalIsOpen, setModalIsOpen] = useState(false)

	const handleDelete = () => {
		deleteTable({ id: tableId })
		deleteProducts({ id: tableId })
		res.isSuccess && response.isSuccess && setIsOpen(false)
		res.reset()
		response.reset()
		// ws?.sendMessage({
		// 	type: "lunch",
		// 	action: "table deletion",
		// })
		dispatch(setLunchUpdate())
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
		) : res.isSuccess && response.isSuccess ? (
			<InfoMessage state="success" text="Table deleted successfully" />
		) : response.isError ? (
			<InfoMessage state="error" text="Failed to delete products" />
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
