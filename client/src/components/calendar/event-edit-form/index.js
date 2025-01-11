"use client"

import React, { useEffect, useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "../../ui/form"
import { Input } from "../../ui/input"
import { Textarea } from "../../ui/textarea"
import { Popover, PopoverContent, PopoverTrigger } from "../../ui/popover"
import { HexColorPicker } from "react-colorful"
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
} from "../../ui/alert-dialog"
import { DateTimePicker } from "../date-picker"
import { useEvents } from "../../../lib/hooks/useEvents"
import { Button } from "../../ui/button"
import { useNotify } from "../../../lib/hooks/useNotify"
import { Modal } from "../../shared/modal"
import { Stack } from "@mui/material"
import { useQuery } from "../../../lib/hooks/useQuery"
import { getEventTypes, updateEvent } from "../../../lib/api"
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "../../ui/select"

const eventEditFormSchema = z.object({
	id: z.string(),
	title: z
		.string({ required_error: "Please enter a title." })
		.min(1, { message: "Must provide a title for this event." }),
	description: z
		.string({ required_error: "Please enter a description." })
		.min(1, { message: "Must provide a description for this event." }),
	start: z.date({
		required_error: "Please select a start time",
		invalid_type_error: "That's not a date!",
	}),
	end: z.date({
		required_error: "Please select an end time",
		invalid_type_error: "That's not a date!",
	}),
	type: z
		.string({ required_error: "Please select an event type." })
		.min(1, { message: "Must provide a type for this event." }),
})

export function EventEditForm({ event, controller, onSuccess = () => null }) {
	const { notifySuccess, notifyError } = useNotify()
	const [eventTypes, setEventTypes] = useState([])

	const form = useForm({
		resolver: zodResolver(eventEditFormSchema),
	})

	const queryGetEventTypes = useQuery({
		queryFn: getEventTypes,
		onSuccess: (data) => {
			setEventTypes(data)
		},
		onError: () => {
			notifyError("Error fetching event types")
		},
	})

	const queryUpdateEvent = useQuery({
		queryFn: updateEvent,
		onSuccess: () => {
			notifySuccess("Event updated successfully")
			controller.closeModal()
			onSuccess()
		},
		onError: () => {
			notifyError("Failed to update event")
		},
	})

	function onSubmit(data) {
		queryUpdateEvent.send({
			id: event.id,
			body: { ...data, type: Number(data.type) },
		})
	}

	useEffect(() => {
		form.reset({
			id: event?.id,
			title: event?.title,
			description: event?.description,
			start: event?.start,
			end: event?.end,
			type: event?.typeId,
		})
	}, [form, event])

	useEffect(() => {
		queryGetEventTypes.send()
	}, [])

	return (
		<Modal
			title={`Edit ${event?.title}`}
			open={controller.open}
			handleClose={controller.closeModal}
		>
			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2.5">
					<FormField
						control={form.control}
						name="title"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Title</FormLabel>
								<FormControl>
									<Input placeholder="Standup Meeting" {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="description"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Description</FormLabel>
								<FormControl>
									<Textarea
										placeholder="Daily session"
										className="resize-none"
										{...field}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="start"
						render={({ field }) => (
							<FormItem className="flex flex-col">
								<FormLabel htmlFor="datetime">Start</FormLabel>
								<FormControl>
									<DateTimePicker
										value={field.value}
										onChange={field.onChange}
										hourCycle={24}
										granularity="minute"
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="end"
						render={({ field }) => (
							<FormItem className="flex flex-col">
								<FormLabel htmlFor="datetime">End</FormLabel>
								<FormControl>
									<DateTimePicker
										value={field.value}
										onChange={field.onChange}
										hourCycle={24}
										granularity="minute"
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="type"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Type</FormLabel>
								<Select
									onValueChange={field.onChange}
									defaultValue={field.value}
									value={field.value}
								>
									<FormControl>
										<SelectTrigger>
											<SelectValue placeholder="Select a type" />
										</SelectTrigger>
									</FormControl>
									<SelectContent>
										{eventTypes.map((type) => (
											<SelectItem
												key={type.event_type_id}
												value={String(type.event_type_id)}
											>
												{type.event_type_name}
											</SelectItem>
										))}
									</SelectContent>
								</Select>
								<FormMessage />
							</FormItem>
						)}
					/>
					<Stack
						direction="row"
						justifyContent="flex-end"
						alignItems="center"
						spacing={1}
					>
						<Button
							type="button"
							variant="outline"
							onClick={controller.closeModal}
						>
							Cancel
						</Button>
						<Button type="submit">Save</Button>
					</Stack>
				</form>
			</Form>
		</Modal>
	)
}
