import { Modal } from "../../../shared/modal"
import { FormProduct } from "../../form"

export const ModalEditProduct = ({ controller, onSubmit = () => null }) => {
	const handleSubmit = () => {
		controller.closeModal()
		onSubmit()
	}

	return (
		<Modal
			open={controller.open}
			title="Edit Product"
			handleClose={controller.closeModal}
		>
			<FormProduct data={controller.data} onSubmit={handleSubmit} />
		</Modal>
	)
}
