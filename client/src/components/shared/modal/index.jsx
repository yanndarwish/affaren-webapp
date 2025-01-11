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
	maxWidth: "90%",
	maxHeight: "90%",
	overflow: "auto",
	boxShadow: 24,
	p: 3,
	zIndex: 1,
}

export const Modal = ({ open, title, handleClose, children, className }) => {
	if (!open) return null

	return (
		<MuiModal
			open={open}
			onClose={handleClose}
			aria-labelledby="modal-modal-title"
			aria-describedby="modal-modal-description"
			className="!z-10"
		>
			<Stack
				direction="column"
				spacing={2}
				sx={style}
				className={`${className} rounded-lg`}
			>
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
	)
}

export const useModal = () => {
	const [open, setOpen] = useState(false)
	const [data, setData] = useState({})
	const openModal = () => setOpen(true)
	const closeModal = () => setOpen(false)

	return { open, data, openModal, closeModal, setData }
}
