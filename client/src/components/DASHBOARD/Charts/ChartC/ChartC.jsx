import { useState } from "react"
import { useEffect } from "react"
import InfoMessage from "../../../common/InfoMessage/InfoMessage"
import { Body, SubTitle } from "../../../../assets/common/common.styles"
import { useGetSalesProductsQuery } from "../../../../redux/services/salesApi"
import BestSellersTable from "./BestSellersTable"

const ChartC = ({ theme, months, month, year }) => {
	const [skip, setSkip] = useState(true)
	const [sortedData, setSortedData] = useState([])
	const { data, isError } = useGetSalesProductsQuery(
		{ month: month, year: year },
		{ skip }
	)

	const getSalesProducts = () => {
		if (month && year) {
			setSkip(false)
		}
	}

	const formatBestSellers = (data) => {
		let products = []
		let formatted = []
		data &&
			data.forEach((product) => {
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
						product_quantity: found.product_quantity + product.product_quantity,
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
	}, [month, year])

	useEffect(() => {
		setSortedData(sortData(formatBestSellers(data)))
	}, [data])

	return (
		<Body theme={theme} style={{ width: "100%", height: "100%" }}>
			<SubTitle>{months[month - 1]}'s Best Sellers</SubTitle>
			{isError ? (
				<InfoMessage state="error" text="Failed to fetch month best sellers" />
			) : (
				<BestSellersTable data={sortedData} />
			)}
		</Body>
	)
}

export default ChartC
