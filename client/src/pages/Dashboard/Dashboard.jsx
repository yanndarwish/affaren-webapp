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
		<Stack direction="column" spacing={3} className="w-full h-full">
			<PageTitle title="Dashboard" />
			<Stack direction="column" spacing={2} className="w-full pb-6">
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
				<Stack spacing={2} className="w-full">
					<MonthSalesChart
						monthString={selectedDate?.toLocaleString("en", {
							month: "long",
						})}
						year={selectedDate?.getFullYear()}
						month={selectedDate?.getMonth() + 1}
					/>
					{/* <Stack direction="row" spacing={2} className="w-full">
						<Card className="w-full">
							<RepartitionChart date={selectedDate} />
						</Card>
						<Card className="w-full">
							<TableBestSellers date={selectedDate} />
						</Card>
					</Stack> */}
				</Stack>
			</Stack>
		</Stack>
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
