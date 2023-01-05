import Chart from "react-apexcharts"
import { useEffect, useState } from "react"

const AreaChart = ({ data, theme }) => {
	const [series, setSeries] = useState([])
	const [labels, setLabels] = useState([])
	let options = {
		stroke: { curve: "smooth" },
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
			enabled: false,
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
		let fullLabels = []
		data?.forEach((user) => {

			let labels = []
			let totals = []
			user.forEach((sale) => {

				if (!labels.includes(sale.sale_day)) {
					labels.push(sale.sale_day)
					totals.push(parseFloat(parseFloat(sale.sale_amount).toFixed(2)))
				} else {
					totals[totals.length - 1] = parseFloat((
						parseFloat(totals[totals.length - 1]) + parseFloat(sale.sale_amount)
					).toFixed(2))
				}
			})
			let serie = { name: user[0]?.sale_user, data: totals }
			series.push(serie)
            // Check here to update labels for multiple users
			fullLabels = labels
		})
		setLabels(fullLabels)
        setSeries(series)
	}
    console.log(labels)

	useEffect(() => {
		prepareData(data)
	}, [data])

	return <Chart height="350" options={options} series={series} type="area" />
}

export default AreaChart
