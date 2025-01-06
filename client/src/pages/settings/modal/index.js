import { useNavigate } from "react-router-dom"
import { Modal } from "../../../components/shared/modal"
import { ShortcutSettings } from "../shortcut"

export const ModalComponentSettings = ({ component, controller }) => {
	const navigate = useNavigate()
    
	const handleClose = () => {
		controller.closeModal()
		navigate("/settings")
	}
	return (
		<Modal
			title={`${component.label} Settings`}
			open={controller.open}
			handleClose={handleClose}
		>
			{component.name === "shortcuts" ? (
				<ShortcutSettings />
			) : (
				<div>ModalComponentSettings</div>
			)}
		</Modal>
	)
}
