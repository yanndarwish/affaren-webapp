import Input from "../../components/common/Input/Input.component"
import Button from "../../components/common/Button/Button.component"
import { useGetUsersMutation } from "../../redux/services/userApi"
import { useGetMonthSalesQuery } from "../../redux/services/salesApi"
import { useSelector } from "react-redux"
import { useEffect } from "react"
import { Grid } from "@mui/material"
import { Body, Container, Flex, SpaceHeader, SubTitle, Title } from "../../assets/styles/common.styles"

const Dashboard = () => {
	const user = useSelector((state) => state.user.user)
	const users = useSelector((state) => state.user.users)
	const theme = useSelector((state) => state.theme.theme)
	const [getUsers, res] = useGetUsersMutation()
	const {data, error, isLoading} = useGetMonthSalesQuery({date:'09-12-2022'})
	console.log(users)
	console.log(data)
	useEffect(() => {
		getUsers({ user: user })
	}, [user])

	return (
		<Container theme={theme}>
			<SpaceHeader>
				<Title>Dashboard</Title>
				<Flex>
					{/* replace by datepicker */}
					<Input type="date"/>
				</Flex>
			</SpaceHeader>
			<Body theme={theme}>
				<div>
					<SubTitle>Charts</SubTitle>
				</div>
				<div></div>

				<div>
					<div></div>
					<div></div>
				</div>
			</Body>
		</Container>
	)
}

export default Dashboard
