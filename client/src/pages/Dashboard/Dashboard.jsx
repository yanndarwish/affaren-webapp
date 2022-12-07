import Input from "../../components/Input/Input.component"
import Button from "../../components/Button/Button.component"
import { useGetUsersMutation } from "../../redux/services/userApi"
import { useSelector } from "react-redux"
import { useEffect } from "react"
import { Grid } from "@mui/material"
import { Body, Container, Flex, SpaceHeader, SubTitle, Title } from "../../assets/styles/common.styles"

const Dashboard = () => {
	const user = useSelector((state) => state.user.user)
	const users = useSelector((state) => state.user.users)
	const theme = useSelector((state) => state.theme.theme)
	const [getUsers, res] = useGetUsersMutation()
	console.log(users)

	useEffect(() => {
		getUsers({ user: user })
	}, [user])

	return (
		<Grid item>
			<SpaceHeader>
				<Title>Dashboard</Title>
				<Flex>
					{/* replace by datepicker */}
					<Input theme={theme} />
					<Button color="purple" title="Search" />
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
		</Grid>
	)
}

export default Dashboard
