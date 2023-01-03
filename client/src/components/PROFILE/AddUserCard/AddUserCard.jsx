import { Card, CardContent } from "@mui/material"
import { ArtTitle } from "../../../assets/styles/common.styles"
import AddIcon from "@mui/icons-material/Add"
import { Box } from "@mui/system"
import { useState } from "react"
import CreateUserSlider from "../Sliders/CreateUserSlider"

const AddUserCard = () => {
	const [isOpen, setIsOpen] = useState(false)

	const handleClick = () => {
		setIsOpen(!isOpen)
	}

	return (
		<Card sx={{ maxWidth: 350, textAlign: "center" }}>
			<CardContent sx={{ height: "100%" }} onClick={handleClick}>
				<ArtTitle>Create New User</ArtTitle>
				<Box
					sx={{
						height: "100%",
						display: "flex",
						justifyContent: "center",
						alignItems: "center",
					}}
				>
					<ArtTitle>
						<AddIcon sx={{ fontSize: "48px" }} />
					</ArtTitle>
				</Box>
			</CardContent>
			<CreateUserSlider isOpen={isOpen} setIsOpen={setIsOpen} />
		</Card>
	)
}

export default AddUserCard
