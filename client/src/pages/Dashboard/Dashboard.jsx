import { useGetUsersMutation } from "../../redux/services/userApi"
import { useSelector } from "react-redux"
import { useEffect } from "react"
import {
	Body,
	Container,
	Flex,
	SpaceHeader,
	SubTitle,
	Title,
} from "../../assets/styles/common.styles"
import DateInput from "../../components/DASHBOARD/DateInput/DateInput"
import ChartB from "../../components/DASHBOARD/Charts/ChartB/ChartB"
import ChartA from "../../components/DASHBOARD/Charts/ChartA/ChartA"
import ChartC from "../../components/DASHBOARD/Charts/ChartC/ChartC"

const Dashboard = () => {
	const user = useSelector((state) => state.user.user)
	const theme = useSelector((state) => state.theme.theme)
	const [getUsers] = useGetUsersMutation()

	useEffect(() => {
		getUsers({ user: user })
	}, [user])

	return (
		<Container theme={theme}>
			<SpaceHeader>
				<Title>Dashboard</Title>
				<Flex>
					<DateInput />
				</Flex>
			</SpaceHeader>
			<Body theme={theme}>
				<div>
					<SubTitle>Charts</SubTitle>
				</div>
				<div>
					<ChartA theme={theme} />
				</div>

				<div>
					<ChartB theme={theme} />
				</div>
				<ChartC theme={theme} />
			</Body>
		</Container>
	)
}

export default Dashboard
