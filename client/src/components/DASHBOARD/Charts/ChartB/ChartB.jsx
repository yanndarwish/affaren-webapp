import { useSelector } from "react-redux"
import { useState } from "react"
import AreaChart from "./AreaChart"
import Button from "../../../common/Button/Button.component"
import {
	Body,
	SpaceHeader,
	SubTitle,
} from "../../../../assets/common/common.styles"
import DetailTable from "../../DetailTable/DetailTable"
import { useEffect } from "react"

const ChartB = ({ theme, months, month, year }) => {
	const [isDetail, setIsDetail] = useState(false)
	const [monthTotal, setMonthTotal] = useState("0")
	const dashboard = useSelector((state) => state.dashboard)

	const handleDetailClick = () => {
		setIsDetail(!isDetail)
	}

	const getMonthTotal = () => {
		let total = "0"
		dashboard?.fullArray?.forEach(sale => {
			total = (parseFloat(sale.sale_amount) + parseFloat(total)).toFixed(2)
		})
		setMonthTotal(total)
	}

	useEffect(() => {
		getMonthTotal()
	}, [dashboard.fullArray])

	return (
		<Body theme={theme} style={{ width: "100%", height: "100%" }}>
			<SpaceHeader>
				<SubTitle>{months[month - 1]}'s Revenue : {monthTotal}€</SubTitle>
				<Button title="Details" onClick={handleDetailClick} />
			</SpaceHeader>
			<AreaChart data={dashboard.fullArray} theme={theme} />
			{isDetail && (
				<DetailTable
					data={dashboard.fullArray}
					months={months}
					month={parseInt(month)}
					year={year}
				/>
			)}
		</Body>
	)
}

export default ChartB
