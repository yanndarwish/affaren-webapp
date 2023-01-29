import { usePatchTableProductsStatusMutation } from "../../../../redux/services/tableProductsApi"
import { useUpdateTableStatusMutation } from "../../../../redux/services/tablesApi"
import Button from "../../../common/Button/Button.component"
import { Modal } from "modal-rjs"
import { useState } from "react"
import InfoMessage from "../../../common/InfoMessage/InfoMessage"
import {
	ArtTitle,
	SpaceHeaderCenter,
} from "../../../../assets/common/common.styles"

const TablePaid = ({ setIsOpen, tableId }) => {
	const [updateProducts, response] = usePatchTableProductsStatusMutation()
	const [updateTable, res] = useUpdateTableStatusMutation()
	const [modalIsOpen, setModalIsOpen] = useState(false)

	const handleModal = () => {
		setModalIsOpen(!modalIsOpen)
	}

	const handleClose = () => {
		setModalIsOpen(!modalIsOpen)
		setIsOpen(false)
	}

	const handleUpdate = () => {
		updateTable({
			id: tableId,
			payload: {
				table_status: "paid",
			},
		})
		updateProducts({ tableId: tableId })
	}

	const ModalBody = () => {
		return res.isError ? (
			<InfoMessage state="error" text="Failed to update table status" />
		) : res.isSuccess ? (
			<InfoMessage state="success" text="Table marked as paid" />
		) : (
			<ArtTitle>
				Are you sure you want to mark this table as paid ? This will close the
				table and remove it from today's open tables.
			</ArtTitle>
		)
	}

	const ModalFooter = () => {
		return res.isSuccess ? (
			<Button title="Close" color="success" onClick={handleClose} />
		) : (
			<SpaceHeaderCenter>
				<Button title="Cancel" color="error" onClick={handleModal} />
				<Button title="Confirm" color="success" onClick={handleUpdate} />
			</SpaceHeaderCenter>
		)
	}
	return (
		<>
			<Button title="Close Table" onClick={handleModal} />
			<Modal
				title="Close Table"
				isOpen={modalIsOpen}
				setIsOpen={setModalIsOpen}
				bodyContent={<ModalBody />}
				footerContent={<ModalFooter />}
			/>
		</>
	)
}

export default TablePaid
