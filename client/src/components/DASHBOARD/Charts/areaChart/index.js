"use client"

import { CircleOff } from "lucide-react"
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts"
import * as XLSX from "xlsx/xlsx.mjs"

import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "../../../ui/card"
import {
	ChartContainer,
	ChartTooltip,
	ChartTooltipContent,
} from "../../../ui/chart"
import { useQuery } from "../../../../lib/hooks/useQuery"
import { getMonthSales } from "../../../../lib/api"
import { useNotify } from "../../../../lib/hooks/useNotify"
import { useEffect, useState } from "react"
import { Stack } from "@mui/material"
import { Tabs, TabsList, TabsTrigger } from "../../../ui/tabs"
import { Button } from "../../../ui/button"
import { DataGrid } from "../../../shared/datagrid"
import { useConfig } from "../../../../lib/hooks/useConfig"
import { roundUpToTwoDecimals } from "../../../../lib/pos"
import { BestSellers } from "../../best-sellers"

const chartConfig = {
	sales: {
		label: "Sales",
		color: "hsl(var(--chart-1))",
	},
}

const tabs = [
	{
		name: "chart-monthly-sales",
		label: "Chart",
	},
	{
		name: "table-monthly-sales",
		label: "Table",
	},
	{
		name: "best-sellers",
		label: "Best Sellers",
	},
]

const formatData = (data) => {
	// sum up the sales amount for each day
	const formattedData = data.reduce((acc, sale) => {
		const day = sale.sale_day
		acc[day] = (acc[day] || 0) + parseFloat(sale.sale_amount)
		return acc
	}, {})

	// convert the formattedData to an array of objects with day and amount
	const formattedDataArray = Object.entries(formattedData).map(
		([day, amount]) => {
			return {
				day,
				amount,
			}
		}
	)

	return formattedDataArray
}

export function MonthSalesChart({ monthString, month, year, date }) {
	const { notifyError } = useNotify()
	const [chartData, setChartData] = useState([])
	const [selectedTab, setSelectedTab] = useState()
	const { config, isActiveComponent } = useConfig()

	const queryGetMonthSales = useQuery({
		queryFn: getMonthSales,
		onSuccess: (data) => {
			setChartData(formatData(data))
		},
		onError: () => {
			notifyError("An error occurred while fetching the month sales")
		},
	})

	const sectionTitle = () => {
		const selectedTabInfo = tabs.find((tab) => tab.name === selectedTab)
		if (!selectedTabInfo) return ""

		return selectedTab === tabs[2].name
			? selectedTabInfo.label
			: `Sales ${selectedTabInfo.label}`
	}

	const exportToExcel = () => {
		let wb = XLSX.utils.table_to_book(
			document.getElementById("month-sales-table")
		)
		XLSX.writeFile(wb, `${year}-${month}.xlsx`)
	}

	const fetchData = async () => {
		queryGetMonthSales.send({
			month,
			year,
		})
	}

	const displayableTabs = () =>
		tabs.filter((tab) => isActiveComponent("dashboard", tab.name))

	useEffect(() => {
		if (month && year) {
			fetchData()
		}
	}, [month, year])

	useEffect(() => {
		if (displayableTabs().length > 0) {
			setSelectedTab(displayableTabs()[0].name)
		} else {
			setSelectedTab(null)
		}
	}, [config])

	return (
		<Card className="flex flex-col overflow-hidden h-full">
			<div className="flex flex-col h-full relative">
				<CardHeader>
					<CardTitle>
						<Stack
							direction="row"
							spacing={2}
							className="justify-between items-center"
						>
							{sectionTitle()}
							<Stack direction="row" spacing={2}>
								{selectedTab === tabs[1].name &&
									isActiveComponent("dashboard", "table-monthly-sales") && (
										<Button
											onClick={exportToExcel}
											disabled={chartData.length === 0}
										>
											Export to Excel
										</Button>
									)}
								{displayableTabs().length > 1 && (
									<Tabs
										value={selectedTab}
										onValueChange={setSelectedTab}
										className="h-full"
									>
										<TabsList className="w-full">
											{displayableTabs().map((tab) => (
												<TabsTrigger
													key={tab.name}
													value={tab.name}
													className="w-full"
												>
													{tab.label}
												</TabsTrigger>
											))}
										</TabsList>
									</Tabs>
								)}
							</Stack>
						</Stack>
					</CardTitle>
					<CardDescription>
						Showing total sales for {monthString} {year}
					</CardDescription>
				</CardHeader>
				<CardContent className="h-full overflow-auto">
					{selectedTab === tabs[0].name && (
						<>
							{chartData.length === 0 ? (
								<div className="flex flex-col items-center justify-center space-y-8 h-full">
									<CircleOff className="w-10 h-10 text-gray-200" />
									<p className="text-md text-gray-500">
										No sales data available
									</p>
								</div>
							) : (
								isActiveComponent("dashboard", "chart-monthly-sales") && (
									<ChartContainer
										config={chartConfig}
										className="h-full w-full"
									>
										<AreaChart
											accessibilityLayer
											data={chartData}
											margin={{
												left: 3,
												right: 3,
											}}
										>
											<CartesianGrid vertical={false} />
											<XAxis
												dataKey="day"
												tickLine={false}
												axisLine={false}
												tickMargin={8}
												tickFormatter={(value) => value.slice(0, 3)}
											/>
											<ChartTooltip
												cursor={false}
												content={<ChartTooltipContent indicator="line" />}
											/>
											<Area
												dataKey="amount"
												type="natural"
												fill="var(--color-desktop)"
												fillOpacity={0.4}
												stroke="var(--color-desktop)"
											/>
										</AreaChart>
									</ChartContainer>
								)
							)}
						</>
					)}
					{selectedTab === tabs[1].name &&
						isActiveComponent("dashboard", "table-monthly-sales") && (
							<TableMonthSales month={month} year={year} />
						)}
					{selectedTab === tabs[2].name &&
						isActiveComponent("dashboard", "best-sellers") && (
							<BestSellers date={date} className="h-full w-full" />
						)}
				</CardContent>
			</div>
		</Card>
	)
}

const columns = [
	{
		label: "Date",
		field: "day",
		align: "left",
		className: "text-left",
	},
	{
		label: "Food",
		field: "total1",
		align: "right",
		className: "text-right",
	},
	{
		label: "Magazine",
		field: "total2",
		align: "right",
		className: "text-right",
	},
	{
		label: "Other",
		field: "total3",
		align: "right",
		className: "text-right",
	},
	{
		label: "HT Food",
		field: "ht1",
		align: "right",
		className: "text-right",
	},
	{
		label: "HT Magazine",
		field: "ht2",
		align: "right",
		className: "text-right",
	},
	{
		label: "HT Other",
		field: "ht3",
		align: "right",
		className: "text-right",
	},
	{
		label: "TVA Food",
		field: "tva1",
		align: "right",
		className: "text-right",
	},
	{
		label: "TVA Magazine",
		field: "tva2",
		align: "right",
		className: "text-right",
	},
	{
		label: "TVA Other",
		field: "tva3",
		align: "right",
		className: "text-right",
	},
	{
		label: "Cash",
		field: "cash",
		align: "right",
		highlight: "gray",
		className: "text-right",
	},
	{
		label: "Card",
		field: "card",
		align: "right",
		highlight: "gray",
		className: "text-right",
	},
	{
		label: "Check",
		field: "check",
		align: "right",
		highlight: "gray",
		className: "text-right",
	},
	{
		label: "Total",
		field: "total",
		align: "right",
		highlight: "dark",
		className: "text-right",
	},
]

// Helper for rounding to 2 decimals
const round2 = (num) => Math.round(num * 100) / 100

const formatMonthData = (sales, month, year) => {
	const dailyTotals = {}

	// 1. Accumulate raw totals per day
	sales.forEach((sale) => {
		const day = sale.sale_day
		if (!dailyTotals[day]) {
			dailyTotals[day] = {
				ht1: 0,
				ht2: 0,
				ht3: 0,
				tva1: 0,
				tva2: 0,
				tva3: 0,
				cash: 0,
				card: 0,
				check: 0,
				total: 0,
			}
		}

		const taxes = sale.sale_taxes || {}
		const payments = sale.sale_payment_methods || {}

		dailyTotals[day].ht1 += parseFloat(taxes.ht1 || 0)
		dailyTotals[day].ht2 += parseFloat(taxes.ht2 || 0)
		dailyTotals[day].ht3 += parseFloat(taxes.ht3 || 0)

		dailyTotals[day].tva1 += parseFloat(taxes.tva1 || 0)
		dailyTotals[day].tva2 += parseFloat(taxes.tva2 || 0)
		dailyTotals[day].tva3 += parseFloat(taxes.tva3 || 0)

		dailyTotals[day].cash += parseFloat(payments.cash || 0)
		dailyTotals[day].card += parseFloat(payments.card || 0)
		dailyTotals[day].check += parseFloat(payments.check || 0)

		dailyTotals[day].total += parseFloat(sale.sale_amount || 0)
	})

	// 2. Finalize each day's data (rounding and string formatting applied here)
	const formattedDataArray = Object.entries(dailyTotals).map(([day, data]) => {
		const ht1 = round2(data.ht1)
		const ht2 = round2(data.ht2)
		const ht3 = round2(data.ht3)

		const tva1 = round2(data.tva1)
		const tva2 = round2(data.tva2)
		const tva3 = round2(data.tva3)

		return {
			day: `${String(day).padStart(2, "0")}/${String(month).padStart(
				2,
				"0"
			)}/${year}`,
			ht1: ht1,
			ht2: ht2,
			ht3: ht3,
			tva1: tva1,
			tva2: tva2,
			tva3: tva3,
			total1: round2(ht1 + tva1),
			total2: round2(ht2 + tva2),
			total3: round2(ht3 + tva3),
			cash: round2(data.cash),
			card: round2(data.card),
			check: round2(data.check),
			total: round2(data.total),
		}
	})

	// 3. Monthly total from number values (updated: using numbers instead of fixed decimals)
	const monthTotalRaw = formattedDataArray.reduce(
		(sum, day) => {
			return {
				day: "Total",
				ht1: sum.ht1 + day.ht1,
				ht2: sum.ht2 + day.ht2,
				ht3: sum.ht3 + day.ht3,
				tva1: sum.tva1 + day.tva1,
				tva2: sum.tva2 + day.tva2,
				tva3: sum.tva3 + day.tva3,
				total1: sum.total1 + day.total1,
				total2: sum.total2 + day.total2,
				total3: sum.total3 + day.total3,
				cash: sum.cash + day.cash,
				card: sum.card + day.card,
				check: sum.check + day.check,
				total: sum.total + day.total,
			}
		},
		{
			day: "Total",
			ht1: 0,
			ht2: 0,
			ht3: 0,
			tva1: 0,
			tva2: 0,
			tva3: 0,
			total1: 0,
			total2: 0,
			total3: 0,
			cash: 0,
			card: 0,
			check: 0,
			total: 0,
		}
	)

	// 4. Convert final total fields to strings with 2 decimal places (new step added)
	const finalMonthTotal = Object.fromEntries(
		Object.entries(monthTotalRaw).map(([key, value]) =>
			key === "day" ? [key, value] : [key, round2(value).toFixed(2)]
		)
	)

	// 5. Format each day to have stringified values as well (optional consistency)
	const finalDataArray = formattedDataArray.map((day) => ({
		...day,
		...Object.fromEntries(
			Object.entries(day).map(([key, val]) =>
				key === "day" ? [key, val] : [key, val.toFixed(2)]
			)
		),
	}))

	return [...finalDataArray, finalMonthTotal]
}


const TableMonthSales = ({ month, year }) => {
	const { notifyError } = useNotify()
	const [data, setData] = useState([])

	const queryGetMonthSales = useQuery({
		queryFn: getMonthSales,
		onSuccess: (data) => {
			setData(formatMonthData(data, month, year))
		},
		onError: () => {
			notifyError("An error occurred while fetching the month sales")
		},
	})

	const fetchData = () => {
		queryGetMonthSales.send({
			month,
			year,
		})
	}

	useEffect(() => {
		if (month && year) {
			fetchData()
		}
	}, [month, year])

	return (
		<DataGrid
			id="month-sales-table"
			data={data}
			columns={columns}
			emptyMessage="No sales data available"
		/>
	)
}
