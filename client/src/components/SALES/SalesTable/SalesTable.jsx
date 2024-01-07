import Table from "@mui/material/Table"
import TableBody from "@mui/material/TableBody"
import TableCell from "@mui/material/TableCell"
import TableContainer from "@mui/material/TableContainer"
import TableHead from "@mui/material/TableHead"
import TableRow from "@mui/material/TableRow"
import Paper from "@mui/material/Paper"
import { Modal } from "modal-rjs"
import { useState, Fragment } from "react"
import SalesTableRow from "../SalesTableRow/SalesTableRow"
import SalesTableRowSeparator from "../SalesTableRow/SalesTableRowSeparator"
import SalesModalBody from "../SalesModal/SalesModalBody"
import SalesModalFooter from "../SalesModal/SalesModalFooter"
import { useDeleteSaleMutation } from "../../../redux/services/salesApi"
import { useGetSaleProductsQuery } from "../../../redux/services/salesApi"
import { ArtTitle } from "../../../assets/common/common.styles"
import Button from "../../common/Button/Button.component"
import { usePostPrintMutation } from "../../../redux/services/printApi"
import InfoMessage from "../../common/InfoMessage/InfoMessage"

export default function SalesTable({ array }) {
	const [selected, setSelected] = useState("")
	const [id, setId] = useState("")
	const [skip, setSkip] = useState(true)
	const [isOpen, setIsOpen] = useState(false)
	const [isModalDelete, setIsModalDelete] = useState(false)
	const [deleteSale, res] = useDeleteSaleMutation()
	const [print, response] = usePostPrintMutation()
	const { data } = useGetSaleProductsQuery({ id: id && id }, { skip })

	const handleClick = (e) => {
		let id = e.target.parentNode.dataset.id
		setSelected(id)
		setId(id)
		setIsOpen(true)
		setSkip(false)
		if (response.status === "rejected") {
			response.reset()
		}
	}

	const toggleDeleteModal = () => {
		setIsModalDelete(!isModalDelete)
	}

	const DeleteModalBody = () => {
		return <ArtTitle>Are you sure you want to delete this sale ?</ArtTitle>
	}

	const DeleteModalFooter = () => {
		return <Button title="Delete" color="success" onClick={handleSaleDelete} />
	}

	const handleTicketPrint = () => {
		const sale =
			array && array.find((sale) => sale.sale_id === parseInt(selected))

		let products = []
		data.forEach((product) => {
			let prod = {
				name: product.product_name,
				price: product.product_price,
				quantity: product.product_quantity,
			}
			products.push(prod)
		})
		const formattedSale = {
			amount: sale.sale_amount,
			day: sale.sale_day,
			discount: sale.sale_discount,
			id: sale.sale_id,
			month: sale.sale_month,
			paymentMethods: sale.sale_payment_methods,
			products: products,
			taxes: sale.sale_taxes,
			user: sale.sale_user,
			year: sale.sale_year,
		}
		print(formattedSale)
	}

	const handleSaleDelete = () => {
		deleteSale({ id: selected })
		setIsModalDelete(false)
	}

	const DeleteConfirmation = () => {
		setTimeout(() => {
			setIsOpen(false)
			res.reset()
		}, 1000)
		return (
			<InfoMessage
				state="success"
				text={"Sale " + selected + " has been deleted successfully!"}
			/>
		)
	}

	const getDailyCashTotal = (data) => {
		let total = 0

		data.forEach((sale) => {
			if (sale.sale_payment_methods.cash) {
				total += sale.sale_payment_methods.cash
			}
		})

		return total
	}

	const getDailyCardTotal = (data) => {
		let total = 0

		data.forEach((sale) => {
			if (sale.sale_payment_methods.card) {
				total += sale.sale_payment_methods.card
			}
		})

		return total
	}

	const getDailyCheckTotal = (data) => {
		let total = 0

		data.forEach((sale) => {
			if (sale.sale_payment_methods.check) {
				total += sale.sale_payment_methods.check
			}
		})

		return total
	}

	const getDaysSales = (day) => {
		const result = []

		array.forEach((sale) => {
			if (sale.sale_day === day) {
				result.push(sale)
			}
		})
		return result
	}

	return (
		<>
			<TableContainer component={Paper}>
				<Table sx={{ minWidth: 650 }} aria-label="simple table" stickyHeader>
					<TableHead>
						<TableRow>
							<TableCell>Id</TableCell>
							<TableCell>Date</TableCell>
							<TableCell align="right">Total</TableCell>
							<TableCell align="right">Payment</TableCell>
							<TableCell align="right">User</TableCell>
							<TableCell align="right">Discount</TableCell>
							<TableCell align="right">TVA</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{array &&
							array.map((sale, i) => {
								return i === 0 ? (
									<Fragment key={"separator " + i}>
										<SalesTableRowSeparator
											sale={sale}
											cashTotal={getDailyCashTotal(getDaysSales(sale.sale_day))}
											cardTotal={getDailyCardTotal(getDaysSales(sale.sale_day))}
											checkTotal={getDailyCheckTotal(
												getDaysSales(sale.sale_day)
											)}
										/>
										<SalesTableRow sale={sale} onClick={handleClick} />
									</Fragment>
								) : i > 0 &&
								  array &&
								  array[i].sale_day !== array[i - 1].sale_day ? (
									<Fragment key={"separatore" + i}>
										<SalesTableRowSeparator
											sale={sale}
											cashTotal={getDailyCashTotal(getDaysSales(sale.sale_day))}
											cardTotal={getDailyCardTotal(getDaysSales(sale.sale_day))}
											checkTotal={getDailyCheckTotal(
												getDaysSales(sale.sale_day)
											)}
										/>

										<SalesTableRow sale={sale} onClick={handleClick} />
									</Fragment>
								) : (
									<SalesTableRow
										sale={sale}
										onClick={handleClick}
										key={sale.sale_id}
									/>
								)
							})}
					</TableBody>
				</Table>
			</TableContainer>
			<Modal
				isOpen={isOpen}
				setIsOpen={setIsOpen}
				title={"Sale " + selected}
				bodyContent={
					res.isSuccess ? (
						<DeleteConfirmation />
					) : res.isError ? (
						<InfoMessage state="error" text="Failed to delete sale" />
					) : response.isError ? (
						<InfoMessage state="error" text="Failed to print ticket" />
					) : (
						<SalesModalBody data={array} selected={selected} details={data} />
					)
				}
				footerContent={
					res.isSuccess ? null : (
						<SalesModalFooter
							deleteClick={toggleDeleteModal}
							printClick={handleTicketPrint}
						/>
					)
				}
			/>
			<Modal
				isOpen={isModalDelete}
				setIsOpen={setIsModalDelete}
				title="Delete Sale"
				bodyContent={<DeleteModalBody />}
				footerContent={<DeleteModalFooter />}
			/>
		</>
	)
}
