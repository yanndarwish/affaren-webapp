
import Input from "../../components/Input/Input.component"
import Button from "../../components/Button/Button.component"
import { useGetProfilesMutation } from "../../redux/services/api"
import { useSelector } from "react-redux"
import { useEffect } from "react"
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
		<div
			
		>
			<div >
				<h1
					
				>
					Dashboard
				</h1>
				<div>
					{/* replace by datepicker */}
					<Input theme={theme} />
					<Button color="purple" title="Search" />
				</div>
			</div>
			<div
				
			>
				<div>
					<h2>Charts</h2>
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

export default Dashboard
