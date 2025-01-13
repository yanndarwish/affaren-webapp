import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"

import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "../../../../components/ui/form"
import { Stack } from "@mui/material"
import { Input } from "../../../../components/ui/input"
import { Button } from "../../../../components/ui/button"
import { useConfig } from "../../../../lib/hooks/useConfig"

const restaurationSettingsSchema = z.object({
	maxCapacity: z
		.string({ required_error: "Please enter a maximum capacity." })
		.min(1, { message: "Must provide a maximum capacity." }),
	tables: z
		.string({ required_error: "Please select a number of tables." })
		.min(1, { message: "Must provide a number of tables." }),
	maxCapacityPerTable: z
		.string({ required_error: "Please enter a maximum capacity." })
		.min(1, { message: "Must provide a maximum capacity." }),
})

export const RestaurationSettingsForm = ({ onSuccess = () => null }) => {
	const { config, getModule, updateConfig } = useConfig()
	const currentSettings = getModule("restauration").settings

	const form = useForm({
		resolver: zodResolver(restaurationSettingsSchema),
		defaultValues: {
			maxCapacity: String(currentSettings.maxCapacity),
			tables: String(currentSettings.tables),
			maxCapacityPerTable: String(currentSettings.maxCapacityPerTable),
		},
	})

	const onSubmit = (data) => {
		const currentRestauration = getModule("restauration")

		currentRestauration.settings = { ...currentRestauration.settings, ...data }

		const newModules = config.modules.map((module) => {
			if (module.name === "restauration") {
				return currentRestauration
			}
			return module
		})

		updateConfig({
			...config,
			modules: newModules,
		})

		onSuccess()
		form.reset({
			maxCapacity: String(data.maxCapacity),
			tables: String(data.tables),
			maxCapacityPerTable: String(data.maxCapacityPerTable),
		})
	}

	return (
		<Stack direction="row" spacing={1} className="w-full">
			<Form {...form}>
				<form
					onSubmit={form.handleSubmit(onSubmit)}
					className="space-y-4 w-full"
				>
					<Stack spacing={2} className="w-full">
						<FormField
							control={form.control}
							name="maxCapacity"
							render={({ field }) => (
								<FormItem className="w-full">
									<FormLabel>Max capacity</FormLabel>
									<FormControl>
										<Input {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="tables"
							render={({ field }) => (
								<FormItem className="w-full">
									<FormLabel>Number of tables</FormLabel>
									<FormControl>
										<Input {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="maxCapacityPerTable"
							render={({ field }) => (
								<FormItem className="w-full">
									<FormLabel>Max capacity per table</FormLabel>
									<FormControl>
										<Input {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
					</Stack>
					<Button type="submit" className="w-full">
						Save
					</Button>
				</form>
			</Form>
		</Stack>
	)
}
