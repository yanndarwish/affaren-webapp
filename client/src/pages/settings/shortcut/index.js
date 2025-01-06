import { Stack } from "@mui/material"
import { Typography } from "../../../components/ui/typography"
import { useConfig } from "../../../lib/hooks/useConfig"
import { Button } from "../../../components/ui/button"
import { Trash2Icon, PlusIcon } from "lucide-react"
import { Input } from "../../../components/ui/input"
import { useState } from "react"
import { useNotify } from "../../../lib/hooks/useNotify"

export const ShortcutSettings = () => {
	const { config, updateConfig, getComponent, getModule } = useConfig()
	const { notifySuccess } = useNotify()

	const shortcutComponent = getComponent("pos", "shortcuts")
	const shortcutTypes = shortcutComponent.settings.shortcutTypes.filter(
		(shortcutType) => shortcutType.name !== "all"
	)

	const handleAddType = (name) => {
		const newShortcutType = {
			name,
			label: name.charAt(0).toUpperCase() + name.slice(1),
		}

		const newShortcutSettings = {
			...shortcutComponent.settings,
			shortcutTypes: [
				...shortcutComponent.settings.shortcutTypes,
				newShortcutType,
			],
		}

		const newShortcutComponent = {
			...shortcutComponent,
			settings: newShortcutSettings,
		}

		const newPosComponents = getModule("pos").components.map((component) => {
			if (component.name === "shortcuts") {
				return newShortcutComponent
			}
			return component
		})

		const newPosModule = {
			...getModule("pos"),
			components: newPosComponents,
		}

		const newModules = config.modules.map((module) => {
			if (module.name === "pos") {
				return newPosModule
			}
			return module
		})

		updateConfig({
			...config,
			modules: newModules,
		})

		notifySuccess("Shortcut type added")
	}

	const handleRemoveType = (name) => {
		const newShortcutTypes = shortcutComponent.settings.shortcutTypes.filter(
			(shortcutType) => shortcutType.name !== name
		)

		const newShortcutSettings = {
			...shortcutComponent.settings,
			shortcutTypes: newShortcutTypes,
		}

		const newShortcutComponent = {
			...shortcutComponent,
			settings: newShortcutSettings,
		}

		const newPosComponents = getModule("pos").components.map((component) => {
			if (component.name === "shortcuts") {
				return newShortcutComponent
			}
			return component
		})

		const newPosModule = {
			...getModule("pos"),
			components: newPosComponents,
		}

		const newModules = config.modules.map((module) => {
			if (module.name === "pos") {
				return newPosModule
			}
			return module
		})

		updateConfig({ ...config, modules: newModules })

		notifySuccess("Shortcut type removed")
	}
	return (
		<Stack direction="column" spacing={2}>
			<Typography variant="muted">
				Here you can manage the types of shortcuts you want to use in your
				application. They can be used to organize and filter through your
				shortcuts.
			</Typography>
			<Stack direction="column" spacing={2}>
				<Stack spacing={2}>
					<Typography variant="h4">Add a shortcut type</Typography>
					<AddShortcutType onAdd={handleAddType} />
				</Stack>
				<Stack spacing={2}>
					<Typography variant="h4">Your shortcut types</Typography>

					{shortcutTypes.length === 0 ? (
						<Typography variant="muted">No shortcut types found.</Typography>
					) : (
						<Stack direction="column" spacing={2}>
							{shortcutTypes.map((shortcutType) => (
								<ShortcutType
									key={shortcutType.name}
									shortcutType={shortcutType}
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

const ShortcutType = ({ shortcutType, onRemove }) => {
	return (
		<div className="flex items-center justify-between border border-muted rounded-lg p-2 pl-4">
			<Typography variant="small">{shortcutType.label}</Typography>
			<Button
				variant="destructive"
				size="icon"
				onClick={() => onRemove(shortcutType.name)}
			>
				<Trash2Icon />
			</Button>
		</div>
	)
}

const AddShortcutType = ({ onAdd = () => null }) => {
	const [name, setName] = useState("")

	return (
		<Stack direction="row" spacing={1} className="w-full">
			<Input
				placeholder="Name"
				className="w-full"
				value={name}
				onChange={(e) => setName(e.target.value)}
			/>
			<Button onClick={() => onAdd(name)}>
				<PlusIcon />
			</Button>
		</Stack>
	)
}
