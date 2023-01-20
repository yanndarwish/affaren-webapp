import InfoMessage from "../../../common/InfoMessage/InfoMessage"
import { useEffect, useState } from "react"
import {
	Body,
	SpaceHeader,
	SubTitle,
} from "../../../../assets/common/common.styles"
import { useGetSalesProductsQuery } from "../../../../redux/services/salesApi"
import AreaChart from "./AreaChart"
const ChartE = ({ theme, months, month, year }) => {
	const [skip, setSkip] = useState(true)
	const [lunchArray, setLunchArray] = useState([])
	const [monthTotal, setMonthTotal] = useState("0")

	const { data, isError } = useGetSalesProductsQuery(
		{ month: month, year: year },
		{ skip }
	)

	const getSalesProducts = () => {
		if (month && year) {
			setSkip(false)
		}
	}

	const getLunchTotalRevenue =() => {
		let total = '0'
		console.log(lunchArray)
		lunchArray?.forEach(item => {
			total = (parseFloat(item.product_price) + parseFloat(total)).toFixed(2)
		})
		setMonthTotal(total)
	}

	const filterArray = () => {
		const filtered = data?.filter((item) => item.product_id.includes("M"))
		setLunchArray(filtered)
	}

	useEffect(() => {
		getSalesProducts()
	}, [month, year])

	useEffect(() => {
		filterArray()
	}, [data])

	useEffect(() => {
		getLunchTotalRevenue()
	}, [lunchArray])


	return (
		<Body theme={theme} style={{ width: "100%", height: "100%" }}>
			<SpaceHeader>
				<SubTitle>{months[month - 1]}'s Lunches Revenue : {monthTotal}€</SubTitle>
			</SpaceHeader>
			{isError && (
				<InfoMessage state="error" text="Failed to fetch lunch data" />
			)}

			<AreaChart data={lunchArray} theme={theme} />
		</Body>
	)
}

export default ChartE
