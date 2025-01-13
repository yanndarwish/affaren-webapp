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
} from "../../../../ui/form"
import { Stack } from "@mui/material"
import { Button } from "../../../../ui/button"
import { useSale } from "../../../../../lib/providers/sale"
import { useConfig } from "../../../../../lib/hooks/useConfig"

const addTableSchema = z.object({
	id: z
		.number({ required_error: "Please enter a table number." })
		.min(1, { message: "Must provide a table number." }),
	people: z
		.number({ required_error: "Please enter a number of people." })
		.min(1, { message: "Must provide a number of people." }),
})

export const FormAddTable = ({
	onSuccess = () => null,
	onCancel = () => null,
}) => {
	const { getModule } = useConfig()
	const { addTable } = useSale()

	const form = useForm({
		resolver: zodResolver(addTableSchema),
		defaultValues: {
			id: 0,
			people: 1,
		},
	})

	const onSubmit = (data) => {
		addTable(data.id, data.people)
		form.reset({
			people: 1,
			id: 0,
		})
		onSuccess()
	}

	return (
		<Stack direction="column" spacing={2}>
			<Form {...form}>
				<form
					onSubmit={form.handleSubmit(onSubmit)}
					className="space-y-4 w-full"
				>
					<FormField
						control={form.control}
						name="id"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Table</FormLabel>
								<FormControl>
									<div className="grid grid-cols-5 gap-2">
										{[
											...Array(
												Number(getModule("restauration").settings.tables)
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
						name="people"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Number of people</FormLabel>
								<FormControl>
									<div className="grid grid-cols-5 gap-2">
										{[
											...Array(
												Number(getModule("restauration").settings.maxCapacityPerTable)
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

					<Stack direction="row" spacing={1} justifyContent="flex-end">
						<Button type="button" variant="outline" onClick={onCancel}>
							Cancel
						</Button>
						<Button type="submit">Add Table</Button>
					</Stack>
				</form>
			</Form>
		</Stack>
	)
}
