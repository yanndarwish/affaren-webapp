import Chart from "react-apexcharts"
import { useEffect, useState } from "react"

const AreaChart = ({ data, theme }) => {
	const [series, setSeries] = useState([])
	const labels = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31]
	let options = {
		stroke: { width: [5, 5, 4], curve: "straight" },
		xaxis: {
			type: "string",
			categories: labels,
			labels: {
				show: false,
			},
			axisBorder: { show: false },
		},
		yaxis: {
			opposite: true,
			labels: {
				show: false,
			},
		},
		grid: {
			padding: {
				left: -10,
				right: -16,
				top: -16,
				bottom: -16,
			},
			yaxis: {
				lines: {
					show: false,
				},
			},
		},
		legend: {
			show: false,
		},
		dataLabels: {
			enabled: true,
			style: {
				fontSize: "18px",
				opacity: 0.4,
			},
			background: {
				padding: 4,
			},
		},
		tooltip: {
			style: {
				fontSize: "25px",
			},
		},
		theme: {
			mode: theme === "dark" ? "dark" : "light",
			palette: "palette10",
		},
		chart: {
			background: "none",
			toolbar: {
				show: false,
			},
			animations: {
				speed: 750,
				dynamicAnimation: {
					enabled: true,
					speed: 350,
				},
			},
		},
	}

	const prepareData = (data) => {
		let series = []
		data?.forEach((user) => {

			let localLabels = []
			let totals = []
			user.forEach((sale) => {
				if (!localLabels.includes(sale.sale_day)) {
					localLabels.push(sale.sale_day)
					// totals.push(parseFloat(parseFloat(sale.sale_amount).toFixed(2)))
					totals[sale.sale_day - 1] = parseFloat(
						parseFloat(sale.sale_amount).toFixed(2)
					)
				} else {
					// totals[totals.length - 1] = parseFloat((
					// 	parseFloat(totals[totals.length - 1]) + parseFloat(sale.sale_amount)
					// ).toFixed(2))
					totals[sale.sale_day - 1] = parseFloat(
						parseFloat(
							totals[sale.sale_day - 1] + parseFloat(sale.sale_amount)
						).toFixed(2)
					)
				}
			})
			labels.forEach(day => {
				if (totals[day-1] === undefined) {
					totals[day -1] = null
				}
			})
			let serie = { name: user[0]?.sale_user, data: totals }
			series.push(serie)
            // Check here to update labels for multiple users
		})
		// setLabels(fullLabels)
        setSeries(series)
	}

	useEffect(() => {
		prepareData(data)
	}, [data])

	return <Chart height="350" options={options} series={series} type="area" />
}

export default AreaChart
