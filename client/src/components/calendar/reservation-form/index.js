"use client"

import { z } from "zod"
import React, { useEffect } from "react"
import { zodResolver } from "@hookform/resolvers/zod"

import { Stack } from "@mui/material"
import { Button } from "../../ui/button"
import { useForm } from "react-hook-form"

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
import { useConfig } from "../../../lib/hooks/useConfig"

const addReservationFormSchema = z.object({
	people: z
		.number({ required_error: "Please enter a number of people." })
		.min(1, { message: "Must provide a number of people." }),
	name: z.string({ required_error: "Please enter a name." }),
	phone: z
		.string({ required_error: "Please enter a phone number." })
		.min(10, { message: "Must provide a phone number." }),
	description: z.string().optional(),
	start: z.date({
		required_error: "Please select a time",
		invalid_type_error: "That's not a date!",
	}),
})

const reservationTypeId = 2

export const AddReservationForm = ({
	reservation,
	controller,
	onSubmit = () => null,
}) => {
	const { getModule } = useConfig()

	const form = useForm({
		resolver: zodResolver(addReservationFormSchema),
		defaultValues: {
			name: "",
			phone: "",
			people: 1,
			description: "",
			start: new Date(),
		},
	})

	const handleSubmit = (data) => {
		const formattedData = {
			...data,
			title: `Reservation for ${data.people} people`,
			description: `Name: ${data.name}\nPhone: ${data.phone}${
				data.description ? "\nSpecial requests: " + data.description : ""
			}`,
			end: new Date(data.start.getTime() + 60 * 60 * 1000),
			type: reservationTypeId,
		}

		onSubmit(formattedData)
		controller.closeModal()
	}

	useEffect(() => {
		if (reservation) {
			const name = reservation.description.split("\n")[0].replace("Name: ", "")
			const phone = reservation.description
				.split("\n")[1]
				.replace("Phone: ", "")
			const people = Number(
				reservation.title.split("for ")[1].replace(" people", "")
			)
			const description = reservation.description
				.split("\n")[2]
				.replace("Special requests: ", "")

			form.reset({
				name: name,
				phone: phone,
				people: people,
				description: description,
				start: reservation?.start,
			})
		}
	}, [form, reservation])

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-2.5">
				<FormField
					control={form.control}
					name="name"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Name</FormLabel>
							<FormControl>
								<Input placeholder="John Doe" {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="phone"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Phone</FormLabel>
							<FormControl>
								<Input placeholder="06 06 06 06 06" {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="people"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Number of people</FormLabel>
							<FormControl>
								<div className="grid grid-cols-5 gap-2">
									{[
										...Array(
											Number(
												getModule("restauration").settings.maxCapacityPerTable
											)
										),
									].map((_, i) => (
										<Button
											key={i + 1}
											type="button"
											variant={field.value === i + 1 ? "default" : "outline"}
											onClick={() => field.onChange(i + 1)}
											className="w-full h-12"
										>
											{i + 1}
										</Button>
									))}
								</div>
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
							<FormLabel>Special requests</FormLabel>
							<FormControl>
								<Textarea
									placeholder="Any special requests ?"
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
							<FormLabel htmlFor="datetime">Time</FormLabel>
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
	)
}
