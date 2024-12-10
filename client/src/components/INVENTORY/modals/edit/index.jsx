import { Modal } from "../../../shared/modal"
import { FormProduct } from "../../form"

export const ModalEditProduct = ({ controller }) => {


	return (
		<Modal
			open={controller.open}
			title="Edit Product"
			handleClose={controller.closeModal}
		>
			<FormProduct data={controller.data} onSubmit={controller.closeModal} />
		</Modal>
	)
}
