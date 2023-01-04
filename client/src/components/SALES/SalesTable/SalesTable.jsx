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
import { useDeleteSaleMutation } from "../../../redux/services/salesApi"
import { useGetSaleProductsQuery } from "../../../redux/services/salesApi"
import { ArtTitle, HorizontalCenter } from "../../../assets/styles/common.styles"
import Button from "../../common/Button/Button.component"

export default function SalesTable({ array }) {
	const [selected, setSelected] = useState("")
	const [id, setId] = useState("")
	const [skip, setSkip] = useState(true)
	const [isOpen, setIsOpen] = useState(false)
	const [isModalDelete, setIsModalDelete] = useState(false)
	const [deleteSale, res] = useDeleteSaleMutation()
	const {data} = useGetSaleProductsQuery({id:id && id}, {skip})

	const handleClick = (e) => {
		let id = e.target.parentNode.dataset.id
		setSelected(id)
		setId(id)
		setIsOpen(true)
		setSkip(false)
	}

	const toggleDeleteModal = () => {
		setIsModalDelete(!isModalDelete)
	}

	const DeleteModalBody = () => {
		return <ArtTitle>Are you sure you want to delete this sale ?</ArtTitle>
	}

	const DeleteModalFooter = () => {
		return <Button title="Delete" color="success" onClick={handleSaleDelete}/>
	}

	const handleTicketPrint = () => {
		console.log("print ticket " + selected)
	}

	const handleSaleDelete = () => {
		console.log("delete sale " + selected)
		deleteSale({id: selected})
		setIsModalDelete(false)
	}

	const DeleteConfirmation = () => {
		return (
			<HorizontalCenter>
				<ArtTitle>Sale {selected} has been deleted successfully!</ArtTitle>
			</HorizontalCenter>
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
						{array &&
							array.map((sale, i) => {
								return i === 0 ? (
									<React.Fragment key={"separator " +i}>
										<SalesTableRowSeparator sale={sale} />
										<SalesTableRow sale={sale} onClick={handleClick} />
									</React.Fragment>
								) : i > 0 &&
								  array &&
								  array[i].sale_day !== array[i - 1].sale_day ? (
									<React.Fragment key={"separatore" + i}>
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
				bodyContent={res.isSuccess ? <DeleteConfirmation />: <SalesModalBody data={array} selected={selected} details={data}/>}
				footerContent={res.isSuccess ? null :
					<SalesModalFooter
						deleteClick={toggleDeleteModal}
						printClick={handleTicketPrint}
					/>
				}
			/>
			<Modal isOpen={isModalDelete} setIsOpen={setIsModalDelete} title="Delete Sale" bodyContent={<DeleteModalBody />} footerContent={<DeleteModalFooter />} />
		</>
	)
}
