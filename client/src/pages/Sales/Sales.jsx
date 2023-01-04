import { useSelector } from "react-redux"
import {
	Body,
	Container,
	Header,
	SubTitle,
	Title,
} from "../../assets/styles/common.styles"
import { useGetSalesQuery } from "../../redux/services/salesApi"
import SalesTable from "../../components/SALES/SalesTable/SalesTable"

const Sales = () => {
	const theme = useSelector((state) => state.theme.theme)
	const { data, error, isLoading } = useGetSalesQuery()

	return (
		<Container theme={theme}>
			<Header>
				<Title>Sales</Title>
			</Header>
			<Body theme={theme}>
				<SubTitle>All Sales</SubTitle>
				<SalesTable array={data} />
			</Body>
		</Container>
	)
}

export default Sales
