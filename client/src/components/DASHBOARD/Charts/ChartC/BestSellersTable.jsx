import {
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableHeader,
	TableRow,
} from "../../../ui/table"
import { useEffect, useState } from "react"
import { useQuery } from "../../../../lib/hooks/useQuery"
import { getDaySalesProducts } from "../../../../lib/api"
import { useNotify } from "../../../../lib/hooks/useNotify"
import { EmptyData } from "../../../shared/emptyData"

export const TableBestSellers = ({ date }) => {
	const { notifyError } = useNotify()
	const [data, setData] = useState([])

	const queryGetDaySalesProducts = useQuery({
		queryFn: getDaySalesProducts,
		onSuccess: (data) => {
			const formatted = formatData(data)
			setData(formatted)
		},
		onError: () => {
			notifyError("An error occurred while fetching the best sellers data")
		},
	})

	const formatData = (data) => {
		// group by product_id and sum the product_quantity
		// array of objects with product_id, product_name and product_quantity
		const formatted = data.reduce((acc, item) => {
			const found = acc.find(
				(product) => product.product_name === item.product_name
			)
			if (found) {
				found.product_quantity += item.product_quantity
			} else {
				acc.push(item)
			}
			return acc
		}, [])
		return formatted
	}

	const fetchData = () => {
		const year = date.getFullYear()
		const month = date.getMonth() + 1
		const day = date.getDate()

		queryGetDaySalesProducts.send({
			month,
			year,
			day,
		})
	}

	useEffect(() => {
		if (date) {
			fetchData()
		}
	}, [date])

	return (
		<Table sx={{ minWidth: 350 }} aria-label="simple table">
			<TableHeader>
				<TableRow>
					<TableHead>Name</TableHead>
					<TableHead>N° of Sales</TableHead>
				</TableRow>
			</TableHeader>
			<TableBody>
				{data.length === 0 ? (
					<EmptyData message="No sales products found" span={2} className="h-[200px]" />
				) : (
					data.map((row) => (
						<TableRow key={row.product_id}>
							<TableCell>{row.product_name}</TableCell>
							<TableCell>{row.product_quantity}</TableCell>
						</TableRow>
					))
				)}
			</TableBody>
		</Table>
	)
}
