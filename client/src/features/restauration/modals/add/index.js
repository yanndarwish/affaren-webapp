import { Modal } from "../../../../components/shared/modal"
import { FormAddTable } from "../../forms/add"

export const ModalAddTable = ({ controller }) => {
	return (
		<Modal
			title="Add Table"
			open={controller.open}
			handleClose={controller.closeModal}
		>
			<FormAddTable
				onSuccess={controller.closeModal}
				onCancel={controller.closeModal}
			/>
		</Modal>
	)
}
