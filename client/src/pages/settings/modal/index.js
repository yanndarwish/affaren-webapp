import { useNavigate } from "react-router-dom"
import { Modal } from "../../../components/shared/modal"
import { ShortcutSettings } from "../shortcut"
import { CalendarSettings } from "../calendar"

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
			{component.name === "shortcuts" && <ShortcutSettings />}
			{component.name === "calendar" && <CalendarSettings />}
		</Modal>
	)
}
