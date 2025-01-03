import SalesTable from "../../components/SALES/SalesTable/SalesTable"
import { FixedContainer, PageContainer } from "../../components/shared/containers"
import { useConfig } from "../../lib/hooks/useConfig"

const Sales = () => {
	const { isActiveComponent } = useConfig()

	return (
		<PageContainer className="grid gap-4 md:grid-cols-12 grid-rows-1 h-full">
			<FixedContainer className="col-span-12">
				{isActiveComponent("sales", "table") && <SalesTable />}
			</FixedContainer>
		</PageContainer>
	)
}

export default Sales
