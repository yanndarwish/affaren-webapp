import { createContext, useContext, useState, useEffect } from "react"
import { Home, List, ChartSpline, Box, KeyRound } from "lucide-react"
const ConfigContext = createContext()

const defaultConfig = {
	modules: [
		{
			name: "pos",
			label: "Point of sale",
			url: "pos",
			icon: Home,
			position: 1,
			components: [
				{ name: "barcode", label: "Barcode", active: true },
				{ name: "cart", label: "Cart", active: true },
				{ name: "shortcuts", label: "Shortcuts", active: true },
				{ name: "no-barcode", label: "No barcode", active: true },
				{ name: "bookmarks", label: "Bookmarks", active: true },
				{ name: "refund", label: "Refund", active: true },
				{ name: "discount", label: "Discount", active: false },
				{ name: "drawer", label: "Drawer", active: true },
				{ name: "receipt", label: "Receipt", active: true },
			],
		},
		{
			name: "sales",
			label: "Sales",
			url: "sales",
			icon: List,
			position: 2,
			components: [{ name: "table", label: "Table", active: true }],
		},
		{
			name: "dashboard",
			label: "Dashboard",
			url: "dashboard",
			icon: ChartSpline,
			position: 3,
			components: [
				{ name: "chart-monthly-sales", label: "Monthly chart", active: true },
				{ name: "table-monthly-sales", label: "Monthly table", active: true },
				{
					name: "table-monthly-best-sellers",
					label: "Monthly best sellers",
					active: false,
				},
				{
					name: "table-monthly-best-sellers",
					label: "Monthly best sellers",
					active: false,
				},
			],
		},
		{
			name: "inventory",
			label: "Inventory",
			url: "inventory",
			icon: Box,
			position: 4,
			components: [
				{ name: "table", label: "Table", active: true },
				{ name: "search-barcode", label: "Search barcode", active: true },
				{ name: "search-name", label: "Search name", active: true },
			],
		},
		{
			name: "closing",
			label: "Closing",
			url: "closing",
			icon: KeyRound,
			position: 5,
			components: [
				{ name: "card", label: "Card", active: true },
				{ name: "cash", label: "Cash", active: true },
				{ name: "close-day", label: "Close day", active: true },
			],
		},
	],
}

const ConfigProvider = ({ children }) => {
	const [config, setConfig] = useState(defaultConfig)

	const updateConfig = (newConfig) => {
		setConfig(newConfig)
		localStorage.setItem("config", JSON.stringify(newConfig))
	}

	const getModule = (name) => {
		return config.modules.find((module) => module.name === name)
	}

	const isActiveComponent = (moduleName, componentName) => {
		const module = getModule(moduleName)
		return module.components.find(
			(component) => component.name === componentName
		).active
	}

	useEffect(() => {
		const storedConfig = JSON.parse(localStorage.getItem("config") || "null")
		if (storedConfig) {
			setConfig(storedConfig)
		}
	}, [])

	return (
		<ConfigContext.Provider
			value={{ config, updateConfig, getModule, isActiveComponent }}
		>
			{children}
		</ConfigContext.Provider>
	)
}

export function useConfig() {
	const context = useContext(ConfigContext)
	if (!context) {
		throw new Error("useConfig must be used within a ConfigProvider")
	}
	return context
}

export default ConfigProvider
