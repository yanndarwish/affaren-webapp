import { Button } from "../../../../../components/ui/button"
import { Modal } from "../../../../../components/shared/modal"

import { FormShortcut } from "../../forms"
import { ModalDeleteShortcut } from "../delete"
import { useShortcuts } from "../../../hooks/use-shortcuts"

export const ModalUpdateShortcut = ({ controller, onSuccess = () => null }) => {
	const card = controller.data
	const { modalDelete, handleConfirmDelete } = useShortcuts({
		onSuccess,
	})

	const handleDelete = () => {
		modalDelete.setData(card)
		modalDelete.openModal()
	}

	const handleSuccess = () => {
		controller.closeModal()
		onSuccess()
	}

	return (
		<Modal
			open={controller.open}
			title="Update Card"
			handleClose={controller.closeModal}
			className="!w-[50vw]"
			topRight={
				<Button variant="destructive" onClick={handleDelete}>
					Delete
				</Button>
			}
		>
			<FormShortcut card={card} onSuccess={handleSuccess} />
			<ModalDeleteShortcut
				controller={modalDelete}
				onConfirm={() => handleConfirmDelete(card)}
			/>
		</Modal>
	)
}
