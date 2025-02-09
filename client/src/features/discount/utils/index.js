export const discountTypes = (currency) => [
	{ name: "percent", label: "Percent", unit: "%" },
	{
		name: "amount",
		label: "Amount",
		unit: <currency.symbol className="w-5 h-5" />,
	},
]
