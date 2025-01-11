"use client"

import React, { useEffect, useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "../../ui/button"
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
import { DateTimePicker } from "../date-picker"
import { useNotify } from "../../../lib/hooks/useNotify"
import { useQuery } from "../../../lib/hooks/useQuery"

import { Modal } from "../../shared/modal"
import { Stack } from "@mui/material"
import { createEvent, getEventTypes } from "../../../lib/api"
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "../../ui/select"

const eventAddFormSchema = z.object({
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

export function EventAddForm({
	controller,
	start,
	end,
	onSuccess = () => null,
}) {
	const [eventTypes, setEventTypes] = useState([])
	const { notifySuccess, notifyError } = useNotify()

	const form = useForm({
		resolver: zodResolver(eventAddFormSchema),
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

	const queryCreateEvent = useQuery({
		queryFn: createEvent,
		onSuccess: () => {
			notifySuccess("Event added successfully")
			onSuccess()
			controller.closeModal()
		},
		onError: () => {
			notifyError("Error adding event")
		},
	})

	function onSubmit(data) {
		queryCreateEvent.send({ ...data, type: Number(data.type) })
	}

	useEffect(() => {
		form.reset({
			title: "",
			description: "",
			start: start,
			end: end,
			type: "",
		})
	}, [form, start, end])

	useEffect(() => {
		queryGetEventTypes.send()
	}, [])

	return (
		<Modal
			title="Add event"
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
										className="max-h-36"
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
						className="pt-2"
					>
						<Button
							type="button"
							variant="outline"
							onClick={controller.closeModal}
						>
							Cancel
						</Button>
						<Button type="submit">Add Event</Button>
					</Stack>
				</form>
			</Form>
		</Modal>
	)
}
