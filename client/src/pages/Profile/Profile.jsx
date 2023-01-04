import { useSelector } from "react-redux"
import {
	Body,
	Container,
	Header,
	SubTitle,
	Title,
} from "../../assets/styles/common.styles"
import {
	useGetUserQuery,
	useGetUsersMutation,
} from "../../redux/services/userApi"
import UserProfile from "../../components/PROFILE/UserProfile/UserProfile"
import AdminProfile from "../../components/PROFILE/AdminProfile/AdminProfile"
import { useEffect } from "react"

const Profile = () => {
	useGetUserQuery()
	const [getUsers] = useGetUsersMutation()
	const theme = useSelector((state) => state.theme.theme)
	const user = useSelector((state) => state.user.user)
	const users = useSelector((state) => state.user.users)

	useEffect(() => {
		console.log("getting")
		Object.keys(user).length && getUsers({ user: user })
	}, [user])

	return (
		<Container theme={theme}>
			<Header>
				<Title>
					{user && user.user_first_name} {user && user.user_last_name}
				</Title>
			</Header>
			<Body theme={theme}>
				<UserProfile user={user} />
			</Body>
			{user?.user_is_admin === "true" && (
				<Body theme={theme}>
					<AdminProfile users={users} />
				</Body>
			)}
		</Container>
	)
}

export default Profile
