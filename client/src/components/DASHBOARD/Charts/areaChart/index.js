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

export function MonthSalesChart({ monthString, month, year }) {
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
							Sales
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
					{selectedTab === tabs[0].name ? (
						<>
							{chartData.length === 0 ? (
								<div className="flex flex-col items-center justify-center space-y-8 ">
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
					) : (
						isActiveComponent("dashboard", "table-monthly-sales") && (
							<TableMonthSales month={month} year={year} />
						)
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

const formatMonthData = (sales, month, year) => {
	// Use reduce to accumulate sales data by day
	const formattedData = sales.reduce((acc, sale) => {
		const day = sale.sale_day

		// Initialize the day's data if it doesn't exist
		if (!acc[day]) {
			acc[day] = {
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
		}

		// Add the current sale's data to the accumulator
		acc[day] = {
			...acc[day],
			ht1:
				Math.round(
					(acc[day].ht1 + parseFloat(sale.sale_taxes?.ht1 || 0)) * 100
				) / 100,
			ht2:
				Math.round(
					(acc[day].ht2 + parseFloat(sale.sale_taxes?.ht2 || 0)) * 100
				) / 100,
			ht3:
				Math.round(
					(acc[day].ht3 + parseFloat(sale.sale_taxes?.ht3 || 0)) * 100
				) / 100,
			tva1:
				Math.round(
					(acc[day].tva1 + parseFloat(sale.sale_taxes?.tva1 || 0)) * 100
				) / 100,
			tva2:
				Math.round(
					(acc[day].tva2 + parseFloat(sale.sale_taxes?.tva2 || 0)) * 100
				) / 100,
			tva3:
				Math.round(
					(acc[day].tva3 + parseFloat(sale.sale_taxes?.tva3 || 0)) * 100
				) / 100,
			cash:
				Math.round(
					(acc[day].cash + parseFloat(sale.sale_payment_methods?.cash || 0)) *
						100
				) / 100,
			card:
				Math.round(
					(acc[day].card + parseFloat(sale.sale_payment_methods?.card || 0)) *
						100
				) / 100,
			check:
				Math.round(
					(acc[day].check + parseFloat(sale.sale_payment_methods?.check || 0)) *
						100
				) / 100,
			total:
				Math.round((acc[day].total + parseFloat(sale.sale_amount || 0)) * 100) /
				100,
		}

		// Calculate totals after updating HT and TVA
		acc[day].total1 = Math.round((acc[day].ht1 + acc[day].tva1) * 100) / 100
		acc[day].total2 = Math.round((acc[day].ht2 + acc[day].tva2) * 100) / 100
		acc[day].total3 = Math.round((acc[day].ht3 + acc[day].tva3) * 100) / 100

		return acc
	}, {})

	// Convert to array format
	const formattedDataArray = Object.entries(formattedData).map(
		([day, data]) => ({
			day: `${String(day).padStart(2, "0")}/${String(month).padStart(
				2,
				"0"
			)}/${year}`,
			...Object.fromEntries(
				Object.entries(data).map(([key, value]) => [
					key,
					typeof value === "number" ? value.toFixed(2) : value,
				])
			),
		})
	)

	const monthTotal = formattedDataArray.reduce(
		(total, dayData) => {
			return {
				day: "Total",
				ht1: roundUpToTwoDecimals(
					parseFloat(total.ht1) + parseFloat(dayData.ht1)
				),
				ht2: roundUpToTwoDecimals(
					parseFloat(total.ht2) + parseFloat(dayData.ht2)
				),
				ht3: roundUpToTwoDecimals(
					parseFloat(total.ht3) + parseFloat(dayData.ht3)
				),
				tva1: roundUpToTwoDecimals(
					parseFloat(total.tva1) + parseFloat(dayData.tva1)
				),
				tva2: roundUpToTwoDecimals(
					parseFloat(total.tva2) + parseFloat(dayData.tva2)
				),
				tva3: roundUpToTwoDecimals(
					parseFloat(total.tva3) + parseFloat(dayData.tva3)
				),
				total1: roundUpToTwoDecimals(
					parseFloat(total.total1) + parseFloat(dayData.total1)
				),
				total2: roundUpToTwoDecimals(
					parseFloat(total.total2) + parseFloat(dayData.total2)
				),
				total3: roundUpToTwoDecimals(
					parseFloat(total.total3) + parseFloat(dayData.total3)
				),
				cash: roundUpToTwoDecimals(
					parseFloat(total.cash) + parseFloat(dayData.cash)
				),
				card: roundUpToTwoDecimals(
					parseFloat(total.card) + parseFloat(dayData.card)
				),
				check: roundUpToTwoDecimals(
					parseFloat(total.check) + parseFloat(dayData.check)
				),
				total: roundUpToTwoDecimals(
					parseFloat(total.total) + parseFloat(dayData.total)
				),
			}
		},
		{
			day: "Total",
			ht1: "0.00",
			ht2: "0.00",
			ht3: "0.00",
			tva1: "0.00",
			tva2: "0.00",
			tva3: "0.00",
			total1: "0.00",
			total2: "0.00",
			total3: "0.00",
			cash: "0.00",
			card: "0.00",
			check: "0.00",
			total: "0.00",
		}
	)

	return [...formattedDataArray, monthTotal]
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
