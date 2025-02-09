import { Modal } from "../../../../components/shared/modal"

export const ModalAddReservation = ({ controller }) => {
	return (
		<Modal
			title="Add reservation"
			open={controller.open}
			handleClose={controller.closeModal}
		>
			{/* ADD event FORM with type reservation */}
		</Modal>
	)
}
