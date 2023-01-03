import { Card, CardActions, CardContent, Typography } from "@mui/material"
import { ArtTitle, Column } from "../../../assets/styles/common.styles"
import Button from "../../common/Button/Button.component"

const UserCard = ({ user }) => {
const handleEdit = () => {
    console.log(user)
}

	return (
		<Card sx={{ maxWidth: 350, textAlign: "center", paddingBottom: "1rem" }}>
			<CardContent>
				<Column>
					<ArtTitle>
						{user?.user_first_name} {user?.user_last_name}
					</ArtTitle>
					<Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
						{user?.user_email}
					</Typography>
					<Typography variant="h5" component="div">
						{user?.user_is_admin ? "Admin" : "Not Admin"}
					</Typography>
				</Column>
			</CardContent>
			<CardActions sx={{ justifyContent: "center" }}>
				<Button title="Edit" onClick={handleEdit} />
			</CardActions>
		</Card>
	)
}

export default UserCard
