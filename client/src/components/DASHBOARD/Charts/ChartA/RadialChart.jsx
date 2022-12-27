import Chart from "react-apexcharts"
import { useEffect, useState } from "react"

const RadialChart = ({ data }) => {
	const [series, setSeries] = useState([])
	const options = {
		labels: ["Alimentation", "Magazines", "Décoration/Alcool"],
		legend: {
			position: "bottom",
		},
	}

	const prepareData = (data) => {
		let alim = 0
		let maga = 0
		let deco = 0
		data?.forEach((sale) => {
			if (Object.keys(sale.sale_taxes).includes("total1")) {
				alim += parseFloat(sale.sale_taxes.total1)
			}
			if (Object.keys(sale.sale_taxes).includes("total2")) {
				maga += parseFloat(sale.sale_taxes.total2)
			}
			if (Object.keys(sale.sale_taxes).includes("total3")) {
				deco += parseFloat(sale.sale_taxes.total3)
			}
		})
		setSeries([alim, maga, deco])
	}

	useEffect(() => {
		prepareData(data)
	}, [data])

	return <Chart height="350" options={options} series={series} type="donut" />
}

export default RadialChart
