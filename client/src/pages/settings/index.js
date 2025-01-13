import { useLocation, useSearchParams } from "react-router-dom"
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
import {
	Puzzle,
	SlidersHorizontal,
	User,
	Settings as SettingsIcon,
} from "lucide-react"
import { Stack } from "@mui/material"
import { Typography } from "../../components/ui/typography"
import { useConfig } from "../../lib/hooks/useConfig"

import { Switch } from "../../components/ui/switch"
import { Separator } from "../../components/ui/separator"
import { Label } from "../../components/ui/label"
import { Tabs, TabsList, TabsTrigger } from "../../components/ui/tabs"
import { ModalComponentSettings } from "./modal"
import { useModal } from "../../components/shared/modal"

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
				className="border border-gray-200 p-4 rounded-xl space-y-4"
			>
				<Stack>
					<Typography variant="h3">General</Typography>
					<Typography variant="muted">
						General settings for the application.
					</Typography>
				</Stack>
				<Stack spacing={4}>
					{/* <LanguageElement />
					<Separator /> */}
					<CurrencyElement />
					<Separator />
					<PaymentMethodElement />
					<Separator />
					<TaxesElement />
				</Stack>
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
	const modalModuleSettings = useModal()

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
							if (component.dependsOn.length > 0 && !component.active) {
								handleDependencies(component)
							}
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

	const handleDependencies = (component) => {
		const dependencies = component.dependsOn

		dependencies.forEach((dependency) => {
			if (dependency.entity === "module") {
				const module = config.modules.find((m) => m.name === dependency.name)
				if (module) {
					module.active = true
				}
			}
		})

		updateConfig({ ...config })
	}

	const handleOpenModuleSettings = () => {
		modalModuleSettings.openModal()
	}

	return (
		<Stack key={module.name} spacing={4}>
			<Stack spacing={2}>
				<Stack spacing={1}>
					<Stack
						direction="row"
						spacing={4}
						alignItems="center"
						justifyContent="space-between"
					>
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
						{module.hasSettings && (
							<SettingsIcon
								className="w-5 h-5 cursor-pointer"
								onClick={handleOpenModuleSettings}
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
			<ModalComponentSettings
				component={module}
				controller={modalModuleSettings}
			/>
		</Stack>
	)
}

const ComponentElement = ({
	module,
	component,
	onCheckedChange = () => null,
}) => {
	const modalComponentSettings = useModal()
	let [searchParams] = useSearchParams()
	const componentParam = searchParams.get(component.name)

	const handleOpenComponentSettings = () => {
		modalComponentSettings.openModal()
	}

	useEffect(() => {
		if (componentParam) {
			modalComponentSettings.openModal()
		}
	}, [componentParam])

	return (
		<div className="p-4 justify-between items-center bg-muted/30 rounded-lg space-y-2">
			<Stack
				spacing={1}
				className={!component.active || !module.active ? "opacity-50" : ""}
			>
				<Stack
					direction="row"
					spacing={1}
					alignItems="flex-start"
					justifyContent="space-between"
				>
					<Stack direction="row" spacing={1} alignItems="center">
						{component.icon && <component.icon className="w-4 h-4" />}
						<Label>{component.label}</Label>
					</Stack>
					{component.hasSettings && (
						<SettingsIcon
							className="w-4 h-4 cursor-pointer"
							onClick={handleOpenComponentSettings}
						/>
					)}
				</Stack>
			</Stack>
			<Stack
				direction="row"
				spacing={1}
				alignItems="flex-start"
				justifyContent="space-between"
				className="w-full"
			>
				<Typography variant="muted">{component.description}</Typography>
				<Switch
					checked={component.active}
					onCheckedChange={onCheckedChange}
					disabled={!module.active}
				/>
			</Stack>
			<ModalComponentSettings
				component={component}
				controller={modalComponentSettings}
			/>
		</div>
	)
}

const PaymentMethodElement = () => {
	const { config, updateConfig } = useConfig()

	const handleTogglePaymentMethod = (name) => {
		const newConfig = { ...config }
		const option = newConfig.general.paymentMethods.options.find(
			(option) => option.name === name
		)

		option.active = !option.active
		updateConfig(newConfig)
	}
	return (
		<Stack spacing={2}>
			<Stack spacing={1}>
				<Stack direction="row" spacing={1} alignItems="center">
					{config.general.paymentMethods.icon && (
						<config.general.paymentMethods.icon className="w-4 h-4" />
					)}
					<Typography variant="h4">
						{config.general.paymentMethods.label}
					</Typography>
				</Stack>
				<Typography variant="muted">
					{config.general.paymentMethods.description}
				</Typography>
			</Stack>
			<Stack spacing={2} direction="row">
				{config.general.paymentMethods.options.map((option) => (
					<Stack
						key={option.name}
						direction="row"
						spacing={4}
						alignItems="center"
						justifyContent="space-between"
						className="bg-muted/30 rounded-lg space-x-2 p-4 w-full"
					>
						<Stack direction="row" spacing={1} alignItems="center">
							<option.icon className="w-4 h-4" />
							<Label>{option.label}</Label>
						</Stack>
						<Switch
							checked={option.active}
							onCheckedChange={() => handleTogglePaymentMethod(option.name)}
							className="!opacity-100"
							disabled={
								config.general.paymentMethods.options.filter(
									(option) => option.active
								).length === 1 && option.active
							}
						/>
					</Stack>
				))}
			</Stack>
		</Stack>
	)
}

const TaxesElement = () => {
	const { config, updateConfig } = useConfig()

	const handleToggleTax = (name) => {
		const newConfig = { ...config }
		const option = newConfig.general.taxes.options.find(
			(option) => option.name === name
		)

		option.active = !option.active
		updateConfig(newConfig)
	}

	return (
		<Stack spacing={2}>
			<Stack spacing={1}>
				<Stack direction="row" spacing={1} alignItems="center">
					{config.general.taxes.icon && (
						<config.general.taxes.icon className="w-4 h-4" />
					)}
					<Typography variant="h4">{config.general.taxes.label}</Typography>
				</Stack>
				<Typography variant="muted">
					{config.general.taxes.description}
				</Typography>
			</Stack>
			<div className={`grid grid-cols-2 gap-4`}>
				{config.general.taxes.options.map((option) => (
					<Stack
						key={option.name}
						direction="row"
						spacing={4}
						alignItems="center"
						justifyContent="space-between"
						className="bg-muted/30 rounded-lg space-x-2 p-4 w-full"
					>
						<Stack direction="row" spacing={1} alignItems="center">
							<Typography variant="muted" className="text-md font-medium">
								{option.value}%
							</Typography>
							<Label>{option.label}</Label>
						</Stack>
						<Switch
							checked={option.active}
							onCheckedChange={() => handleToggleTax(option.name)}
							className="!opacity-100"
							disabled={
								config.general.taxes.options.filter((option) => option.active)
									.length === 1 && option.active
							}
						/>
					</Stack>
				))}
			</div>
		</Stack>
	)
}

const CurrencyElement = () => {
	const { config, updateConfig } = useConfig()

	const handleChangeCurrency = (value) => {
		const newConfig = { ...config }
		newConfig.general.currency.value = value
		const symbol = newConfig.general.currency.options.find(
			(option) => option.name === value
		).icon

		newConfig.general.currency.symbol = symbol

		updateConfig(newConfig)
	}

	return (
		<Stack spacing={2}>
			<Stack spacing={1}>
				<Stack direction="row" spacing={1} alignItems="center">
					{config.general.currency.icon && (
						<config.general.currency.symbol className="w-4 h-4" />
					)}
					<Typography variant="h4">{config.general.currency.label}</Typography>
				</Stack>
				<Typography variant="muted">
					{config.general.currency.description}
				</Typography>
			</Stack>

			<Tabs
				value={config.general.currency.value}
				onValueChange={handleChangeCurrency}
				className="w-full h-full space-y-4"
			>
				<TabsList className="w-full">
					{config.general.currency.options.map((option) => (
						<TabsTrigger
							key={option.name}
							value={option.name}
							className="w-full"
						>
							<Stack direction="row" spacing={2} alignItems="center">
								{option.icon && <option.icon className="w-4 h-4" />}
								<Typography variant="muted">{option.label}</Typography>
							</Stack>
						</TabsTrigger>
					))}
				</TabsList>
			</Tabs>
		</Stack>
	)
}

const LanguageElement = () => {
	const { config, updateConfig } = useConfig()

	const handleChangeLanguage = (value) => {
		const newConfig = { ...config }
		newConfig.general.language.value = value

		updateConfig(newConfig)
	}

	return (
		<Stack spacing={2}>
			<Stack spacing={1}>
				<Stack direction="row" spacing={1} alignItems="center">
					{config.general.language.icon && (
						<config.general.language.icon className="w-4 h-4" />
					)}
					<Typography variant="h4">{config.general.language.label}</Typography>
				</Stack>
				<Typography variant="muted">
					{config.general.language.description}
				</Typography>
			</Stack>

			<Tabs
				value={config.general.language.value}
				onValueChange={handleChangeLanguage}
				className="w-full h-full space-y-4"
			>
				<TabsList className="w-full">
					{config.general.language.options.map((option) => (
						<TabsTrigger
							key={option.name}
							value={option.name}
							className="w-full"
						>
							<Stack direction="row" spacing={2} alignItems="center">
								{option.icon && <option.icon className="w-4 h-4" />}
								<Typography variant="muted">{option.label}</Typography>
							</Stack>
						</TabsTrigger>
					))}
				</TabsList>
			</Tabs>
		</Stack>
	)
}
