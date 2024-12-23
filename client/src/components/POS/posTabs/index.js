import { tabs } from "../../../lib/pos/utils"

export const PosTabs = ({ selectedTab, setSelectedTab }) => {
	return (
		<div>
			<div className="sm:hidden">
				<label htmlFor="Tab" className="sr-only">
					Tab
				</label>

				<select
					id="Tab"
					className="w-full rounded-md border-gray-200"
					value={selectedTab.name}
					onChange={(e) =>
						setSelectedTab(tabs.find((t) => t.name === e.target.value))
					}
				>
					{tabs.map((tab) => (
						<option key={tab.name} value={tab.name}>
							{tab.label}
						</option>
					))}
				</select>
			</div>

			<div className="hidden sm:block">
				<nav className="flex gap-6" aria-label="Tabs">
					{tabs.map((tab) => (
						<a
							key={tab.name}
							href="#"
							onClick={() => setSelectedTab(tab)}
							className={`shrink-0 rounded-lg p-2 text-sm font-medium ${
								tab.name === selectedTab.name
									? "bg-blue-100 text-blue-600"
									: "text-gray-500 hover:bg-gray-50 hover:text-gray-700 "
							}`}
						>
							{tab.label}
						</a>
					))}
				</nav>
			</div>
		</div>
	)
}
