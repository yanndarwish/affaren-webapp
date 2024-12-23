import { useNavigate } from "react-router-dom"
import { Modal } from "../../../shared/modal"
import { FormProduct } from "../../form"

export const ModalCreateProduct = ({ controller, onSuccess = () => null }) => {
	const navigate = useNavigate()

	const handleClose = () => {
		controller.closeModal()
		navigate("/inventory")
	}

	const handleSubmit = () => {
		controller.closeModal()
		onSuccess()
	}

	return (
		<Modal
			open={controller.open}
			title="Create Product"
			handleClose={handleClose}
		>
			<FormProduct onSubmit={handleSubmit} />
		</Modal>
	)
}
