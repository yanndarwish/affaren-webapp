import { Gap, SubTitle } from "../../../assets/styles/common.styles"
import AddUserCard from "../AddUserCard/AddUserCard"
import UserCard from "../AdminCard/UserCard"

const AdminProfile = ({ users }) => {

	return (
		<>
			<SubTitle>Users</SubTitle>
			<Gap>
				<AddUserCard />
				{users?.map((user, i) => (
					<UserCard key={i} user={user} />
				))}
			</Gap>
		</>
	)
}

export default AdminProfile
