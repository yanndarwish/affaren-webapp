import { useNavigate } from "react-router-dom"

import { useSession } from "../../lib/hooks/useSession"

import { Modal } from "../../components/shared/modal"
import { Button } from "../../components/ui/button"
import { Stack } from "@mui/material"

export const ModalLogout = ({
	controller,
	onCancel = () => null,
	onLogout = () => null,
}) => {
	const { logout } = useSession()
	const navigate = useNavigate()

	const handleLogout = () => {
		controller.closeModal()
		logout()
		navigate("/login")
		onLogout()
	}

	const handleCancel = () => {
		controller.closeModal()
		onCancel()
	}

	return (
		<Modal open={controller.open} handleClose={handleCancel} title="Logout">
			<Stack direction="column" spacing={4}>
				<p className="text-center text-lg font-medium text-gray-900">
					Are you sure you want to logout ?
				</p>
				<Stack direction="row" spacing={2}>
					<Button onClick={handleCancel} variant="outline" className="w-full">
						Cancel
					</Button>
					<Button
						onClick={handleLogout}
						variant="destructive"
						className="w-full"
					>
						Logout
					</Button>
				</Stack>
			</Stack>
		</Modal>
	)
}
