import { useSelector, useDispatch } from "react-redux"
import { useEffect, useState } from "react"
import { useGetMonthSalesQuery } from "../../../../redux/services/salesApi"
import { setFullArray } from "../../../../redux/features/dashboard"
import AreaChart from "./AreaChart"
import Button from "../../../common/Button/Button.component"
import {
	Body,
	SpaceHeader,
	SubTitle,
} from "../../../../assets/styles/common.styles"
import DetailTable from "../../DetailTable/DetailTable"

const ChartB = ({ theme }) => {
	const dispatch = useDispatch()
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
	const [isDetail, setIsDetail] = useState(false)
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

	const handleDetailClick = () => {
		setIsDetail(!isDetail)
	}
	useEffect(() => {
		fetchMonthArray(dashboard.date)
	}, [dashboard.date])

	useEffect(() => {
		storeFullArrayInState(data)
	}, [data, dashboard.date])

	return (
		<Body theme={theme} style={{ width: "100%", height: "100%" }}>
			<SpaceHeader>
				<SubTitle>{months[month - 1]}</SubTitle>
				<Button title="Details" onClick={handleDetailClick} />
			</SpaceHeader>
			<AreaChart data={dashboard.fullArray} theme={theme} />
			{isDetail && <DetailTable data={dashboard.fullArray} months={months} month={parseInt(month)} year={year}/>}
		</Body>
	)
}

export default ChartB
