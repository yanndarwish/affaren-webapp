import { IconButton, Modal as MuiModal, Stack, Typography } from "@mui/material"
import { useState } from "react"
import { SpaceBetween } from "../../../assets/common/common.styles"
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined"

const style = {
	position: "absolute",
	top: "50%",
	left: "50%",
	transform: "translate(-50%, -50%)",
	width: 400,
	bgcolor: "background.paper",
	boxShadow: 24,
	p: 4,
}

export const Modal = ({ open, title, handleClose, children }) => {
	return (
		<div>
			<MuiModal
				open={open}
				onClose={handleClose}
				aria-labelledby="modal-modal-title"
				aria-describedby="modal-modal-description"
			>
				<Stack direction="column" spacing={2} sx={style}>
					<SpaceBetween>
						<Typography id="modal-modal-title" variant="h6" component="h2">
							{title}
						</Typography>
						<IconButton onClick={handleClose}>
							<CloseOutlinedIcon />
						</IconButton>
					</SpaceBetween>
					{children}
				</Stack>
			</MuiModal>
		</div>
	)
}

export const useModal = () => {
	const [open, setOpen] = useState(false)
	const [data, setData] = useState(null)
	const openModal = () => setOpen(true)
	const closeModal = () => setOpen(false)

	return { open, data, openModal, closeModal, setData }
}
