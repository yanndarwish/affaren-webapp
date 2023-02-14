import { useSelector } from "react-redux"
import {
	useGetActiveTablesQuery,
	usePostTableMutation,
} from "../../../redux/services/tablesApi"
import { TextField } from "@mui/material"
import { Backdrop, SpeedDial, SpeedDialAction } from "@mui/material"
import AddOutlinedIcon from "@mui/icons-material/AddOutlined"
import TableRestaurantOutlinedIcon from "@mui/icons-material/TableRestaurantOutlined"
import { useState } from "react"
import { BigScreen, SmallScreen } from "./TableSection.styles"
import { CardTitle, StyledProductCard } from "../ProductCard/ProductCard.styles"
import AddIcon from "@mui/icons-material/Add"
import InfoMessage from "../../common/InfoMessage/InfoMessage"
import { Modal } from "modal-rjs"
import { ColumnCenter } from "../../../assets/common/common.styles"
import Button from "../../common/Button/Button.component"

const TablesSection = ({ theme, onClick }) => {
	useGetActiveTablesQuery()
	const activeTables = useSelector((state) => state.table.activeTables)
	const [modalIsOpen, setModalIsOpen] = useState(false)
	const [tableNumber, setTableNumber] = useState(1)
	const [postTable, res] = usePostTableMutation()
	const [open, setOpen] = useState(false)
	const handleOpen = () => setOpen(true)
	const handleClose = () => setOpen(false)

	const handleAddTable = () => {
		const timestamp = new Date()

		const day = timestamp.getDate()
		const month = timestamp.getMonth() + 1
		const year = timestamp.getFullYear()

		const table = {
			year: year,
			month: month,
			day: day,
			status: "active",
			number: tableNumber,
		}
		postTable(table)
	}
	
	const ModalBody = () => {
		const handleChange = (e) => {
			setTableNumber(e.target.value)
		}

		return res.isSuccess ? (
			<InfoMessage state="success" text="Table created successfully" />
		) : res.isError ? (
			<InfoMessage state="error" text="Failed to create table" />
		) : (
			<ColumnCenter>
				<TextField
					id="table-number-input"
					size="lg"
					type="number"
					color="primary"
					variant="outlined"
					value={tableNumber}
					onChange={(e) => handleChange(e)}
					autoFocus={true}
				/>
			</ColumnCenter>
		)
	}

	const ModalFooter = () => {
		return res.isSuccess || res.isError ? (
			<Button title="Close" onClick={() => close()} />
		) : (
			<Button title="Add Table" onClick={() => handleAddTable()} />
		)
	}

	const toggleModal = () => {
		setModalIsOpen(!modalIsOpen)
	}

	const close = () => {
		res.reset()
		toggleModal()
		setTableNumber(1)
	}

	return (
		<>
			{res.isError && (
				<InfoMessage state="error" text="Failed to create table" />
			)}
			<SmallScreen>
				<StyledProductCard onClick={toggleModal}>
					<AddIcon />
				</StyledProductCard>
				{activeTables?.map((table) => (
					<StyledProductCard
						key={table.table_id}
						data-id={table.table_id}
						onClick={onClick}
					>
						<CardTitle data-id={table.table_id}>{table.table_number}</CardTitle>
					</StyledProductCard>
				))}
			</SmallScreen>
			<BigScreen>
				<Backdrop open={open} sx={{ zIndex: 2 }} />
				<SpeedDial
					ariaLabel="SpeedDial basic example"
					sx={{ position: "absolute", top: 48, right: 48, zIndex: 3 }}
					icon={<TableRestaurantOutlinedIcon />}
					onClose={handleClose}
					onOpen={handleOpen}
					direction="down"
				>
					{activeTables &&
						activeTables.map((card, i) => (
							<SpeedDialAction
								key={card.table_id}
								icon={<TableRestaurantOutlinedIcon />}
								data-id={card.table_id}
								onClick={onClick}
								tooltipTitle={card.table_number}
								tooltipOpen
							/>
						))}
					<SpeedDialAction
						icon={<AddOutlinedIcon />}
						onClick={toggleModal}
						tooltipTitle="Add Table"
					/>
				</SpeedDial>
			</BigScreen>
			<Modal
				title="Table number"
				isOpen={modalIsOpen}
				setIsOpen={setModalIsOpen}
				bodyContent={<ModalBody />}
				footerContent={<ModalFooter />}
			/>
		</>
	)
}

export default TablesSection
