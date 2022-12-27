import * as React from "react"
import Table from "@mui/material/Table"
import TableBody from "@mui/material/TableBody"
import TableCell from "@mui/material/TableCell"
import TableContainer from "@mui/material/TableContainer"
import TableHead from "@mui/material/TableHead"
import TableRow from "@mui/material/TableRow"
import Paper from "@mui/material/Paper"
import { Modal } from "modal-rjs"
import { useState } from "react"
import { ArtTitle, Column, Gap, SpaceHeader } from "../../../assets/styles/common.styles"
import Button from "../../common/Button/Button.component"

export default function SalesTable({ data }) {
	const [selected, setSelected] = useState("")
	const [isOpen, setIsOpen] = useState(false)

	const handleClick = (e) => {
		let id = e.target.parentNode.dataset.id
		setSelected(id)
		setIsOpen(true)
	}

    const handleTicketPrint = () => {
        console.log("print ticket")
    }

    const handleSaleDelete = () => {
        console.log("delete sale " + selected)
    }

	const ModalBody = () => {
		const sale =
			data && data.find((sale) => sale.sale_id === parseInt(selected))
		console.log(sale)
		return (
			<Column>
				<ArtTitle>{sale.sale_amount + " €"}</ArtTitle>
				<div>
					<h3>
						Paid by{" "}
						{Object.keys(sale.sale_payment_methods).length > 1
							? Object.keys(sale.sale_payment_methods).map(
									(payment) =>
										payment + " : " + sale.sale_payment_methods[payment] + " € "
							  )
							: Object.keys(sale.sale_payment_methods)[0]}
					</h3>
					{Object.keys(sale.sale_taxes).map((item, i) => (
						<h3 key={i}>
							{item} : {sale.sale_taxes[item]} €
						</h3>
					))}
				</div>
			</Column>
		)
	}

    const ModalFooter = () => {
        return (
            <Gap>
                <Button title="Delete Sale" color="error" onClick={handleSaleDelete}/>
                <Button title="Print Ticket" onClick={handleTicketPrint}/>
            </Gap>
        )
    }
	return (
		<>
			<TableContainer component={Paper} sx={{ maxHeight: 500 }}>
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
						{data &&
							data.map((sale, i) => {
								return i === 0 ? (
									<React.Fragment key={"separation " + i}>
										<TableRow>
											<TableCell component="th" scope="row"></TableCell>
											<TableCell>
												<h2>
													{sale.sale_year +
														"-" +
														sale.sale_month +
														"-" +
														sale.sale_day}
												</h2>
											</TableCell>

											<TableCell></TableCell>
											<TableCell></TableCell>
											<TableCell></TableCell>
											<TableCell></TableCell>
											<TableCell></TableCell>
										</TableRow>
										<TableRow
											key={sale.sale_id}
											data-id={sale.sale_id}
											sx={{
												"&:last-child td, &:last-child th": {
													border: 0,
												},
											}}
											onClick={handleClick}
										>
											<TableCell component="th" scope="row">
												<h4>{sale.sale_id}</h4>
											</TableCell>
											<TableCell>
												{sale.sale_year +
													"-" +
													sale.sale_month +
													"-" +
													sale.sale_day}
											</TableCell>
											<TableCell align="right">{sale.sale_amount} €</TableCell>
											<TableCell align="right">
												{Object.keys(sale.sale_payment_methods)[0]}
											</TableCell>
											<TableCell align="right">{sale.sale_user}</TableCell>
											<TableCell align="right">
												{sale.sale_discount.length > 0 ? "Yes" : "No"}
											</TableCell>
											<TableCell align="right">
												{sale.sale_taxes.totalTva}
											</TableCell>
										</TableRow>
									</React.Fragment>
								) : i > 0 &&
								  data &&
								  data[i].sale_day !== data[i - 1].sale_day ? (
									<React.Fragment key={"separation " + i}>
										<TableRow key={i}>
											<TableCell component="th" scope="row"></TableCell>
											<TableCell>
												<h2>
													{sale.sale_year +
														"-" +
														sale.sale_month +
														"-" +
														sale.sale_day}
												</h2>
											</TableCell>

											<TableCell></TableCell>
											<TableCell></TableCell>
											<TableCell></TableCell>
											<TableCell></TableCell>
											<TableCell></TableCell>
										</TableRow>
										<TableRow
											key={sale.sale_id}
											data-id={sale.sale_id}
											sx={{
												"&:last-child td, &:last-child th": {
													border: 0,
												},
											}}
											onClick={handleClick}
										>
											<TableCell component="th" scope="row">
												<h4>{sale.sale_id}</h4>
											</TableCell>
											<TableCell>
												{sale.sale_year +
													"-" +
													sale.sale_month +
													"-" +
													sale.sale_day}
											</TableCell>
											<TableCell align="right">{sale.sale_amount} €</TableCell>
											<TableCell align="right">
												{Object.keys(sale.sale_payment_methods)[0]}
											</TableCell>
											<TableCell align="right">{sale.sale_user}</TableCell>
											<TableCell align="right">
												{sale.sale_discount.length > 0 ? "Yes" : "No"}
											</TableCell>
											<TableCell align="right">
												{sale.sale_taxes.totalTva}
											</TableCell>
										</TableRow>
									</React.Fragment>
								) : (
									<TableRow
										key={sale.sale_id}
										data-id={sale.sale_id}
										sx={{
											"&:last-child td, &:last-child th": {
												border: 0,
											},
										}}
										onClick={handleClick}
									>
										<TableCell component="th" scope="row">
											<h4>{sale.sale_id}</h4>
										</TableCell>
										<TableCell>
											{sale.sale_year +
												"-" +
												sale.sale_month +
												"-" +
												sale.sale_day}
										</TableCell>
										<TableCell align="right">{sale.sale_amount} €</TableCell>
										<TableCell align="right">
											{Object.keys(sale.sale_payment_methods)[0]}
										</TableCell>
										<TableCell align="right">{sale.sale_user}</TableCell>
										<TableCell align="right">
											{sale.sale_discount.length > 0 ? "Yes" : "No"}
										</TableCell>
										<TableCell align="right">
											{sale.sale_taxes.totalTva}
										</TableCell>
									</TableRow>
								)
							})}
					</TableBody>
				</Table>
			</TableContainer>
			<Modal
				isOpen={isOpen}
				setIsOpen={setIsOpen}
				title={"Sale " + selected}
				bodyContent={<ModalBody />}
                footerContent={<ModalFooter />}
			/>
		</>
	)
}
