import { Stack } from "@mui/material"
import { Button } from "../../../../../components/ui/button"
import { Modal } from "../../../../../components/shared/modal"

export const ModalDeleteShortcut = ({ controller, onConfirm = () => null }) => {
	const card = controller.data

	return (
		<Modal
			open={controller.open}
			title={`Delete Card ${card.card_name}`}
			handleClose={controller.closeModal}
			className="!w-[50vw]"
		>
			<Stack direction="column" spacing={4}>
				<p className="text-center text-lg font-medium text-gray-900">
					Are you sure you want to delete this card?
				</p>
				<Stack direction="row" spacing={2}>
					<Button
						onClick={controller.closeModal}
						variant="outline"
						className="w-full"
					>
						Cancel
					</Button>
					<Button
						onClick={() => onConfirm(card)}
						variant="destructive"
						className="w-full"
					>
						Delete
					</Button>
				</Stack>
			</Stack>
		</Modal>
	)
}
