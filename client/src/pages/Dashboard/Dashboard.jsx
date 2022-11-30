import Input from "../../components/Input/Input.component"
import Button from "../../components/Button/Button.component"
import { useGetProfilesMutation } from "../../redux/services/api"
import { useSelector } from "react-redux"
import { useEffect } from "react"
import { Body, Container, Flex, SpaceHeader, SubTitle, Title } from "../../assets/styles/common.styles"

const Dashboard = () => {
	const user = useSelector((state) => state.user.user)
	const users = useSelector((state) => state.user.users)
	const theme = useSelector((state) => state.theme.theme)
	const [getProfiles, res] = useGetProfilesMutation()
	console.log(users)

	useEffect(() => {
		getProfiles({ user: user })
	}, [user])

	return (
		<Container theme={theme}>
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
		</Container>
	)
}

export default Dashboard
