import { createContext, useContext, useState, useEffect } from "react"
import { Home, List, ChartSpline, Box, KeyRound, Settings } from "lucide-react"
const ConfigContext = createContext()

const defaultConfig = {
	modules: [
		{
			name: "pos",
			label: "Point of sale",
			url: "pos",
			icon: Home,
			position: 1,
			isMutable: false,
			active: true,
			description:
				"The point of sale module is the main module of the application, where you can sell products to customers.",
			components: [
				{
					name: "barcode",
					label: "Barcode",
					active: true,
					description:
						"The barcode component is used to scan products via barcode.",
				},
				{
					name: "cart",
					label: "Cart",
					active: true,
					description: "The cart component is used to display the cart.",
				},
				{
					name: "shortcuts",
					label: "Shortcuts",
					active: true,
					description:
						"The shortcuts component is used to create and use shortcuts for recurrent products.",
				},
				{
					name: "no-barcode",
					label: "No barcode",
					active: true,
					description:
						"The no barcode component is used to sell products without scanning a barcode.",
				},
				{
					name: "bookmarks",
					label: "Bookmarks",
					active: true,
					description:
						"The bookmarks component is used to save sales for later.",
				},
				{
					name: "refund",
					label: "Refund",
					active: true,
					description: "The refund component is used to refund an amount.",
				},
				{
					name: "discount",
					label: "Discount",
					active: true,
					description: "The discount component is used to apply a discount.",
				},
				{
					name: "drawer",
					label: "Drawer",
					active: true,
					description:
						"The drawer component is used to pair a drawer with the point of sale.",
				},
				{
					name: "receipt",
					label: "Receipt",
					active: true,
					description:
						"The receipt component is used to pair a receipt printer with the point of sale.",
				},
			],
		},
		{
			name: "sales",
			label: "Sales",
			url: "sales",
			icon: List,
			position: 2,
			isMutable: true,
			active: true,
			description: "The sales module is used to display and manage sales.",
			components: [
				{
					name: "table",
					label: "Table",
					active: true,
					description:
						"The table component is used to display the sales in a table.",
				},
			],
		},
		{
			name: "dashboard",
			label: "Dashboard",
			url: "dashboard",
			icon: ChartSpline,
			position: 3,
			isMutable: true,
			active: true,
			description:
				"The dashboard module is used to display the business metrics in a dashboard.",
			components: [
				{
					name: "chart-monthly-sales",
					label: "Monthly chart",
					active: true,
					description:
						"The monthly chart component is used to display the monthly sales in a chart.",
				},
				{
					name: "table-monthly-sales",
					label: "Monthly table",
					active: true,
					description:
						"The monthly table component is used to display the monthly sales in a table.",
				},
				{
					name: "table-monthly-best-sellers",
					label: "Monthly best sellers",
					active: false,
					description:
						"The monthly best sellers component is used to display the best selling products in a table.",
				},
			],
		},
		{
			name: "inventory",
			label: "Inventory",
			url: "inventory",
			icon: Box,
			position: 4,
			isMutable: true,
			active: true,
			description: "The inventory module is used to manage the inventory.",
			components: [
				{ name: "table", label: "Table", active: true },
				{
					name: "search-barcode",
					label: "Search barcode",
					active: true,
					description:
						"The search barcode component is used to search for a product by barcode.",
				},
				{
					name: "search-name",
					label: "Search name",
					active: true,
					description:
						"The search name component is used to search for a product by name.",
				},
			],
		},
		{
			name: "closing",
			label: "Closing",
			url: "closing",
			icon: KeyRound,
			position: 5,
			isMutable: true,
			active: true,
			description:
				"The closing module is used to apply a routine closing of the day.",
			components: [
				{
					name: "card",
					label: "Card",
					active: true,
					description:
						"The card component is used to implement a card closing routine",
				},
				{
					name: "cash",
					label: "Cash",
					active: true,
					description:
						"The cash component is used to implement a cash closing routine",
				},
				{
					name: "close-day",
					label: "Close day",
					active: true,
					description: "The close day component is used to close the day.",
				},
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

	const getMutableModules = () => {
		console.log(config.modules)
		return config.modules.filter((module) => module.isMutable)
	}

	useEffect(() => {
		const storedConfig = JSON.parse(localStorage.getItem("config") || "null")
		if (storedConfig) {
			const modulesWithIcons = storedConfig.modules.map((module) => ({
				...module,
				icon: defaultConfig.modules.find((m) => m.name === module.name).icon,
			}))

			setConfig({ ...storedConfig, modules: modulesWithIcons })
		}
	}, [])

	return (
		<ConfigContext.Provider
			value={{
				config,
				updateConfig,
				getModule,
				isActiveComponent,
				getMutableModules,
			}}
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
