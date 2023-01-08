import Table from "@mui/material/Table"
import TableBody from "@mui/material/TableBody"
import TableCell from "@mui/material/TableCell"
import TableContainer from "@mui/material/TableContainer"
import TableHead from "@mui/material/TableHead"
import TableRow from "@mui/material/TableRow"
import Paper from "@mui/material/Paper"
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown"
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp"
import { useState } from "react"
import {
	CloseColumn,
	Flex,
	VerticalCenter,
} from "../../../assets/styles/common.styles"
import { useEffect } from "react"

export default function InventoryTable({ products, openEditor }) {
	const [sort, setSort] = useState(false)
	const [qty, setQty] = useState("")
	const [filteredProducts, setFilteredProducts] = useState([])

	const handleClick = (e) => {
		const targetId = e.target.dataset.id
			? e.target.dataset.id
			: e.target.parentNode.dataset.id
		let found = products.find(
			(product) => product.product_id === parseInt(targetId)
		)
		openEditor(found)
	}

	const handleSort = () => {
		let filtered = products && [...products]
		if (sort && qty === "down") {
			// reset sorting
			setSort(false)
			setQty("")
		} else if (qty === "") {
			// sort from min to max
			filtered = filtered?.sort(
				(a, b) => a.product_quantity - b.product_quantity
			)
			setSort(true)
			setQty("up")
		} else if (qty === "up") {
			// sort from max to min
			filtered = filtered?.sort(
				(a, b) => b.product_quantity - a.product_quantity
			)
			setQty("down")
		}
		setFilteredProducts(filtered)
	}

	useEffect(() => {
		handleSort()
	}, [products])

	console.log(filteredProducts)
	return (
		<TableContainer component={Paper}>
			<Table sx={{ minWidth: 650 }} aria-label="simple table">
				<TableHead>
					<TableRow>
						<TableCell>Id</TableCell>
						<TableCell>Name</TableCell>
						<TableCell align="right">Price</TableCell>
						<TableCell align="right" onClick={handleSort}>
							<VerticalCenter>
								Quantity
								{sort ? (
									qty === "up" ? (
										<ArrowDropUpIcon />
									) : (
										qty === "down" && <ArrowDropDownIcon />
									)
								) : (
									<CloseColumn>
										<ArrowDropUpIcon />
										<ArrowDropDownIcon />
									</CloseColumn>
								)}
							</VerticalCenter>
						</TableCell>
						<TableCell align="right">Taxe</TableCell>
						<TableCell align="right">Barcode</TableCell>
						<TableCell align="right">Alert</TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{filteredProducts &&
						filteredProducts.map((product) => (
							<TableRow
								key={product && product.product_id}
								sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
								data-id={product && product.product_id}
								onClick={handleClick}
							>
								<TableCell component="th" scope="row">
									{product && product.product_id}
								</TableCell>
								<TableCell>{product && product.product_name}</TableCell>
								<TableCell align="right">
									{product && product.product_price}
								</TableCell>
								<TableCell align="right">
									{product && product.product_quantity}
								</TableCell>
								<TableCell align="right">
									{product && product.product_taxe}
								</TableCell>
								<TableCell align="right">
									{product && product.product_barcode}
								</TableCell>
								<TableCell align="right">
									{product && product.product_alert}
								</TableCell>
							</TableRow>
						))}
				</TableBody>
			</Table>
		</TableContainer>
	)
}
