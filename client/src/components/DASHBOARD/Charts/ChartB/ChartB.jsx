import { useSelector, useDispatch } from "react-redux"
import { useEffect, useState } from "react"
import { useGetMonthSalesQuery } from "../../../../redux/services/salesApi"
import { setFullArray } from "../../../../redux/features/dashboard"
import AreaChart from "./AreaChart"
import { Body, SubTitle } from "../../../../assets/styles/common.styles"

const ChartB = ({theme}) => {
	const dispatch = useDispatch()
	const [skip, setSkip] = useState(true)
	const [month, setMonth] = useState("")
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
	const [year, setYear] = useState("")
	const dashboard = useSelector((state) => state.dashboard)
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
		fetchMonthArray(dashboard.date)
	}, [dashboard.date])

	useEffect(() => {
		storeFullArrayInState(data)
	}, [data, dashboard.date])

	return (
		<Body theme={theme} style={{ width: "100%", height: "100%" }}>
            <SubTitle>{months[month - 1]}</SubTitle>
			<AreaChart data={dashboard.fullArray} theme={theme} />
		</Body>
	)
}

export default ChartB
