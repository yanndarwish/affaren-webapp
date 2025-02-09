import { Modal } from "../../../../components/shared/modal"

export const ModalAddProduct = ({ controller }) => {
	return (
		<Modal
			title="Create new product"
			open={controller.open}
			handleClose={controller.closeModal}
		></Modal>
	)
}
