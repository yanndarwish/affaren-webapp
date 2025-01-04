import { createContext, useContext, useState, useEffect } from "react"
import {
	Home,
	List,
	ChartSpline,
	Box,
	BadgePercent,
	Barcode,
	Layers2,
	BookmarkCheck,
	ShoppingCart,
	Undo2,
	ReceiptText,
	Computer,
	Banknote,
	CreditCard,
	Tag,
	Percent,
	DollarSign,
	Euro,
	Languages
} from "lucide-react"
import { NoBarcode } from "../../../pages/Pos/config"
import { currencyOptions, languageOptions } from "./utils"

const ConfigContext = createContext()

const defaultConfig = {
	general: {
		language: {
			name: "language",
			label: "Language",
			icon: Languages,
			description: "The language used by the application.",
			value: "en",
			options: languageOptions,
		},
		currency: {
			name: "currency",
			label: "Currency",
			icon: DollarSign,
			description: "The currency used by the business.",
			value: "EUR",
			symbol: Euro,
			options: currencyOptions,
		},
		paymentMethods: {
			name: "payment-methods",
			label: "Payment methods",
			icon: CreditCard,
			description: "The payment methods accepted by the business.",
			options: [
				{
					name: "cash",
					label: "Cash",
					icon: Banknote,
					active: true,
				},
				{
					name: "card",
					label: "Card",
					icon: CreditCard,
					active: true,
				},
				{
					name: "check",
					label: "Check",
					icon: Tag,
					active: true,
				},
			],
		},
		taxes: {
			name: "taxes",
			label: "Taxes",
			icon: Percent,
			description: "The taxes applied to the products sold by the business.",
			options: [
				{
					name: "normal",
					label: "Normal",
					value: 20,
					active: true,
				},
				{
					name: "intermediate",
					label: "Intermediate",
					value: 10,
					active: false,
				},
				{
					name: "reduced",
					label: "Reduced",
					value: 5.5,
					active: true,
				},
				{
					name: "particular",
					label: "Particular",
					value: 2.1,
					active: true,
				},
			],
		},
	},
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
					icon: Barcode,
					active: true,
					description:
						"The barcode component is used to scan products via barcode.",
					hasSettings: false,
				},
				{
					name: "cart",
					label: "Cart",
					icon: ShoppingCart,
					active: true,
					description: "The cart component is used to display the cart.",
					hasSettings: false,
				},
				{
					name: "shortcuts",
					label: "Shortcuts",
					icon: Layers2,
					active: true,
					description:
						"The shortcuts component is used to create and use shortcuts for recurrent products.",
					hasSettings: true,
				},
				{
					name: "no-barcode",
					label: "No barcode",
					icon: NoBarcode,
					active: true,
					description:
						"The no barcode component is used to sell products without scanning a barcode.",
					hasSettings: true,
				},
				{
					name: "bookmarks",
					label: "Bookmarks",
					icon: BookmarkCheck,
					active: true,
					description:
						"The bookmarks component is used to save sales for later.",
					hasSettings: false,
				},
				{
					name: "refund",
					label: "Refund",
					icon: Undo2,
					active: true,
					description: "The refund component is used to refund an amount.",
					hasSettings: false,
				},
				{
					name: "discount",
					label: "Discount",
					icon: BadgePercent,
					active: true,
					description: "The discount component is used to apply a discount.",
					hasSettings: false,
				},
				{
					name: "drawer",
					label: "Drawer",
					icon: Computer,
					active: true,
					description:
						"The drawer component is used to pair a drawer with the point of sale.",
					hasSettings: false,
				},
				{
					name: "receipt",
					label: "Receipt",
					icon: ReceiptText,
					active: true,
					description:
						"The receipt component is used to pair a receipt printer with the point of sale.",
					hasSettings: false,
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
					hasSettings: false,
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
					hasSettings: false,
				},
				{
					name: "table-monthly-sales",
					label: "Monthly table",
					active: true,
					description:
						"The monthly table component is used to display the monthly sales in a table.",
					hasSettings: false,
				},
				{
					name: "table-monthly-best-sellers",
					label: "Monthly best sellers",
					active: false,
					description:
						"The monthly best sellers component is used to display the best selling products in a table.",
					hasSettings: false,
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
				{
					name: "table",
					label: "Table",
					active: true,
					description:
						"The table component is used to display the inventory in a table.",
					hasSettings: false,
				},
				{
					name: "search-barcode",
					label: "Search barcode",
					active: true,
					description:
						"The search barcode component is used to search for a product by barcode.",
					hasSettings: false,
				},
				{
					name: "search-name",
					label: "Search name",
					active: true,
					description:
						"The search name component is used to search for a product by name.",
					hasSettings: false,
				},
			],
		},
		// {
		// 	name: "closing",
		// 	label: "Closing",
		// 	url: "closing",
		// 	icon: KeyRound,
		// 	position: 5,
		// 	isMutable: true,
		// 	active: true,
		// 	description:
		// 		"The closing module is used to apply a routine closing of the day.",
		// 	components: [
		// 		{
		// 			name: "card",
		// 			label: "Card",
		// 			active: true,
		// 			description:
		// 				"The card component is used to implement a card closing routine",
		// 			hasSettings: false,
		// 		},
		// 		{
		// 			name: "cash",
		// 			label: "Cash",
		// 			active: true,
		// 			description:
		// 				"The cash component is used to implement a cash closing routine",
		// 			hasSettings: false,
		// 		},
		// 		{
		// 			name: "close-day",
		// 			label: "Close day",
		// 			active: true,
		// 			description: "The close day component is used to close the day.",
		// 			hasSettings: false,
		// 		},
		// 	],
		// },
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
		return config.modules.filter((module) => module.isMutable)
	}

	useEffect(() => {
		const storedConfig = JSON.parse(localStorage.getItem("config") || "null")
		if (storedConfig) {
			const modulesWithIcons = storedConfig.modules.map((storedModule) => {
				const defaultModule = defaultConfig.modules.find(
					(m) => m.name === storedModule.name
				)
				const componentsWithIcons = storedModule.components.map(
					(storedComponent) => {
						const defaultComponent = defaultModule.components.find(
							(c) => c.name === storedComponent.name
						)
						return {
							...storedComponent,
							icon: defaultComponent?.icon,
						}
					}
				)

				return {
					...storedModule,
					icon: defaultModule?.icon,
					components: componentsWithIcons,
				}
			})

			const paymentMethodsWithIcons = () => {
				const defaultPaymentMethods = defaultConfig.general.paymentMethods
				const optionsWithIcons =
					storedConfig.general.paymentMethods.options.map((option) => {
						return {
							...option,
							icon: defaultConfig.general.paymentMethods.options.find(
								(o) => o.name === option.name
							).icon,
						}
					})
				return {
					...defaultPaymentMethods,
					options: optionsWithIcons,
				}
			}

			const taxesWithIcons = () => {
				const defaultTaxes = defaultConfig.general.taxes

				return {
					...storedConfig.general.taxes,
					icon: defaultTaxes.icon,
				}
			}

			const currencyWithIcons = () => {
				const defaultCurrency = defaultConfig.general.currency


				return {
					...storedConfig.general.currency,
					icon: defaultCurrency.icon,
					symbol: defaultCurrency.options.find(
						(option) => option.name === storedConfig.general.currency.value
					).icon,
					options: defaultCurrency.options,
				}
			}

			const languageWithIcons = () => {
				const defaultLanguage = defaultConfig.general.language

				return {
					...storedConfig.general.language,
					icon: defaultLanguage.icon,
					options: defaultLanguage.options,
				}
			}

			setConfig({
				...storedConfig,
				modules: modulesWithIcons,
				general: {
					...storedConfig.general,
					language: languageWithIcons(),
					currency: currencyWithIcons(),
					paymentMethods: paymentMethodsWithIcons(),
					taxes: taxesWithIcons(),
				},
			})
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
