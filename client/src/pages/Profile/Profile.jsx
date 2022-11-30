import { useSelector } from "react-redux"
import { useGetProfileQuery } from "../../redux/services/api"

const Profile = () => {
	const { data, isLoading, error } = useGetProfileQuery()
	const theme = useSelector((state) => state.theme.theme)
	const token = useSelector((state) => state.login.token)
	const user = useSelector((state) => state.user.user)

	return (
		<div>
			<div>
				<h1>
					{user && user.firstName} {user && user.lastName}
				</h1>
			</div>
			<div></div>
			<div>
				<div>
					<h2>Performances</h2>
				</div>
				<div></div>

				<div>
					<div></div>
					<div></div>
				</div>
			</div>
		</div>
	)
}

export default Profile
