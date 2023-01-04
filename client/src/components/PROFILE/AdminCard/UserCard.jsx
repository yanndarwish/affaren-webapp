import { Card, CardActions, CardContent, Typography } from "@mui/material"
import { useState } from "react"
import { ArtTitle, Column } from "../../../assets/styles/common.styles"
import Button from "../../common/Button/Button.component"
import EditUserSlider from "../Sliders/EditUserSlider"

const UserCard = ({ user }) => {
	const [isOpen, setIsOpen] = useState(false)


	const openEdit = () => {
		setIsOpen(!isOpen)
	}


	return (
		<Card sx={{ flex: "1 1 auto", textAlign: "center", paddingBottom: "1rem" }}>
			<CardContent>
				<Column>
					<ArtTitle>
						{user?.user_first_name} {user?.user_last_name}
					</ArtTitle>
					<Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
						{user?.user_email}
					</Typography>
					<Typography variant="h5" component="div">
						{user?.user_is_admin === "true" ? "Admin" : "Not Admin"}
					</Typography>
				</Column>
			</CardContent>
			<CardActions sx={{ justifyContent: "center" }}>
				<Button title="Edit" onClick={openEdit} />
			</CardActions>
            <EditUserSlider isOpen={isOpen} setIsOpen={setIsOpen} user={user}/>
		</Card>
	)
}

export default UserCard
