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
import { useNavigate } from "react-router-dom"
import { useEffect } from "react"

const Sales = () => {
	const loggedIn = useSelector((state) => state.login.loggedIn)
	const theme = useSelector((state) => state.theme.theme)
	const { data, error, isLoading } = useGetSalesQuery()
	const navigate = useNavigate()

	const redirect = () => {
		!loggedIn && navigate("/login")
	}

	useEffect(() => {
		redirect()
	}, [])

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
