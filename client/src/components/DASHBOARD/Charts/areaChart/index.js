"use client"

import { CircleOff } from "lucide-react"
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts"
import * as XLSX from "xlsx/xlsx.mjs"

import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
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
import { EmptyData } from "../../../shared/emptyData"
import { Stack } from "@mui/material"
import { Tabs, TabsList, TabsTrigger } from "../../../ui/tabs"
import {
	Table,
	TableBody,
	TableCell,
	TableFooter,
	TableHead,
	TableHeader,
	TableRow,
} from "../../../ui/table"
import { Button } from "../../../ui/button"

const chartConfig = {
	sales: {
		label: "Sales",
		color: "hsl(var(--chart-1))",
	},
}

const tabs = [
	{
		name: "chart",
		label: "Chart",
	},
	{
		name: "table",
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
	const [selectedTab, setSelectedTab] = useState("chart")

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

	useEffect(() => {
		if (month && year) {
			fetchData()
		}
	}, [month, year])

	return (
		<Card className="">
			<CardHeader>
				<CardTitle>
					<Stack
						direction="row"
						spacing={2}
						className="justify-between items-center"
					>
						Sales
						<Stack direction="row" spacing={2}>
							{selectedTab === "table" && (
								<Button
									onClick={exportToExcel}
									disabled={chartData.length === 0}
								>
									Export to Excel
								</Button>
							)}
							<Tabs
								value={selectedTab}
								onValueChange={setSelectedTab}
								className="h-full"
							>
								<TabsList className="w-full">
									{tabs.map((tab) => (
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
						</Stack>
					</Stack>
				</CardTitle>
				<CardDescription>
					Showing total sales for {monthString} {year}
				</CardDescription>
			</CardHeader>
			<CardContent className="h-[calc(100vh-310px)]">
				{selectedTab === "chart" ? (
					<Card className="h-full relative overflow-hidden">
						{chartData.length === 0 ? (
							<div className="flex flex-col items-center justify-center space-y-8 h-full">
								<CircleOff className="w-10 h-10 text-gray-200" />
								<p className="text-md text-gray-500">No sales data available</p>
							</div>
						) : (
							<ChartContainer
								config={chartConfig}
								className="h-[calc(100vh-365px)] w-full"
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
						)}
					</Card>
				) : (
					<TableMonthSales month={month} year={year} />
				)}
			</CardContent>
		</Card>
	)
}

const columns = [
	{
		label: "Date",
		field: "day",
		className: "text-left",
	},
	{
		label: "Food",
		field: "total1",
		className: "text-right",
	},
	{
		label: "Magazine",
		field: "total2",
		className: "text-right",
	},
	{
		label: "Other",
		field: "total3",
		className: "text-right",
	},
	{
		label: "HT Food",
		field: "ht1",
		className: "text-right",
	},
	{
		label: "HT Magazine",
		field: "ht2",
		className: "text-right",
	},
	{
		label: "HT Other",
		field: "ht3",
		className: "text-right",
	},
	{
		label: "TVA Food",
		field: "tva1",
		className: "text-right",
	},
	{
		label: "TVA Magazine",
		field: "tva2",
		className: "text-right",
	},
	{
		label: "TVA Other",
		field: "tva3",
		className: "text-right",
	},
	{
		label: "Cash",
		field: "cash",
		className: "text-right",
	},
	{
		label: "Card",
		field: "card",
		className: "text-right",
	},
	{
		label: "Check",
		field: "check",
		className: "text-right",
	},
	{
		label: "Total",
		field: "total",
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
			day: `${day}/${month}/${year}`,
			...data,
		})
	)

	const monthTotal = formattedDataArray.reduce(
		(total, dayData) => {
			return {
				day: "Total",
				ht1: Math.round((total.ht1 + dayData.ht1) * 100) / 100,
				ht2: Math.round((total.ht2 + dayData.ht2) * 100) / 100,
				ht3: Math.round((total.ht3 + dayData.ht3) * 100) / 100,
				tva1: Math.round((total.tva1 + dayData.tva1) * 100) / 100,
				tva2: Math.round((total.tva2 + dayData.tva2) * 100) / 100,
				tva3: Math.round((total.tva3 + dayData.tva3) * 100) / 100,
				total1: Math.round((total.total1 + dayData.total1) * 100) / 100,
				total2: Math.round((total.total2 + dayData.total2) * 100) / 100,
				total3: Math.round((total.total3 + dayData.total3) * 100) / 100,
				cash: Math.round((total.cash + dayData.cash) * 100) / 100,
				card: Math.round((total.card + dayData.card) * 100) / 100,
				check: Math.round((total.check + dayData.check) * 100) / 100,
				total: Math.round((total.total + dayData.total) * 100) / 100,
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
		<Card className="flex flex-col h-[calc(100vh-200px)]">
			<div className="flex flex-col h-full">
				{/* Sticky Header */}
				<div className="sticky top-0 z-20 bg-white border-b">
					<Table>
						<TableHeader>
							<TableRow>
								{columns.map((column, index) => (
									<TableHead key={index} className={column.className}>
										{column.label}
									</TableHead>
								))}
							</TableRow>
						</TableHeader>
					</Table>
				</div>
				<div id="scrollable-body" className="flex-1 overflow-auto">
					<Table>
						<TableBody>
							{/* Empty state rows to maintain height */}
							{!data || data.length === 1 ? (
								<EmptyData
									message="No sales data available"
									span={columns.length + 1}
									className="h-[calc(100vh-350px)]"
								/>
							) : (
								data?.map(
									(sale, i) =>
										i < data.length - 1 && (
											<TableRow
												key={i}
												className={
													i === data.length - 1
														? "bg-gray-100 font-bold sticky bottom-0"
														: ""
												}
											>
												<TableCell className="text-left">{sale.day}</TableCell>
												<TableCell className="text-right">
													{sale.total1}
												</TableCell>
												<TableCell className="text-right">
													{sale.total2}
												</TableCell>
												<TableCell className="text-right">
													{sale.total3}
												</TableCell>
												<TableCell className="text-right">{sale.ht1}</TableCell>
												<TableCell className="text-right">{sale.ht2}</TableCell>
												<TableCell className="text-right">{sale.ht3}</TableCell>
												<TableCell className="text-right">
													{sale.tva1}
												</TableCell>
												<TableCell className="text-right">
													{sale.tva2}
												</TableCell>
												<TableCell className="text-right">
													{sale.tva3}
												</TableCell>
												<TableCell
													className={`text-right ${
														i === data.length - 1
															? "bg-gray-100"
															: "bg-gray-50 font-medium"
													}`}
												>
													{sale.cash}
												</TableCell>
												<TableCell
													className={`text-right ${
														i === data.length - 1
															? "bg-gray-100"
															: "bg-gray-50 font-medium"
													}`}
												>
													{sale.card}
												</TableCell>
												<TableCell
													className={`text-right ${
														i === data.length - 1
															? "bg-gray-100"
															: "bg-gray-50 font-medium"
													}`}
												>
													{sale.check}
												</TableCell>
												<TableCell className="text-right font-bold bg-gray-100">
													{sale.total}
												</TableCell>
											</TableRow>
										)
								)
							)}
						</TableBody>
						<TableFooter className="sticky bottom-0 bg-white border-t">
							<TableRow className="bg-gray-100 font-bold">
								<TableCell className="text-left">
									{data[data.length - 1]?.day}
								</TableCell>
								<TableCell className="text-right">
									{data[data.length - 1]?.total1}
								</TableCell>
								<TableCell className="text-right">
									{data[data.length - 1]?.total2}
								</TableCell>
								<TableCell className="text-right">
									{data[data.length - 1]?.total3}
								</TableCell>
								<TableCell className="text-right">
									{data[data.length - 1]?.ht1}
								</TableCell>
								<TableCell className="text-right">
									{data[data.length - 1]?.ht2}
								</TableCell>
								<TableCell className="text-right">
									{data[data.length - 1]?.ht3}
								</TableCell>
								<TableCell className="text-right">
									{data[data.length - 1]?.tva1}
								</TableCell>
								<TableCell className="text-right">
									{data[data.length - 1]?.tva2}
								</TableCell>
								<TableCell className="text-right">
									{data[data.length - 1]?.tva3}
								</TableCell>
								<TableCell>{data[data.length - 1]?.cash}</TableCell>
								<TableCell>{data[data.length - 1]?.card}</TableCell>
								<TableCell>{data[data.length - 1]?.check}</TableCell>
								<TableCell className="text-right font-bold bg-gray-100">
									{data[data.length - 1]?.total}
								</TableCell>
							</TableRow>
						</TableFooter>
					</Table>
				</div>
			</div>
		</Card>
	)
}
