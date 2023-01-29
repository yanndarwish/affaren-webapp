import { useGetUsersMutation } from "../../redux/services/userApi"
import { useDispatch, useSelector } from "react-redux"
import { useEffect, useState } from "react"
import {
	Container,
	ErrorMessage,
	Flex,
	SpaceHeader,
	Title,
} from "../../assets/common/common.styles"
import DateInput from "../../components/DASHBOARD/DateInput/DateInput"
import ChartB from "../../components/DASHBOARD/Charts/ChartB/ChartB"
import ChartA from "../../components/DASHBOARD/Charts/ChartA/ChartA"
import ChartC from "../../components/DASHBOARD/Charts/ChartC/ChartC"
import { useGetMonthSalesQuery } from "../../redux/services/salesApi"
import { setFullArray } from "../../redux/features/dashboard"
import ChartD from "../../components/DASHBOARD/Charts/ChartD/ChartD"
import { useNavigate } from "react-router-dom"
import ChartE from "../../components/DASHBOARD/Charts/ChartE/ChartE"
import ChartF from "../../components/DASHBOARD/Charts/ChartF/ChartF"
import ChartG from "../../components/DASHBOARD/Charts/ChartG/ChartG"
import ChartH from "../../components/DASHBOARD/Charts/ChartH/ChartH"

const Dashboard = () => {
	const dispatch = useDispatch()
	const loggedIn = useSelector((state) => state.login.loggedIn)
	const dashboard = useSelector((state) => state.dashboard)
	const navigate = useNavigate()
	const user = useSelector((state) => state.user.user)
	const theme = useSelector((state) => state.theme.theme)
	const [getUsers, res] = useGetUsersMutation()
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

	const redirect = () => {
		!loggedIn && navigate("/login")
	}

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
		if (user?.user_is_admin === "true") {
			getUsers({ user: user })
		}
	}, [user])

	useEffect(() => {
		fetchMonthArray(dashboard.date)
	}, [dashboard.date])

	useEffect(() => {
		storeFullArrayInState(data)
	}, [data, dashboard.date])

	useEffect(() => {
		redirect()
	}, [])

	return (
		<Container theme={theme}>
			<SpaceHeader>
				<Title>Dashboard</Title>
				<Flex>
					<DateInput />
				</Flex>
			</SpaceHeader>
				<ChartA theme={theme} />
				<ChartH theme={theme} />
				<ChartG theme={theme} />
				<ChartB theme={theme} months={months} month={month} year={year} />
				<ChartC theme={theme} months={months} month={month} year={year} />
				{user?.user_is_admin === "true" && !res.isError ? (
					<ChartD theme={theme} />
				) : (
					user?.user_is_admin === "true" &&
					res.isError && <ErrorMessage>Failed to fetch users</ErrorMessage>
				)}
				<ChartE theme={theme} months={months} month={month} year={year} />
				<ChartF theme={theme} months={months} month={month} year={year} />
		</Container>
	)
}

export default Dashboard
