import { useSelector } from "react-redux"
import {
	useGetActiveTablesQuery,
	usePostTableMutation,
} from "../../../redux/services/tablesApi"
import { Backdrop, SpeedDial, SpeedDialAction } from "@mui/material"
import AddOutlinedIcon from "@mui/icons-material/AddOutlined"
import TableRestaurantOutlinedIcon from "@mui/icons-material/TableRestaurantOutlined"
import { useState, useContext } from "react"
import { WebSocketContext } from "../../../utils/context/webSocket"

const TablesSection = ({ theme, onClick }) => {
	useGetActiveTablesQuery()
	const activeTables = useSelector((state) => state.table.activeTables)
	const [postTable, res] = usePostTableMutation()
	const [open, setOpen] = useState(false)
	const handleOpen = () => setOpen(true)
	const handleClose = () => setOpen(false)
	const ws = useContext(WebSocketContext)

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
		}
		postTable(table)
	}

	ws?.sendMessage('haya')
	return (
		<>
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
					activeTables.map((card) => (
						<SpeedDialAction
							key={card.table_id}
							icon={<TableRestaurantOutlinedIcon />}
							data-id={card.table_id}
							onClick={onClick}
							tooltipTitle={card.table_id}
							tooltipOpen
						/>
					))}
				<SpeedDialAction
					icon={<AddOutlinedIcon />}
					onClick={handleAddTable}
					tooltipTitle="Add Table"
				/>
			</SpeedDial>
		</>
	)
}

export default TablesSection
