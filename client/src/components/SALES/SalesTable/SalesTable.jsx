import { useEffect, useState } from "react"
import {
	Pagination,
	PaginationContent,
	PaginationEllipsis,
	PaginationItem,
	PaginationLink,
	PaginationNext,
	PaginationPrevious,
} from "../../ui/pagination"
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "../../ui/table"
import { Modal, useModal } from "../../shared/modal"
import { useNotify } from "../../../lib/hooks/useNotify"
import { useQuery } from "../../../lib/hooks/useQuery"
import { deleteSale, getSales } from "../../../lib/api"
import {  Euro, EyeIcon } from "lucide-react"
import { Stack } from "@mui/material"
import { Card } from "../../ui/card"
import { Button } from "../../ui/button"
import { Trash2Icon } from "lucide-react"
import { useDailyTotal } from "../../../lib/providers/dailyTotal"
import { formatSale } from "../../../lib/sales"

import {
	Banknote,
	CreditCard,
	Tag,
} from "lucide-react"
import { formatDailyTotals } from "../../../lib/sales"
import { SaleDetails } from "../details"
import { DateNavigator } from "../../shared/datePicker"
import { EmptyData } from "../../shared/emptyData"

const columns = [
	{
		label: "N°",
		field: "sale_id",
		className: "",
	},
	{
		label: "Amount",
		field: "sale_amount",
		className: "text-center",
	},
]

export default function SalesTable() {
	const [selectedDate, setSelectedDate] = useState()
	const [pagination, setPagination] = useState({
		pageSize: 25,
		pageNumber: 1,
		pageTotal: 0,
	})
	const [sales, setSales] = useState([])
	const [totalCash, setTotalCash] = useState(0)
	const [totalCard, setTotalCard] = useState(0)
	const [totalCheck, setTotalCheck] = useState(0)
	const [totalTotal, setTotalTotal] = useState(0)

	const modalDeleteSale = useModal()
	const modalSaleDetails = useModal()
	const { notifySuccess, notifyError } = useNotify()
	const { setCash, setCredit, setCheck, setTotal } = useDailyTotal()

	const queryGetSales = useQuery({
		queryFn: getSales,
		onSuccess: (data) => {
			const salesData = data.data

			setSales(salesData)
			setPagination({ ...pagination, pageTotal: data.pageTotal })
			setTotalCash(data.totalCash)
			setTotalCard(data.totalCard)
			setTotalCheck(data.totalCheck)
			setTotalTotal(data.total)

			if (selectedDate?.toDateString() === new Date().toDateString()) {
				setCash(data.totalCash)
				setCredit(data.totalCard)
				setCheck(data.totalCheck)
				setTotal(data.total)
			}
		},
		onError: () => {
			notifyError("An error occurred while fetching sales")
		},
	})

	const queryDeleteSale = useQuery({
		queryFn: deleteSale,
		onSuccess: () => {
			notifySuccess("Sale deleted")
			const year = selectedDate.getFullYear()
			const month = selectedDate.getMonth() + 1
			const day = selectedDate.getDate()
			queryGetSales.send({ pagination, dateFilters: { year, month, day } })
		},
		onError: () => {
			notifyError("An error occurred while deleting the sale")
		},
	})

	const handleClickDelete = (id) => {
		modalDeleteSale.setData({ id })
		modalDeleteSale.openModal()
	}

	const handleClickDetails = (sale) => {
		modalSaleDetails.setData(sale)
		modalSaleDetails.openModal()
	}

	const handleConfirmDelete = (id) => {
		queryDeleteSale.send(id)
	}

	const handlePreviousPage = () => {
		if (pagination.pageNumber > 1) {
			setPagination((prev) => ({ ...prev, pageNumber: prev.pageNumber - 1 }))
		}
	}

	const handleNextPage = () => {
		if (pagination.pageNumber < pagination.pageTotal) {
			setPagination((prev) => ({ ...prev, pageNumber: prev.pageNumber + 1 }))
		}
	}

	const fetchSales = () => {
		const year = selectedDate.getFullYear()
		const month = selectedDate.getMonth() + 1
		const day = selectedDate.getDate()

		const dateFilters = {
			year,
			month,
			day,
		}

		queryGetSales.send({ pagination, dateFilters })
	}

	const handlePreviousDay = () => {
		setPagination({ pageNumber: 1, pageSize: 25 })
		setSelectedDate((prev) => {
			const date = new Date(prev)
			date.setDate(date.getDate() - 1)
			return date
		})
	}

	const handleNextDay = () => {
		setPagination({ pageNumber: 1, pageSize: 25 })
		setSelectedDate((prev) => {
			const date = new Date(prev)
			date.setDate(date.getDate() + 1)
			return date
		})
	}

	const handleDateChange = (date) => {
		setPagination({ pageNumber: 1, pageSize: 25 })
		setSelectedDate(date)
	}

	const scrollToTop = () => {
		const scrollableBody = document.getElementById("scrollable-body")
		scrollableBody.scrollTo({ top: 0, behavior: "smooth" })
	}

	useEffect(() => {
		if (selectedDate) {
			fetchSales()
			scrollToTop()
		}
	}, [pagination.pageNumber, selectedDate])

	useEffect(() => {
		setSelectedDate(new Date())
	}, [])

	return (
		<>
			<Stack className="space-y-4 h-full overflow-y-hidden">
				<Stack
					direction="row"
					justifyContent="space-between"
					className="flex-wrap"
					columnGap={2}
					rowGap={2}
				>
					<DateNavigator
						selectedDate={selectedDate}
						disabledRules={{ after: new Date() }}
						handlePreviousDay={handlePreviousDay}
						handleNextDay={handleNextDay}
						handleDateChange={handleDateChange}
						disableNextDay={
							selectedDate?.toDateString() === new Date().toDateString()
						}
					/>
					<DayTotalSummary
						date={selectedDate}
						totalCash={totalCash}
						totalCard={totalCard}
						totalCheck={totalCheck}
						total={totalTotal}
					/>
				</Stack>
				<Card className="flex flex-col h-[calc(100%-115px)]">
					<div className="flex flex-col h-full relative">
						{/* Sticky Header */}
						<Table>
							<TableHeader className="sticky top-0 bg-white z-10 border-b">
								<TableRow>
									{columns.map((column, index) => (
										<TableHead key={index} className={column.className}>
											{column.label}
										</TableHead>
									))}
									<TableHead className="text-right"></TableHead>
								</TableRow>
							</TableHeader>
						</Table>

						{/* Scrollable Body */}
						<div id="scrollable-body" className="flex-1 overflow-auto">
							<Table>
								<TableBody>
									{/* Empty state rows to maintain height */}
									{!sales || sales.length === 0 ? (
										<EmptyData
											message="No sales found"
											span={columns.length + 1}
											className="h-[calc(100vh-350px)]"
										/>
									) : (
										sales?.map((sale, i) => (
											<TableRow key={i}>
												<TableCell>{sale.sale_id}</TableCell>
												<TableCell className="text-center">
													{sale.sale_amount}
												</TableCell>
												<TableCell className="text-right">
													<Stack
														direction="row"
														justifyContent="flex-end"
														spacing={2}
													>
														<Button
															size="icon"
															onClick={() => handleClickDetails(sale)}
														>
															<EyeIcon />
														</Button>
														<Button
															size="icon"
															variant="destructive"
															onClick={() => handleClickDelete(sale.sale_id)}
														>
															<Trash2Icon />
														</Button>
													</Stack>
												</TableCell>
											</TableRow>
										))
									)}
								</TableBody>
							</Table>
						</div>

						{/* Sticky Footer */}
						<div className="sticky bottom-0 bg-white border-t">
							<Pagination className="py-2">
								<PaginationContent>
									<PaginationItem>
										<PaginationPrevious
											onClick={handlePreviousPage}
											isActive={pagination.pageNumber >= 1}
											className={
												pagination.pageNumber === 1
													? "opacity-20 cursor-not-allowed"
													: ""
											}
										/>
									</PaginationItem>
									<PaginationItem>
										<PaginationLink>{pagination.pageNumber}</PaginationLink>
									</PaginationItem>
									{pagination.pageTotal !== pagination.pageNumber &&
										pagination.pageTotal !== 0 && (
											<>
												<PaginationItem>
													<PaginationEllipsis />
												</PaginationItem>
												<PaginationItem>
													<PaginationLink>
														{pagination.pageTotal}
													</PaginationLink>
												</PaginationItem>
											</>
										)}
									<PaginationItem>
										<PaginationNext
											onClick={handleNextPage}
											isActive={pagination.pageNumber <= pagination.pageTotal}
											className={
												pagination.pageNumber >= pagination.pageTotal
													? "opacity-20 cursor-not-allowed"
													: ""
											}
										/>
									</PaginationItem>
								</PaginationContent>
							</Pagination>
						</div>
					</div>
					<ModalDeleteSale
						controller={modalDeleteSale}
						onConfirm={handleConfirmDelete}
					/>
					<ModalSaleDetails controller={modalSaleDetails} />
				</Card>
			</Stack>
		</>
	)
}

export const DayTotalSummary = ({ date, totalCash, totalCard, totalCheck, total }) => {
	if (!date) return null

	return (
		<Stack
			direction="row"
			justifyContent="space-between"
			className="w-full space-x-4"
		>
			{totalCash > 0 && (
				<PaymentTotal label="Cash" value={totalCash} icon={<Banknote />} />
			)}
			{totalCard > 0 && (
				<PaymentTotal label="Card" value={totalCard} icon={<CreditCard />} />
			)}
			{totalCheck > 0 && (
				<PaymentTotal label="Check" value={totalCheck} icon={<Tag />} />
			)}
			{total > 0 && (
				<PaymentTotal label="Total" value={total} icon={<Euro />} primary />
			)}
		</Stack>
	)
}

export const PaymentTotal = ({ label, value, icon, primary }) => {
	return (
		<Stack
			direction="row"
			spacing={1}
			justifyContent="space-between"
			className={`border border-gray-100 rounded-lg p-2 w-full ${
				primary ? "bg-primary text-white" : "bg-gray-50"
			} font-bold`}
		>
			<Stack direction="row" spacing={1}>
				{icon}
				<p>{label}</p>
			</Stack>
			<p>{value} €</p>
		</Stack>
	)
}

const ModalSaleDetails = ({ controller }) => {
	const sale = controller.data

	const formatedSale = formatSale(sale)

	return (
		<Modal
			open={controller.open}
			title={`Sale ${sale.sale_id}`}
			handleClose={controller.closeModal}
			className="!w-[50vw]"
		>
			<Stack direction="column" spacing={4}>
				<SaleDetails sale={formatedSale} />
			</Stack>
		</Modal>
	)
}

const ModalDeleteSale = ({ controller, onConfirm = () => null }) => {
	const sale = controller.data

	const handleConfirmDelete = () => {
		onConfirm(sale.id)
		controller.closeModal()
	}

	return (
		<Modal
			open={controller.open}
			title={`Delete Sale ${sale.id}`}
			handleClose={controller.closeModal}
		>
			<Stack direction="column" spacing={4}>
				<p className="text-center text-lg font-medium text-gray-900">
					Are you sure you want to delete this sale?
				</p>
				<Stack direction="row" spacing={2}>
					<Button
						onClick={controller.closeModal}
						variant="outline"
						className="w-full"
					>
						Cancel
					</Button>
					<Button
						onClick={handleConfirmDelete}
						variant="destructive"
						className="w-full"
					>
						Delete
					</Button>
				</Stack>
			</Stack>
		</Modal>
	)
}
