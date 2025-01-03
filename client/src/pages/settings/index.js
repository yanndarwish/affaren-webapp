import { useLocation } from "react-router-dom"
import { useEffect, useRef, forwardRef } from "react"
import {
	FixedContainer,
	PageContainer,
} from "../../components/shared/containers"
import {
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
} from "../../components/ui/sidebar"
import { Puzzle, SlidersHorizontal, User, Terminal } from "lucide-react"
import { Stack } from "@mui/material"
import { Typography } from "../../components/ui/typography"
import { useConfig } from "../../lib/hooks/useConfig"

import { Switch } from "../../components/ui/switch"
import { Separator } from "../../components/ui/separator"
import { Label } from "../../components/ui/label"

const sections = [
	{
		name: "General",
		icon: SlidersHorizontal,
		url: "/settings#general",
		id: "general",
	},
	{
		name: "Modules",
		icon: Puzzle,
		url: "/settings#modules",
		id: "modules",
	},
	{
		name: "Profile",
		icon: User,
		url: "/settings#profile",
		id: "profile",
	},
]

export default function Settings() {
	const location = useLocation()
	const contentRef = useRef(null)

	useEffect(() => {
		if (location.hash && contentRef.current) {
			const id = location.hash.replace("#", "")
			const element = document.getElementById(id)
			if (element) {
				element.scrollIntoView({ behavior: "smooth" })
			}
		}
	}, [location.hash])

	return (
		<PageContainer className="grid gap-4 md:grid-cols-12 grid-rows-1 h-full">
			<FixedContainer className="rounded-xl border border-gray-200 col-span-2">
				<SettingsSidebar sections={sections} />
			</FixedContainer>
			<FixedContainer className="col-span-10">
				<MainContent ref={contentRef} />
			</FixedContainer>
		</PageContainer>
	)
}

const MainContent = forwardRef(({}, ref) => {
	const { config } = useConfig()

	return (
		<Stack spacing={2} ref={ref}>
			<Stack
				id="general"
				className="h-[200px] border border-gray-200 p-4 rounded-xl"
			>
				<Typography variant="h3">General</Typography>
				<Typography variant="muted">
					General settings for the application.
				</Typography>
			</Stack>
			<Stack
				id="modules"
				className="border border-gray-200 p-4 rounded-xl space-y-4"
			>
				<Stack>
					<Typography variant="h3">Modules</Typography>
					<Typography variant="muted">
						Modules settings for the application.
					</Typography>
				</Stack>
				<Stack spacing={4}>
					{config.modules.map((module, index) => (
						<ModuleElement key={module.name} module={module} index={index} />
					))}
				</Stack>
			</Stack>
			<Stack
				id="profile"
				className="h-[200px] border border-gray-100 p-4 rounded-xl"
			>
				<Typography variant="h3">Profile</Typography>
				<Typography variant="muted">
					Profile settings for the application.
				</Typography>
			</Stack>
		</Stack>
	)
})

MainContent.displayName = "MainContent"

const SettingsSidebar = ({ sections }) => {
	const location = useLocation()

	const isActive = (url) => {
		return `${location.pathname}${location.hash}` === `${url}`
	}

	return (
		<Stack className="p-4">
			<SidebarMenu>
				{sections.map((section) => (
					<SidebarMenuItem className="h-10" key={section.url}>
						<SidebarMenuButton asChild isActive={isActive(section.url)}>
							<a href={section.url}>
								<section.icon />
								<span>{section.name}</span>
							</a>
						</SidebarMenuButton>
					</SidebarMenuItem>
				))}
			</SidebarMenu>
		</Stack>
	)
}

const ModuleElement = ({ module, index }) => {
	const { config, updateConfig } = useConfig()

	const handleToggleModule = (index) => {
		const newModules = config.modules.map((module, i) => {
			if (i === index) {
				return { ...module, active: !module.active }
			}
			return module
		})
		updateConfig({ ...config, modules: newModules })
	}

	const handleToggleComponent = (moduleIndex, componentIndex) => {
		const newModules = config.modules.map((module, i) => {
			if (i === moduleIndex) {
				return {
					...module,
					components: module.components.map((component, i) => {
						if (i === componentIndex) {
							return { ...component, active: !component.active }
						}
						return component
					}),
				}
			}
			return module
		})
		updateConfig({ ...config, modules: newModules })
	}
	return (
		<Stack key={module.name} spacing={4}>
			<Stack spacing={2}>
				<Stack spacing={1}>
					<Stack direction="row" spacing={4} alignItems="center">
						<Stack direction="row" spacing={1} alignItems="center">
							{module.icon && <module.icon className="w-4 h-4" />}
							<Typography variant="h4">{module.label}</Typography>
						</Stack>
						{module.isMutable && (
							<Switch
								checked={module.active}
								onCheckedChange={() => handleToggleModule(index)}
								className="!opacity-100"
							/>
						)}
					</Stack>
					<Typography variant="muted">{module.description}</Typography>
				</Stack>

				<div className={`grid grid-cols-2 gap-4`}>
					{module.components.map((component, i) => (
						<ComponentElement
							key={component.name}
							module={module}
							component={component}
							onCheckedChange={() => handleToggleComponent(index, i)}
						/>
					))}
				</div>
			</Stack>
			{index !== config.modules.length - 1 && <Separator />}
		</Stack>
	)
}

const ComponentElement = ({
	module,
	component,
	onCheckedChange = () => null,
}) => {
	return (
		<div className="p-4 flex justify-between items-center bg-muted/30 rounded-lg space-x-2">
			<Stack
				spacing={1}
				className={!component.active || !module.active ? "opacity-50" : ""}
			>
				<Stack direction="row" spacing={1} alignItems="center">
					{component.icon && <component.icon className="w-4 h-4" />}
					<Label>{component.label}</Label>
				</Stack>
				<Typography variant="muted">{component.description}</Typography>
			</Stack>
			<Switch
				checked={component.active}
				onCheckedChange={onCheckedChange}
				disabled={!module.active}
			/>
		</div>
	)
}
