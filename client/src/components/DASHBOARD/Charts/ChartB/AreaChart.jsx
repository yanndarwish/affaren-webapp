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
                left:-10, right: -16, top: -16, bottom: -16
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
                fontSize: "25px"
            }
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
                    speed: 350
                }
            }
		},
	}

	const prepareData = (data) => {
		let copyData = data && [...data]
		let sortedData =
			copyData && copyData.sort((a, b) => a.sale_day - b.sale_day)
		let labels = []
		let days = []
		sortedData &&
			sortedData.forEach((sale) => {
				if (!labels.includes(sale.sale_day)) {
					labels.push(sale.sale_day)
					days.push(parseFloat(sale.sale_amount).toFixed(2))
				} else {
					days[days.length - 1] = (
						parseFloat(days[days.length - 1]) + parseFloat(sale.sale_amount)
					).toFixed(2)
				}
				console.log(sale.sale_amount)
			})

		setLabels(labels)
		setSeries([{ name: "Total", data: days }])
	}

	useEffect(() => {
		prepareData(data)
	}, [data])

	return <Chart height="350" options={options} series={series} type="area" />
}

export default AreaChart
