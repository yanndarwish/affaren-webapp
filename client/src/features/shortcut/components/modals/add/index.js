import { Modal } from "../../../../../components/shared/modal"
import { FormShortcut } from "../../forms"

export const ModalAddShortcut = ({ controller, onSuccess = () => null }) => {
	const handleSuccess = () => {
		controller.closeModal()
		onSuccess()
	}

	return (
		<Modal
			open={controller.open}
			title="Add Shortcut"
			handleClose={controller.closeModal}
			className="!w-[50vw]"
		>
			<FormShortcut onSuccess={handleSuccess} />
		</Modal>
	)
}
