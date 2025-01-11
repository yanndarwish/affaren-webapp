import { EventEditForm } from "../event-edit-form"
import { EventDeleteForm } from "../event-delete-form"
import { Modal, useModal } from "../../shared/modal"
import { Stack } from "@mui/material"
import { Typography } from "../../ui/typography"
import { Button } from "../../ui/button"

export function EventView({ event, controller, onSuccess = () => null }) {
	const modalEditEvent = useModal()
	const modalDeleteEvent = useModal()

	const handleClickEditEvent = () => {
		modalEditEvent.setData({ id: event.id, title: event.title })
		modalEditEvent.openModal()
	}

	const handleClickDeleteEvent = () => {
		modalDeleteEvent.setData(event)
		modalDeleteEvent.openModal()
	}

	const handleDeleteConfirm = () => {
		controller.closeModal()
		onSuccess()
	}

	const handleEditConfirm = () => {
		controller.closeModal()
		onSuccess()
	}

	if (!event) return null

	const Title = () => (
		<Stack direction="row" spacing={2} alignItems="center">
			<div
				className="rounded-full w-5 h-5"
				style={{ backgroundColor: event?.backgroundColor }}
			></div>
			<div>{event.title}</div>
		</Stack>
	)
	return (
		<Modal
			title={<Title />}
			open={controller.open}
			handleClose={controller.closeModal}
		>
			<Stack spacing={1}>
				<Typography variant="muted">{event.description}</Typography>
				<Typography variant="large">
					{`${event.start.toLocaleTimeString([], {
						hour: "2-digit",
						minute: "2-digit",
					})} - ${event.end.toLocaleTimeString([], {
						hour: "2-digit",
						minute: "2-digit",
					})}`}
				</Typography>
			</Stack>
			<Stack
				direction="row"
				justifyContent="flex-end"
				alignItems="center"
				spacing={1}
			>
				<Button variant="outline" onClick={handleClickEditEvent}>
					Edit
				</Button>
				<Button variant="destructive" onClick={handleClickDeleteEvent}>
					Delete
				</Button>
			</Stack>

			<EventDeleteForm
				controller={modalDeleteEvent}
				onSuccess={handleDeleteConfirm}
			/>
			<EventEditForm
				event={event}
				controller={modalEditEvent}
				onSuccess={handleEditConfirm}
			/>
		</Modal>
	)
}
