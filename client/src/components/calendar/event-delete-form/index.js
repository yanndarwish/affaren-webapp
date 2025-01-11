"use client"

import React from "react"
import { Button } from "../../ui/button"

import { useNotify } from "../../../lib/hooks/useNotify"
import { Modal } from "../../shared/modal"
import { Typography } from "../../ui/typography"
import { Stack } from "@mui/material"
import { useQuery } from "../../../lib/hooks/useQuery"
import { deleteEvent } from "../../../lib/api"

export function EventDeleteForm({ controller, onSuccess = () => null }) {
	const { notifySuccess, notifyError } = useNotify()

	const queryDeleteEvent = useQuery({
		queryFn: deleteEvent,
		onSuccess: () => {
			notifySuccess("Event deleted successfully")
			onSuccess()
			controller.closeModal()
		},
		onError: () => {
			notifyError("Failed to delete event")
		},
	})

	function onSubmit() {
		queryDeleteEvent.send(controller.data.id)
	}

	if (!controller.data) return null
	return (
		<Modal
			title={`Delete ${controller.data.title}`}
			open={controller.open}
			handleClose={controller.closeModal}
		>
			<Typography variant="muted">
				Are you sure you want to delete this event?
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
				<Button variant="destructive" onClick={() => onSubmit()}>
					Delete
				</Button>
			</Stack>
		</Modal>
	)
}
