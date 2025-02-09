import { Grid, Stack } from "@mui/material"

import { Button } from "../../../../components/ui/button"
import { Tabs, TabsList, TabsTrigger } from "../../../../components/ui/tabs"

import { ShortcutCard } from "../card"
import { ModalAddShortcut } from "../modals/add"
import { useShortcuts } from "../../hooks/use-shortcuts"

export const ShortcutContainer = () => {
	const {
		filter,
		modalAdd,
		shortcutFilters,
		filteredShortcuts,
		handleChangeTab,
		handleGetShortcuts,
	} = useShortcuts({})

	const handleAddShortcut = () => {
		modalAdd.openModal()
	}

	return (
		<>
			<div className="flex flex-col h-full p-4 space-y-2 justify-between overflow-hidden">
				<Stack className="overflow-hidden h-full space-y-2">
					<Tabs
						defaultValue={filter}
						onValueChange={handleChangeTab}
						className="w-full space-y-4"
					>
						<TabsList className="w-full p-0 bg-white">
							{shortcutFilters.map((tab) => (
								<TabsTrigger
									key={tab.name}
									value={tab.name}
									className={`w-full ${
										filter === tab.name
											? "!bg-slate-900 !text-white"
											: "!bg-white"
									}`}
								>
									{tab.label}
								</TabsTrigger>
							))}
						</TabsList>
					</Tabs>
					<Stack className="overflow-y-auto h-full">
						<Grid container rowSpacing={1} columnSpacing={1}>
							{filteredShortcuts
								.sort((a, b) => a.card_name.localeCompare(b.card_name))
								.map((shortcut) => (
									<Grid item key={shortcut.card_uuid} xs={6}>
										<ShortcutCard
											shortcut={shortcut}
											onSuccess={handleGetShortcuts}
										/>
									</Grid>
								))}
						</Grid>
					</Stack>
				</Stack>

				<Stack className="w-full pt-2">
					<Button className="w-full" onClick={handleAddShortcut}>
						Add Shortcut
					</Button>
				</Stack>
			</div>
			<ModalAddShortcut controller={modalAdd} onSuccess={handleGetShortcuts} />
		</>
	)
}
