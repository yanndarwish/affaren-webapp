import { useSelector } from "react-redux"
import {
	Body,
	Container,
	Flex,
	Header,
	SpaceHeader,
	SubTitle,
	Title,
} from "../../assets/styles/common.styles"
import { useGetSalesQuery } from "../../redux/services/salesApi"
import SalesTable from "../../components/SALES/SalesTable/SalesTable"

const Sales = () => {
	const theme = useSelector((state) => state.theme.theme)
    const {data, error, isLoading} = useGetSalesQuery()

	return (
		<Container theme={theme}>
			<Header>
				<Title>Sales</Title>
			</Header>
			<Body theme={theme}>
				<SpaceHeader>
					<SubTitle>All Sales</SubTitle>
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
