import { Body, SubTitle, Wrap } from "../../../assets/common/common.styles"
import AddUserCard from "../AddUserCard/AddUserCard"
import UserCard from "../AdminCard/UserCard"

const AdminProfile = ({ users, theme }) => {
	return (
		<Body theme={theme}>
			<SubTitle>Users</SubTitle>
			<Wrap>
				<AddUserCard />
				{users?.map((user, i) => (
					<UserCard key={i} user={user} />
				))}
			</Wrap>
		</Body>
	)
}

export default AdminProfile
