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
import SalesTableRow from "../SalesTableRow/SalesTableRow"
import SalesTableRowSeparator from "../SalesTableRow/SalesTableRowSeparator"
import SalesModalBody from "../SalesModal/SalesModalBody"
import SalesModalFooter from "../SalesModal/SalesModalFooter"

export default function SalesTable({ data }) {
	const [selected, setSelected] = useState("")
	const [isOpen, setIsOpen] = useState(false)

	const handleClick = (e) => {
		let id = e.target.parentNode.dataset.id
		setSelected(id)
		setIsOpen(true)
	}

	const handleTicketPrint = () => {
		console.log("print ticket " + selected)
	}

	const handleSaleDelete = () => {
		console.log("delete sale " + selected)
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
										<SalesTableRowSeparator sale={sale} />
										<SalesTableRow sale={sale} onClick={handleClick} />
									</React.Fragment>
								) : i > 0 &&
								  data &&
								  data[i].sale_day !== data[i - 1].sale_day ? (
									<React.Fragment key={"separation " + i}>
										<SalesTableRowSeparator sale={sale} />

										<SalesTableRow sale={sale} onClick={handleClick} />
									</React.Fragment>
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
				bodyContent={<SalesModalBody data={data} selected={selected} />}
				footerContent={
					<SalesModalFooter
						deleteClick={handleSaleDelete}
						printClick={handleTicketPrint}
					/>
				}
			/>
		</>
	)
}
