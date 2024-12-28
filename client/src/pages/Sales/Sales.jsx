import SalesTable from "../../components/SALES/SalesTable/SalesTable"
import { FixedContainer, PageContainer } from "../../components/shared/containers"

const Sales = () => {
	return (
		<PageContainer className="grid gap-4 md:grid-cols-12 grid-rows-1 h-full">
			<FixedContainer className="col-span-12">
				<SalesTable />
			</FixedContainer>
		</PageContainer>
	)
}

export default Sales
