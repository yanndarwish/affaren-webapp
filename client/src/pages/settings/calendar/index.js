import { Stack } from "@mui/material"
import { Typography } from "../../../components/ui/typography"
import { z } from "zod"
import { Button } from "../../../components/ui/button"
import { Trash2Icon, PlusIcon } from "lucide-react"
import { Input } from "../../../components/ui/input"
import { useEffect, useState } from "react"
import { useNotify } from "../../../lib/hooks/useNotify"
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "../../../components/ui/form"
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "../../../components/ui/popover"
import { HexColorPicker } from "react-colorful"
import { useQuery } from "../../../lib/hooks/useQuery"
import {
	createEventType,
	getEventTypes,
	removeEventType,
} from "../../../lib/api"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"

export const CalendarSettings = () => {
	const { notifySuccess, notifyError } = useNotify()
	const [eventTypes, setEventTypes] = useState([])

	const queryGetEventTypes = useQuery({
		queryFn: getEventTypes,
		onSuccess: (data) => {
			setEventTypes(data)
		},
		onError: () => {
			notifyError("Error fetching event types")
		},
	})

	const queryCreateEventType = useQuery({
		queryFn: createEventType,
		onSuccess: () => {
			fetchEventTypes()
			notifySuccess("Event type added")
		},
		onError: () => {
			notifyError("Error adding event type")
		},
	})

	const queryRemoveEventType = useQuery({
		queryFn: removeEventType,
		onSuccess: () => {
			fetchEventTypes()
			notifySuccess("Event type removed")
		},
		onError: () => {
			notifyError("Error removing event type")
		},
	})

	const handleAddType = (data) => {
		let formattedData = {
			...data,
			name: data.name.charAt(0).toUpperCase() + data.name.slice(1),
		}

		queryCreateEventType.send(formattedData)
	}

	const handleRemoveType = (id) => {
		queryRemoveEventType.send(id)
	}

	const fetchEventTypes = () => {
		queryGetEventTypes.send()
	}

	useEffect(() => {
		fetchEventTypes()
	}, [])

	return (
		<Stack direction="column" spacing={2}>
			<Typography variant="muted">
				Here you can manage the types of events you want to use in your
				calendar. They can be used to organize and filter through your events.
			</Typography>
			<Stack direction="column" spacing={2}>
				<Stack spacing={2}>
					<Typography variant="h4">Add an event type</Typography>
					<AddShortcutType onAdd={handleAddType} />
				</Stack>
				<Stack spacing={2}>
					<Typography variant="h4">Your event types</Typography>

					{eventTypes.length === 0 ? (
						<Typography variant="muted">No event types found.</Typography>
					) : (
						<Stack direction="column" spacing={2}>
							{eventTypes.map((eventType) => (
								<EventType
									key={eventType.event_type_id}
									eventType={eventType}
									onRemove={handleRemoveType}
								/>
							))}
						</Stack>
					)}
				</Stack>
			</Stack>
		</Stack>
	)
}

const EventType = ({ eventType, onRemove }) => {
	return (
		<div className="flex items-center justify-between border border-muted rounded-lg p-2 pl-4">
			<Stack direction="row" spacing={2} className="items-center">
				<div
					className="w-6 h-6 rounded-lg"
					style={{ backgroundColor: eventType.event_type_color }}
				></div>
				<Typography variant="small">{eventType.event_type_name}</Typography>
			</Stack>
			<Button
				variant="destructive"
				size="icon"
				onClick={() => onRemove(eventType.event_type_id)}
			>
				<Trash2Icon />
			</Button>
		</div>
	)
}

const addEventTypeSchema = z.object({
	name: z
		.string({ required_error: "Please enter a name." })
		.min(1, { message: "Must provide a name for this event type." }),
	color: z
		.string({ required_error: "Please select an event color." })
		.min(1, { message: "Must provide a color for this event type." }),
})

const AddShortcutType = ({ onAdd = () => null }) => {
	const form = useForm({
		resolver: zodResolver(addEventTypeSchema),
		defaultValues: {
			name: "",
			color: "#000000",
		},
	})

	const onSubmit = (data) => {
		onAdd(data)
		form.reset({
			name: "",
			color: "#000000",
		})
	}

	return (
		<Stack direction="row" spacing={1} className="w-full">
			<Form {...form}>
				<form
					onSubmit={form.handleSubmit(onSubmit)}
					className="space-y-4 w-full"
				>
					<Stack direction="row" spacing={2} className="w-full">
						<FormField
							control={form.control}
							name="name"
							render={({ field }) => (
								<FormItem className="w-full">
									<FormLabel>Name</FormLabel>
									<FormControl>
										<Input {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="color"
							render={({ field }) => (
								<FormItem className="w-full">
									<FormLabel>Color</FormLabel>
									<FormControl>
										<Popover modal={true} className="z-50">
											<PopoverTrigger asChild className="cursor-pointer">
												<div className="flex flex-row w-full items-center space-x-4 ">
													{/* <Input {...field} /> */}
													<div
														className={`w-full h-10 rounded-lg cursor-pointer`}
														style={{ backgroundColor: field.value }}
													></div>
												</div>
											</PopoverTrigger>
											<PopoverContent className="flex mx-auto items-center justify-center">
												<HexColorPicker
													className="flex"
													color={field.value}
													onChange={field.onChange}
												/>
											</PopoverContent>
										</Popover>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
					</Stack>
					<Button type="submit" className="w-full">
						<PlusIcon />
					</Button>
				</form>
			</Form>
		</Stack>
	)
}
