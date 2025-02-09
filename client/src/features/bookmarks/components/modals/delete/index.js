import { Stack } from "@mui/material"

import { Button } from "../../../../../components/ui/button"
import { Modal } from "../../../../../components/shared/modal"

export const ModalDeleteAllBookmarks = ({
	controller,
	onConfirm = () => null,
}) => {
	return (
		<Modal
			open={controller.open}
			handleClose={controller.closeModal}
			title="Clear all bookmarks"
		>
			<Stack direction="column" spacing={4}>
				<p className="text-center text-lg font-medium text-gray-900">
					Are you sure you want to clear all bookmarks ?
				</p>
				<Stack direction="row" spacing={2}>
					<Button
						onClick={controller.closeModal}
						variant="outline"
						className="w-full"
					>
						Cancel
					</Button>
					<Button onClick={onConfirm} variant="destructive" className="w-full">
						Delete
					</Button>
				</Stack>
			</Stack>
		</Modal>
	)
}
