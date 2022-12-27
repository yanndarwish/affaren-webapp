import { useSelector, useDispatch } from "react-redux"
import { useEffect, useState } from "react"
import { useGetMonthSalesQuery } from "../../../../redux/services/salesApi"
import { setFullArray } from "../../../../redux/features/dashboard"
import AreaChart from "./AreaChart"

const ChartB = () => {
	const dispatch = useDispatch()
	const [skip, setSkip] = useState(true)
	const [month, setMonth] = useState("")
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

	return <div style={{width: "100%"}}>
        <AreaChart data={dashboard.fullArray}/>
    </div>
}

export default ChartB
