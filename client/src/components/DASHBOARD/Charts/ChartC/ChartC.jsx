import { useState } from "react"
import { useEffect } from "react"
import { useSelector } from "react-redux"
import { Body, SubTitle } from "../../../../assets/styles/common.styles"
import { useGetSalesProductsQuery } from "../../../../redux/services/salesApi"
import BestSellersTable from "./BestSellersTable"

const ChartC = ({ theme }) => {
	const dashboard = useSelector((state) => state.dashboard)
	const [skip, setSkip] = useState(true)
	const [month, setMonth] = useState("")
	const [year, setYear] = useState("")
	const [sortedData, setSortedData] = useState([])
	const { data } = useGetSalesProductsQuery(
		{ month: month, year: year },
		{ skip }
	)

	const getSalesProducts = () => {
		if (month && year) {
			setSkip(false)
		}
	}

	const getMonth = (dateString) => {
		return dateString && dateString.split("-")[1]
	}

	const getYear = (dateString) => {
		return dateString && dateString.split("-")[0]
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
		setMonth(getMonth(dashboard.date))
		setYear(getYear(dashboard.date))
	}, [dashboard.date])

	useEffect(() => {
		getSalesProducts()
	}, [month, year])

	useEffect(() => {
		setSortedData(sortData(formatBestSellers(data)))
	}, [data])

	return (
		<Body theme={theme} style={{ width: "100%", height: "100%" }}>
			<SubTitle>Best Sellers</SubTitle>
			<BestSellersTable data={sortedData} />
		</Body>
	)
}

export default ChartC
