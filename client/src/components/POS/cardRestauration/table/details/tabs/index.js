import { Tabs, TabsList, TabsTrigger } from "../../../../../ui/tabs"

export const RestaurantTabsSelector = ({
	value,
	tabs,
	onChange = () => null,
}) => {
	return (
		<Tabs defaultValue={value} className="w-full space-y-4">
			<TabsList className="w-full p-0">
				{tabs.map((tab) => (
					<TabsTrigger
						key={tab.name}
						value={tab.name}
						className={`w-full ${
							value === tab.name
								? "!bg-slate-900 !text-white"
								: "!bg-transparent !shadow-none !text-inherit"
						}`}
						onClick={() => onChange(tab.name)}
					>
						{tab.label}
					</TabsTrigger>
				))}
			</TabsList>
		</Tabs>
	)
}
