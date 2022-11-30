import { useSelector } from "react-redux"
import { Body, Container, Header, SubTitle, Title } from "../../assets/styles/common.styles"
import { useGetProfileQuery } from "../../redux/services/api"

const Profile = () => {
	const { data, isLoading, error } = useGetProfileQuery()
	const theme = useSelector((state) => state.theme.theme)
	const token = useSelector((state) => state.login.token)
	const user = useSelector((state) => state.user.user)

	return (
		<Container theme={theme}>
			<Header>
				<Title>
					{user && user.firstName} {user && user.lastName}
				</Title>
			</Header>
			<div></div>
			<Body theme={theme}>
				<div>
					<SubTitle>Performances</SubTitle>
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

export default Profile
