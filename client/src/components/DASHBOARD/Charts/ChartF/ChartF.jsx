import { useState, useEffect } from "react"
import {
	Body,
	ErrorMessage,
	SubTitle,
} from "../../../../assets/common/common.styles"
import { useGetSalesProductsQuery } from "../../../../redux/services/salesApi"
import BestSellersTable from "../ChartC/BestSellersTable"

const ChartF = ({ theme, months, month, year }) => {
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
			data.filter(item => item.product_id.includes('M')).forEach((product) => {
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
			<SubTitle>{months[month - 1]}'s Lunch Best Sellers</SubTitle>
			{isError && <ErrorMessage>Failed to fetch Data</ErrorMessage>}
			<BestSellersTable data={sortedData} />
		</Body>
	)
}

export default ChartF
