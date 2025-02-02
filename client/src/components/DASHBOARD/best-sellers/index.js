import { useEffect, useState } from "react"
import * as XLSX from "xlsx/xlsx.mjs"

import { useNotify } from "../../../lib/hooks/useNotify"
import { useQuery } from "../../../lib/hooks/useQuery"
import { getProductCategories, getSoldProducts } from "../../../lib/api"
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "../../ui/card"
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "../../ui/table"
import { CircleOff, Percent, ShoppingBasket } from "lucide-react"
import { Stack } from "@mui/material"
import { Tabs, TabsList, TabsTrigger } from "../../ui/tabs"
import { roundUpToTwoDecimals } from "../../../lib/pos"
import { Checkbox } from "../../ui/checkbox"
import { useConfig } from "../../../lib/hooks/useConfig"
import { Button } from "../../ui/button"

const tabs = [
	{
		value: "day",
		label: "Day",
	},
	{
		value: "month",
		label: "Month",
	},
	{
		value: "year",
		label: "Year",
	},
]

export const BestSellers = ({ date }) => {
	const { notifyError } = useNotify()
	const { config } = useConfig()

	const [data, setData] = useState([])
	const [selectedRows, setSelectedRows] = useState([])
	const [selectedTab, setSelectedTab] = useState(tabs[1].value)
	const [selectedCategory, setSelectedCategory] = useState(null)
	const [productCategories, setProductCategories] = useState([])
	const [granularityTotal, setGranularityTotal] = useState(0)

	const queryGetProductCategories = useQuery({
		queryFn: getProductCategories,
		onSuccess: (data) => {
			setProductCategories(data)
		},
		onError: () => {
			notifyError("An error occurred while fetching the product categories")
		},
	})

	const queryGetSoldProducts = useQuery({
		queryFn: getSoldProducts,
		onSuccess: (data) => {
			setData(data.data.data)
			setGranularityTotal(data.data.granularityTotal)
			setSelectedRows(data.data.data)
		},
		onError: () => {
			notifyError("An error occurred while fetching the sold products")
		},
	})

	const exportToExcel = () => {
		let wb = XLSX.utils.table_to_book(
			document.getElementById("best-sellers-table")
		)

		XLSX.writeFile(wb, `${fileName()}.xlsx`)
	}

	const fileName = () => {
		const formattedDate = formatDate(date)

		let formattedDateForFile = formattedDate
		if (selectedTab === "year") {
			formattedDateForFile = formattedDate.split("-")[0] // YYYY
		} else if (selectedTab === "month") {
			formattedDateForFile = formattedDate.substring(0, 7) // YYYY-MM
		}

		const categoryName = selectedCategory
			? productCategories.find(
					(category) => category.product_category_id === selectedCategory
			  )?.product_category_name
			: "all-categories"

		return `best-sellers-${formattedDateForFile}-${categoryName}.xlsx`
	}

	const bestSellersTotal = roundUpToTwoDecimals(
		data.reduce((acc, curr) => acc + Number(curr.total_price), 0)
	)

	const selectedTotal = roundUpToTwoDecimals(
		selectedRows.reduce((acc, curr) => acc + Number(curr.total_price), 0)
	)

	const selectedPercentage =
		granularityTotal !== 0
			? roundUpToTwoDecimals(
					(Number(selectedTotal) / Number(granularityTotal)) * 100
			  )
			: roundUpToTwoDecimals(0)

	const showPercentage = selectedRows.length !== data.length || selectedCategory

	const showAmount =
		selectedTotal !== roundUpToTwoDecimals(granularityTotal) &&
		selectedTotal !== bestSellersTotal

	const percentageDescription = () => {
		if (selectedRows.length === data.length) {
			return `Percentage of revenue generated from ${
				productCategories.find(
					(category) => category.product_category_id === selectedCategory
				)?.product_category_name
			}`
		} else {
			return `Percentage of revenue generated from selected products`
		}
	}

	const handleSelect = (row) => {
		if (selectedRows.find((r) => r.product_id === row.product_id)) {
			setSelectedRows(
				selectedRows.filter((r) => r.product_id !== row.product_id)
			)
		} else {
			setSelectedRows([...selectedRows, row])
		}
	}

	const handleSelectAll = () => {
		if (selectedRows.length === data.length) {
			setSelectedRows([])
		} else {
			setSelectedRows(data)
		}
	}

	const handleChangeTab = (tab) => {
		setSelectedTab(tab)
		setSelectedRows([])
	}

	const handleChangeCategory = (category) => {
		if (category === selectedCategory) {
			setSelectedCategory(null)
		} else {
			setSelectedCategory(category)
		}
	}

	const fetchSoldProducts = () => {
		const formattedDate = formatDate(date)

		queryGetSoldProducts.send({
			date: formattedDate,
			granularity: selectedTab,
			category: selectedCategory,
		})
	}

	useEffect(() => {
		fetchSoldProducts()
	}, [date, selectedTab, selectedCategory])

	useEffect(() => {
		queryGetProductCategories.send()
	}, [])

	return (
		<Stack spacing={2} className="h-full">
			<Stack direction="row" spacing={2} className="w-full">
				<Tabs defaultValue={selectedCategory} className="w-full space-y-4">
					<TabsList className="w-full p-0">
						{productCategories.map((tab) => (
							<TabsTrigger
								key={tab.product_category_id}
								value={tab.product_category_id}
								className={`w-full ${
									selectedCategory === tab.product_category_id
										? "!bg-slate-900 !text-white"
										: "!bg-transparent !shadow-none !text-inherit"
								}`}
								onClick={() => handleChangeCategory(tab.product_category_id)}
							>
								{tab.product_category_name}
							</TabsTrigger>
						))}
					</TabsList>
				</Tabs>
				<Tabs value={selectedTab} onValueChange={handleChangeTab}>
					<TabsList className="w-full">
						{tabs.map((tab) => (
							<TabsTrigger key={tab.value} value={tab.value} className="w-full">
								{tab.label}
							</TabsTrigger>
						))}
					</TabsList>
				</Tabs>
				<Button onClick={exportToExcel} disabled={data.length === 0}>
					Export to Excel
				</Button>
			</Stack>

			<div className="w-full h-full grid grid-cols-4 gap-4 overflow-hidden">
				<Card className="h-full w-full flex flex-col overflow-hidden col-span-2">
					<Table id="best-sellers-table">
						<TableHeader>
							<TableRow>
								<TableHead className="text-left">
									<Checkbox
										checked={
											data.length > 0 && selectedRows.length === data.length
										}
										onCheckedChange={() => handleSelectAll()}
										aria-label="Select all"
									/>
								</TableHead>
								<TableHead className="text-left">Amount</TableHead>
								<TableHead className="text-left">Total Price</TableHead>
								<TableHead className="text-right w-[100px]">Product</TableHead>
							</TableRow>
						</TableHeader>
						<TableBody className="overflow-y-auto h-full">
							{!data || data.length === 0 ? (
								<TableRow className="w-full">
									<TableCell
										colSpan={4}
										className="text-center w-full h-[50vh]"
									>
										<div className="flex flex-col items-center justify-center space-y-4 h-full">
											<CircleOff className="w-10 h-10 text-gray-200" />
											<p className="text-md text-gray-500">
												No sold products found
											</p>
										</div>
									</TableCell>
								</TableRow>
							) : (
								data?.map((row, i) => (
									<TableRow key={i} onClick={() => handleSelect(row)}>
										<TableCell className="font-medium">
											<Checkbox
												checked={Boolean(
													selectedRows.find(
														(r) => r.product_id === row.product_id
													)
												)}
												onCheckedChange={() => handleSelect(row)}
												aria-label="Select row"
											/>
										</TableCell>
										<TableCell className="w-fulltext-left">
											{row.product_quantity}
										</TableCell>
										<TableCell className="w-full text-left">
											{row.total_price}
										</TableCell>
										<TableCell className="max-w-[150px] text-right text-ellipsis overflow-hidden whitespace-nowrap truncate">
											{row.product_name}
										</TableCell>
									</TableRow>
								))
							)}
						</TableBody>
					</Table>
				</Card>
				<div className="grid grid-cols-2 gap-4 col-span-2 grid-rows-2">
					<StatCard
						title="Total Revenue"
						value={roundUpToTwoDecimals(granularityTotal)}
						description={`This ${selectedTab}, you made :`}
						icon={
							<config.general.currency.symbol className="w-4 h-4 text-muted-foreground" />
						}
						trailingIcon={
							<config.general.currency.symbol className="w-6 h-6" />
						}
					/>
					{selectedCategory && (
						<StatCard
							title={`${
								productCategories.find(
									(category) =>
										category.product_category_id === selectedCategory
								).product_category_name
							} Revenue`}
							value={bestSellersTotal}
							description={`During this ${selectedTab}, ${
								productCategories.find(
									(category) =>
										category.product_category_id === selectedCategory
								).product_category_name
							} brought you :`}
							icon={
								<config.general.currency.symbol className="w-4 h-4 text-muted-foreground" />
							}
							trailingIcon={
								<config.general.currency.symbol className="w-6 h-6" />
							}
						/>
					)}
					{showPercentage && (
						<StatCard
							title="Percentage"
							value={selectedPercentage}
							description={percentageDescription()}
							icon={<Percent className="w-4 h-4 text-muted-foreground" />}
							trailingIcon={<Percent className="w-6 h-6" />}
						/>
					)}
					{showAmount && (
						<StatCard
							title="Amount"
							value={selectedTotal}
							description={`Revenue from selected products`}
							icon={
								<ShoppingBasket className="w-4 h-4 text-muted-foreground" />
							}
							trailingIcon={
								<config.general.currency.symbol className="w-6 h-6" />
							}
						/>
					)}
				</div>
			</div>
		</Stack>
	)
}

const formatDate = (date) => {
	const formattedDate = new Date(
		date.getTime() - date.getTimezoneOffset() * 60000
	)
		.toISOString()
		.split("T")[0]

	return formattedDate
}

const StatCard = ({ title, value, description, icon, trailingIcon }) => {
	return (
		<Card className="h-full row-span-1 flex flex-col w-full">
			<CardHeader>
				<Stack
					direction="row"
					spacing={1}
					justifyContent="space-between"
					alignItems="center"
					className="w-full"
				>
					<CardTitle className="text-sm font-medium">{title}</CardTitle>
					{icon}
				</Stack>
				<CardDescription>{description}</CardDescription>
			</CardHeader>
			<CardContent className="flex-1 flex items-center justify-center text-center">
				<div className="flex flex-col items-center gap-2">
					<Stack direction="row" spacing={1} className="items-center">
						<div className="text-2xl font-bold">{value}</div>
						{trailingIcon}
					</Stack>
				</div>
			</CardContent>
		</Card>
	)
}
