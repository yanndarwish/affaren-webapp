import { ReactComponent as Fr } from "../../../assets/flags/fr.svg"
import { ReactComponent as En } from "../../../assets/flags/en.svg"
import { DollarSign, Euro, PoundSterling } from "lucide-react"

export const currencyOptions = [
	{
		name: "EUR",
		label: "Euro",
		icon: Euro,
	},
	{
		name: "USD",
		label: "Dollar",
		icon: DollarSign,
	},
	{
		name: "GBP",
		label: "Pound",
		icon: PoundSterling,
	},
]

export const languageOptions = [
	{
		name: "fr",
		label: "Français",
		icon: Fr,
	},
	{
		name: "en",
		label: "English",
		icon: En,
	},
]
