import { useState, useEffect } from "react"
import { useSelector } from "react-redux"
import {
	Body,
	SubTitle,
} from "../../../../assets/common/common.styles"
import InfoMessage from "../../../common/InfoMessage/InfoMessage"
import BestSellersTable from "../ChartC/BestSellersTable"
import { useGetDaySalesProductsQuery } from "../../../../redux/services/salesApi"

const ChartG = ({ theme }) => {
	const [skip, setSkip] = useState(true)
	const [sortedData, setSortedData] = useState([])
	const date = useSelector((state) => state.dashboard.date)

	const { data, isError } = useGetDaySalesProductsQuery(
		{
			month: date.split("-")[1],
			year: date.split("-")[0],
			day: date.split("-")[2],
		},
		{ skip }
	)

	const getSalesProducts = () => {
		if (date) {
			setSkip(false)
		}
	}

	const formatBestSellers = (data) => {
		let products = []
		let formatted = []
		data &&
			data
				.filter((item) => item.product_id.includes("M"))
				.forEach((product) => {
					if (!products.includes(product.product_id)) {
						products.push(product.product_id)
						formatted.push(product)
					} else {
						let found = formatted.find(
							(item) => item.product_id === product.product_id
						)
						// if found, add item qty to product qty
						found = {
							...found,
							product_quantity:
								found.product_quantity + product.product_quantity,
						}

						const update = formatted.filter(
							(item) => item.product_id !== product.product_id
						)

						formatted = update
						formatted.push(found)
					}
				})
		return formatted
	}

	const sortData = (data) => {
		let sorted = data.sort((a, b) => b.product_quantity - a.product_quantity)
		return sorted
	}

	useEffect(() => {
		getSalesProducts()
	}, [date])

	useEffect(() => {
		setSortedData(sortData(formatBestSellers(data)))
	}, [data])

	return (
		<Body theme={theme} style={{ width: "100%", height: "100%" }}>
			<SubTitle>{date}'s Lunch Best Sellers</SubTitle>
			{isError ? (
				<InfoMessage
					state="error"
					text="Failed to fetch daily lunch best sellers"
				/>
			) : (
				<BestSellersTable data={sortedData} />
			)}
		</Body>
	)
}

export default ChartG
