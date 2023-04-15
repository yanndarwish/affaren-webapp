import { useSelector } from "react-redux"
import {
	Body,
	Container,
	Header,
	SubTitle,
	Title,
	SpaceHeaderCenter,
} from "../../assets/common/common.styles"
import Button from "../../components/common/Button/Button.component"
import { useGetSalesQuery } from "../../redux/services/salesApi"
import SalesTable from "../../components/SALES/SalesTable/SalesTable"
import { useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import InfoMessage from "../../components/common/InfoMessage/InfoMessage"

const Sales = () => {
	const [pageNumber, setPageNumber] = useState(1)
	const loggedIn = useSelector((state) => state.login.loggedIn)
	const theme = useSelector((state) => state.theme.theme)
	const { data, isError } = useGetSalesQuery(pageNumber)
	const navigate = useNavigate()

	const redirect = () => {
		!loggedIn && navigate("/login")
	}

	const handleClick = (num) => {
		setPageNumber(pageNumber + num)
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
				{isError ? (
					<InfoMessage state="error" text="Failed to fetch sales" />
				) : (
					<>
						<SalesTable array={data} />
						<SpaceHeaderCenter style={{ width: "100%" }}>
							<Button
								title="Prev"
								onClick={() => handleClick(-1)}
								disabled={pageNumber === 1}
							/>
							<Button
								title="Next"
								onClick={() => handleClick(1)}
								disabled={data && data.length < 25}
							/>
						</SpaceHeaderCenter>
					</>
				)}
			</Body>
		</Container>
	)
}

export default Sales
