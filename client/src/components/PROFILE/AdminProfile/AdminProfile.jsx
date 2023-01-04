import { Gap, SubTitle, Wrap } from "../../../assets/styles/common.styles"
import AddUserCard from "../AddUserCard/AddUserCard"
import UserCard from "../AdminCard/UserCard"

const AdminProfile = ({ users }) => {

	return (
		<>
			<SubTitle>Users</SubTitle>
			<Wrap>
				<AddUserCard />
				{users?.map((user, i) => (
					<UserCard key={i} user={user} />
				))}
			</Wrap>
		</>
	)
}

export default AdminProfile
