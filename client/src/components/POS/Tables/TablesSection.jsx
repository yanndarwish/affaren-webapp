import { StyledTablesSection } from "./TablesSection.styles"
import { useSelector } from "react-redux"
import { useGetTablesQuery } from "../../../redux/services/tablesApi"
import TableCard from "./TableCard"

const TablesSection = ({ theme, onClick }) => {
    useGetTablesQuery()
	const tables = useSelector((state) => state.table.tables)

    console.log(tables)
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
		</StyledTablesSection>
	)
}

export default TablesSection
