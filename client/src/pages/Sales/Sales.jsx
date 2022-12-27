import { useSelector } from "react-redux"
import Input from "../../components/common/Input/Input.component"
import Button from "../../components/common/Button/Button.component"
import {
	Body,
	Container,
	Flex,
	Header,
	SearchSection,
	SpaceHeader,
	SubTitle,
	Title,
} from "../../assets/styles/common.styles"
import InventoryTable from "../../components/INVENTORY/InventoryTable/InventoryTable"
import { useGetSalesQuery } from "../../redux/services/salesApi"
import SalesTable from "../../components/SALES/SalesTable/SalesTable"

const Sales = () => {
	const theme = useSelector((state) => state.theme.theme)
    const {data, error, isLoading} = useGetSalesQuery()

    const sortData = (data) => {
        let copyData = data && [...data]
        let sortedData = copyData.sort((a,b) => a.sale_)
    }

	return (
		<Container theme={theme}>
			<Header>
				<Title>Sales</Title>
			</Header>
			<Body theme={theme}>
				<SpaceHeader>
					<SubTitle>Products</SubTitle>
				</SpaceHeader>
				<div>
					<SalesTable data={data} />
				</div>

				<div>
					<div></div>
					<div></div>
				</div>
			</Body>
		</Container>
	)
}

export default Sales
