import { Stack } from "@mui/material"

import {
	Select,
	SelectItem,
	SelectValue,
	SelectContent,
	SelectTrigger,
} from "../../../../components/ui/select"
import {
	Form,
	FormItem,
	FormLabel,
	FormField,
	FormMessage,
	FormControl,
} from "../../../../components/ui/form"
import { Label } from "../../../../components/ui/label"
import { Input } from "../../../../components/ui/input"
import { Button } from "../../../../components/ui/button"
import { Typography } from "../../../../components/ui/typography"
import { Tabs, TabsList, TabsTrigger } from "../../../../components/ui/tabs"

import { tabs } from "../../utils"
import { useShortcuts } from "../../hooks/use-shortcuts"

export const FormShortcut = ({ card, onSuccess = () => null }) => {
	const {
		form,
		productCategories,
		filteredShortcutFilters,
		handleSubmit,
		handleAddType,
	} = useShortcuts({ shortcut: card, onSuccess })

	return (
		<Stack direction="column" spacing={2}>
			<Form {...form}>
				<form
					onSubmit={form.handleSubmit(handleSubmit)}
					className="space-y-4 w-full"
				>
					<div className="space-y-1">
						<Stack
							direction="row"
							spacing={2}
							justifyContent="space-between"
							alignItems="center"
						>
							<Label htmlFor="card-type">Type</Label>
							<Button variant="outline" onClick={handleAddType}>
								Add a shortcut type
							</Button>
						</Stack>
						{filteredShortcutFilters.length > 0 ? (
							<FormField
								control={form.control}
								name="type"
								render={({ field }) => (
									<FormItem>
										<FormControl>
											<Tabs
												value={field.value}
												onValueChange={field.onChange}
												className="w-full h-full space-y-4"
											>
												<TabsList className="w-full p-0 bg-white">
													{filteredShortcutFilters.map((tab) => (
														<TabsTrigger
															key={tab.name}
															value={tab.name}
															className={`w-full ${
																field.value === tab.name
																	? "!bg-slate-900 !text-white"
																	: "!bg-white"
															}`}
														>
															{tab.label}
														</TabsTrigger>
													))}
												</TabsList>
											</Tabs>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
						) : (
							<Typography variant="muted">No shortcut types found.</Typography>
						)}
					</div>
					<FormField
						control={form.control}
						name="category"
						render={({ field }) => (
							<FormItem>
								<FormLabel htmlFor="category">Category</FormLabel>
								<FormControl>
									<Select
										value={field.value}
										onValueChange={(e) => field.onChange(Number(e))}
									>
										<SelectTrigger>
											<SelectValue placeholder="Select a category" />
										</SelectTrigger>
										<SelectContent>
											{productCategories.map((category) => (
												<SelectItem
													key={category.product_category_id}
													value={category.product_category_id}
												>
													{category.product_category_name}
												</SelectItem>
											))}
										</SelectContent>
									</Select>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="name"
						render={({ field }) => (
							<FormItem>
								<FormLabel htmlFor="card-name">Name</FormLabel>
								<FormControl>
									<Input
										id="card-name"
										value={field.value}
										onChange={field.onChange}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="price"
						render={({ field }) => (
							<FormItem>
								<FormLabel htmlFor="card-price">Price</FormLabel>
								<FormControl>
									<Input
										id="card-price"
										value={field.value}
										type="number"
										onChange={(event) =>
											field.onChange(
												event.target.value === "" ? "" : +event.target.value
											)
										}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="taxe"
						render={({ field }) => (
							<FormItem>
								<FormLabel htmlFor="card-category">Taxe</FormLabel>
								<FormControl>
									<Tabs
										defaultValue={field.value}
										onValueChange={field.onChange}
										className="w-full h-full space-y-4"
									>
										<TabsList className="w-full p-0 bg-white">
											{tabs.map((tab) => (
												<TabsTrigger
													key={tab.value}
													value={tab.value}
													className={`w-full ${
														field.value === tab.value
															? "!bg-black !text-white"
															: "!bg-white"
													}`}
												>
													{tab.value}%
												</TabsTrigger>
											))}
										</TabsList>
									</Tabs>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					<Button type="submit" className="w-full">
						{card ? "Update Card" : "Create Card"}
					</Button>
				</form>
			</Form>
		</Stack>
	)
}
