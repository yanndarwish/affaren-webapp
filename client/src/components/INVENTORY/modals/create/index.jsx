import { Modal } from "../../../shared/modal"
import { FormProduct } from "../../form"

export const ModalCreateProduct = ({ controller }) => {
	return (
		<Modal
			open={controller.open}
			title="Create Product"
			handleClose={controller.closeModal}
		>
			<FormProduct onSubmit={controller.closeModal} />
		</Modal>
	)
}
