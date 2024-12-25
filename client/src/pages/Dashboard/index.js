import { Stack } from "@mui/material"
import { PageTitle } from "../../components/shared/pageTitle"
import { useEffect, useState } from "react"
import { DateNavigator } from "../../components/shared/datePicker"
import { MonthSalesChart } from "../../components/DASHBOARD/Charts/areaChart"
import { useQuery } from "../../lib/hooks/useQuery"
import { getSales } from "../../lib/api"
import { PaymentTotal } from "../../components/SALES/SalesTable/SalesTable"
import { Euro } from "lucide-react"
import { useNotify } from "../../lib/hooks/useNotify"
import { RepartitionChart } from "../../components/DASHBOARD/Charts/pieChart"

const Dashboard = () => {
	const [selectedDate, setSelectedDate] = useState(new Date())

	const handlePreviousDay = () => {
		setSelectedDate(new Date(selectedDate.setDate(selectedDate.getDate() - 1)))
	}

	const handleNextDay = () => {
		setSelectedDate(new Date(selectedDate.setDate(selectedDate.getDate() + 1)))
	}

	const handleDateChange = (date) => {
		setSelectedDate(date)
	}

	useEffect(() => {
		setSelectedDate(new Date())
	}, [])

	return (
		<>
			<div className="grid auto-rows-min gap-4 md:grid-cols-3">
				{/* <div className="aspect-video rounded-xl bg-muted/50" />
				<div className="aspect-video rounded-xl bg-muted/50" />
				<div className="aspect-video rounded-xl bg-muted/50" /> */}
			</div>
			<div className="flex-1 md:min-h-min col-span-3">
				<Stack direction="column" spacing={2} className="w-full h-full">
					<Stack direction="row" spacing={2} className="w-full justify-between">
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
						<DayTotal date={selectedDate} />
					</Stack>
					<MonthSalesChart
						monthString={selectedDate?.toLocaleString("en", {
							month: "long",
						})}
						year={selectedDate?.getFullYear()}
						month={selectedDate?.getMonth() + 1}
					/>
				</Stack>
			</div>
		</>
	)
}

const DayTotal = ({ date }) => {
	const { notifyError } = useNotify()
	const [total, setTotal] = useState(0)

	const queryGetDaysSales = useQuery({
		queryFn: getSales,
		onSuccess: (data) => {
			setTotal(data.total)
		},
		onError: (error) => {
			notifyError("An error occurred while fetching the day sales")
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
		<Stack direction="row" className=" w-[200px] justify-between">
			<PaymentTotal label="Total" value={total} icon={<Euro />} primary />
		</Stack>
	)
}

export default Dashboard
