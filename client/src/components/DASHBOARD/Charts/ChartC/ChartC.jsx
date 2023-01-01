import { useState } from "react"
import { useEffect } from "react"
import { useSelector } from "react-redux"
import { Body, SubTitle } from "../../../../assets/styles/common.styles"
import { useGetSalesProductsQuery } from "../../../../redux/services/salesApi"

const ChartC = ({ theme }) => {
	const dashboard = useSelector((state) => state.dashboard)
	const [skip, setSkip] = useState(true)
	const [month, setMonth] = useState("")
	const [year, setYear] = useState("")
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
					formatted[formatted.length - 1] = {
						...formatted[formatted.length - 1],
						product_quantity:
							formatted[formatted.length - 1].product_quantity + product.product_quantity,
					}
				}
			})
		console.log(products)
		console.log(formatted)
	}

	useEffect(() => {
		setMonth(getMonth(dashboard.date))
		setYear(getYear(dashboard.date))
	}, [dashboard.date])

	useEffect(() => {
		getSalesProducts()
	}, [month, year])

	useEffect(() => {
		formatBestSellers(data)
	}, [data])
	return (
		<Body theme={theme} style={{ width: "100%", height: "100%" }}>
			<SubTitle>Best Sellers</SubTitle>
		</Body>
	)
}

export default ChartC
