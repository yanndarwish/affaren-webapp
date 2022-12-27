import Chart from "react-apexcharts"
import { useEffect, useState } from "react"

const RadialChart = ({ data, theme }) => {
	const [series, setSeries] = useState([])
	const options = {
		labels: ["Alimentation", "Magazines", "Décoration/Alcool"],
		legend: {
			show: false,
		},
		theme: {
			mode: theme === "dark" ? "dark" : "light",
			palette: "palette10",
		},
		chart: {
			background: "none",
		},
		plotOptions: {
			pie: {
				donut: {
					labels: {
						show: true,
						value: {
							fontSize: "36px",
							fontWeight: "bold",
						},
						total: {
							show: true,
							fontWeight: "bold",
							fontSize: "20px",
						},
					},
				},
			},
		},
	}

	const prepareData = (data) => {
		let alim = 0
		let maga = 0
		let deco = 0
		data?.forEach((sale) => {
			if (Object.keys(sale.sale_taxes).includes("total1")) {
				alim = (parseFloat(alim) + parseFloat(sale.sale_taxes.total1)).toFixed(2)
			}
			if (Object.keys(sale.sale_taxes).includes("total2")) {
				maga = (parseFloat(maga) + parseFloat(sale.sale_taxes.total2)).toFixed(2)
			}
			if (Object.keys(sale.sale_taxes).includes("total3")) {
				deco = (parseFloat(deco) + parseFloat(sale.sale_taxes.total3)).toFixed(2)
			}
		})
		setSeries([parseFloat(alim), parseFloat(maga), parseFloat(deco)])
	}

	useEffect(() => {
		prepareData(data)
	}, [data])

	return <Chart height="350" options={options} series={series} type="donut" />
}

export default RadialChart
