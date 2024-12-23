import SalesTable from "../../components/SALES/SalesTable/SalesTable"
import { Stack } from "@mui/material"
import { PageTitle } from "../../components/shared/pageTitle"

const Sales = () => {
	return (
		<Stack direction="column" spacing={3} className="w-full h-full">
			<PageTitle title="Sales" />
			<Stack className="space-y-8 h-full overflow-y-hidden">
				<SalesTable />
			</Stack>
		</Stack>
	)
}

export default Sales
