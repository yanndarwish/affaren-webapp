import { useSelector } from "react-redux"
import { Body, Container, Header, SubTitle, Title } from "../../assets/styles/common.styles"
import { useGetUserQuery } from "../../redux/services/userApi"
import UserProfile from "../../components/PROFILE/UserProfile/UserProfile"

const Profile = () => {
	const { data, isLoading, error } = useGetUserQuery()
	const theme = useSelector((state) => state.theme.theme)
	const token = useSelector((state) => state.login.token)
	const user = useSelector((state) => state.user.user)

	return (
		<Container>
			<Header>
				<Title>
					{user && user.user_first_name} {user && user.user_last_name}
				</Title>
			</Header>
			<Body theme={theme}>
					<UserProfile user={user}/>
			</Body>
		</Container>
	)
}

export default Profile
