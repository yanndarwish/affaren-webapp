"use client"

import * as React from "react"
import { PieChart, Pie, Label } from "recharts"

import {
	ChartContainer,
	ChartTooltip,
	ChartTooltipContent,
} from "../../../ui/chart"
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "../../../ui/card"
import { useEffect } from "react"
import { useQuery } from "../../../../lib/hooks/useQuery"
import { getSales } from "../../../../lib/api"

const chartData = [
	{ browser: "chrome", visitors: 275, fill: "var(--color-chrome)" },
	{ browser: "safari", visitors: 200, fill: "var(--color-safari)" },
	{ browser: "firefox", visitors: 287, fill: "var(--color-firefox)" },
	{ browser: "edge", visitors: 173, fill: "var(--color-edge)" },
	{ browser: "other", visitors: 190, fill: "var(--color-other)" },
]

const chartConfig = {
	visitors: {
		label: "Visitors",
	},
	chrome: {
		label: "Chrome",
		color: "hsl(var(--chart-1))",
	},
	safari: {
		label: "Safari",
		color: "hsl(var(--chart-2))",
	},
	firefox: {
		label: "Firefox",
		color: "hsl(var(--chart-3))",
	},
	edge: {
		label: "Edge",
		color: "hsl(var(--chart-4))",
	},
	other: {
		label: "Other",
		color: "hsl(var(--chart-5))",
	},
}

const getSalesTotal = (sales) => {
	return (
		Math.round(
			sales.reduce((acc, curr) => acc + parseFloat(curr.sale_amount), 0) * 100
		) / 100
	)
}

export function RepartitionChart({ date }) {
	const totalVisitors = React.useMemo(() => {
		return chartData.reduce((acc, curr) => acc + curr.visitors, 0)
	}, [])

	const queryGetDaysSales = useQuery({
		queryFn: getSales,
		onSuccess: (data) => {
			const sales = data.data
			const total = getSalesTotal(sales)
		},
		onError: (error) => {
			console.log(error)
		},
	})

	const fetchData = () => {
		queryGetDaysSales.send({
			dateFilters: {
				year: date?.getFullYear(),
				month: date?.getMonth() + 1,
				day: date?.getDate(),
			},
		})
	}

	useEffect(() => {
		fetchData()
	}, [date])

	return (
		<Card>
			<CardHeader>
				<CardTitle>Sales repartition</CardTitle>
				<CardDescription>
					Showing sales repartition for{" "}
					{date?.toLocaleString("en", {
						month: "long",
						year: "numeric",
						day: "numeric",
					})}
				</CardDescription>
			</CardHeader>
			<CardContent className="flex-1 pb-0">
				<ChartContainer
					config={chartConfig}
					className="mx-auto aspect-square max-h-[280px]"
				>
					<PieChart>
						<ChartTooltip
							cursor={false}
							content={<ChartTooltipContent hideLabel />}
						/>
						<Pie
							data={chartData}
							dataKey="visitors"
							nameKey="browser"
							innerRadius={60}
							strokeWidth={5}
						>
							<Label
								content={({ viewBox }) => {
									if (viewBox && "cx" in viewBox && "cy" in viewBox) {
										return (
											<text
												x={viewBox.cx}
												y={viewBox.cy}
												textAnchor="middle"
												dominantBaseline="middle"
											>
												<tspan
													x={viewBox.cx}
													y={viewBox.cy}
													className="fill-foreground text-3xl font-bold"
												>
													{totalVisitors.toLocaleString()}
												</tspan>
												<tspan
													x={viewBox.cx}
													y={(viewBox.cy || 0) + 24}
													className="fill-muted-foreground"
												>
													Visitors
												</tspan>
											</text>
										)
									}
								}}
							/>
						</Pie>
					</PieChart>
				</ChartContainer>
			</CardContent>
		</Card>
	)
}
