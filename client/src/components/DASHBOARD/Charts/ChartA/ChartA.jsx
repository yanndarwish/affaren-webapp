import { useEffect, useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { setDayArray } from "../../../../redux/features/dashboard"
import RadialChart from "./RadialChart"

const ChartA = () => {
    const dashboard = useSelector((state) => state.dashboard)
	const dispatch = useDispatch()
    const [targetArray, setTargetArray] = useState()
	

	const getDay = (dateString) => {
		return dateString && dateString.split("-")[2]
	}

	const getTargetArray = (array) => {
		let filtered =
			array &&
			array.filter((day) => day.sale_day === parseInt(getDay(dashboard.date)))

		setTargetArray(filtered)
	}

	const storeDayArrayInState = (data) => {
		dispatch(setDayArray({ dayArray: data }))
	}

	

	useEffect(() => {
		getTargetArray(dashboard.fullArray)
	}, [dashboard.fullArray, dashboard.date])

	useEffect(() => {
		storeDayArrayInState(targetArray)
	}, [targetArray])

	return (
		<div style={{ width: "100%" }}>
			<RadialChart data={targetArray} />
		</div>
	)
}

export default ChartA
