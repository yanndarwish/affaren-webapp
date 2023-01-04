import { useGetUsersMutation } from "../../redux/services/userApi"
import { useDispatch, useSelector } from "react-redux"
import { useEffect, useState } from "react"
import {
	Body,
	Container,
	FitContainer,
	Flex,
	SpaceHeader,
	SubTitle,
	Title,
} from "../../assets/styles/common.styles"
import DateInput from "../../components/DASHBOARD/DateInput/DateInput"
import ChartB from "../../components/DASHBOARD/Charts/ChartB/ChartB"
import ChartA from "../../components/DASHBOARD/Charts/ChartA/ChartA"
import ChartC from "../../components/DASHBOARD/Charts/ChartC/ChartC"
import { useGetMonthSalesQuery } from "../../redux/services/salesApi"
import { setFullArray } from "../../redux/features/dashboard"
import ChartD from "../../components/DASHBOARD/Charts/ChartD/ChartD"

const Dashboard = () => {
	const dispatch = useDispatch()
	const dashboard = useSelector((state) => state.dashboard)

	const user = useSelector((state) => state.user.user)
	const theme = useSelector((state) => state.theme.theme)
	const [getUsers] = useGetUsersMutation()
	const [skip, setSkip] = useState(true)
	const [month, setMonth] = useState("")
	const months = [
		"January",
		"February",
		"March",
		"April",
		"May",
		"June",
		"July",
		"August",
		"September",
		"October",
		"November",
		"December",
	]
	const [year, setYear] = useState("")
	const { data, error, isLoading } = useGetMonthSalesQuery(
		{
			month: month,
			year: year,
		},
		{ skip }
	)

	const getMonth = (dateString) => {
		return dateString && dateString.split("-")[1]
	}

	const getYear = (dateString) => {
		return dateString && dateString.split("-")[0]
	}

	const fetchMonthArray = (dateString) => {
		setMonth(getMonth(dateString))
		setYear(getYear(dateString))
		setSkip(false)
	}

	const storeFullArrayInState = (data) => {
		dispatch(setFullArray({ fullArray: data }))
	}

	useEffect(() => {
		getUsers({ user: user })
	}, [user])

	useEffect(() => {
		fetchMonthArray(dashboard.date)
	}, [dashboard.date])

	useEffect(() => {
		storeFullArrayInState(data)
	}, [data, dashboard.date])

	console.log(user.user_is_admin === "true")
	return (
		<Container theme={theme}>
			<SpaceHeader>
				<Title>Dashboard</Title>
				<Flex>
					<DateInput />
				</Flex>
			</SpaceHeader>
			<FitContainer theme={theme}>
				<SubTitle>Charts</SubTitle>
				<ChartA theme={theme} />
				<ChartB theme={theme} months={months} month={month} year={year} />
				<ChartC theme={theme} />
				{user?.user_is_admin === "true" && <ChartD theme={theme} />}
			</FitContainer>
		</Container>
	)
}

export default Dashboard
