import { StyledTablesSection } from "./TablesSection.styles"
import { useSelector } from "react-redux"
import { useGetTablesQuery, usePostTableMutation } from "../../../redux/services/tablesApi"
import TableCard from "./TableCard"
import TableSlider from "../Sliders/TableSlider/TableSlider"
import AddTableCard from "./AddTableCard/AddTableCard"

const TablesSection = ({ theme, onClick }) => {
    useGetTablesQuery()
	const tables = useSelector((state) => state.table.tables)
	const [postTable, res] = usePostTableMutation()

	const handleAddTable = () => {
		const timestamp = new Date()

		const day = timestamp.getDate()
		const month = timestamp.getMonth() + 1
		const year = timestamp.getFullYear()

		const table = {
			year: year,
			month: month, 
			day: day,
			status: "active"
		}
		postTable(table)
		console.log("add table")
	}
	return (
		<StyledTablesSection theme={theme} id="table-section">
			{/* dynamically create boxes based on cards */}
			{tables &&
				tables.map((card, i) => (
					<TableCard
						key={card.table_id}
						theme={theme}
						id={card.table_id}
						name={"Table "+ (i + 1)}
						price={card.table_price}
                        onClick={onClick}
					/>
				))}
				<AddTableCard onClick={handleAddTable}/>
		</StyledTablesSection>
	)
}

export default TablesSection
