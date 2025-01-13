"use client"

import { Stack } from "@mui/material"
import { Button } from "../../../../ui/button"
import { Modal } from "../../../../shared/modal"
import { Typography } from "../../../../ui/typography"

export const ModalDeleteTable = ({ controller, onConfirm = () => null }) => {
	if (!controller.data) return null

	return (
		<Modal
			title={`Delete Table ${controller.data.id}`}
			open={controller.open}
			handleClose={controller.closeModal}
		>
			<Typography variant="muted">
				Are you sure you want to delete this table?
			</Typography>
			<Stack
				direction="row"
				justifyContent="flex-end"
				alignItems="center"
				spacing={1}
			>
				<Button variant="outline" onClick={controller.closeModal}>
					Cancel
				</Button>
				<Button variant="destructive" onClick={onConfirm}>
					Delete
				</Button>
			</Stack>
		</Modal>
	)
}
