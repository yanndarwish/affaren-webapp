import React, { useRef, useState } from "react"
import {
	ArtTitle,
	FullCenter,
	SpaceHeader,
	SubTitle,
} from "../../../assets/styles/common.styles"
import {
	Dialog,
	DialogBody,
	DialogCard,
	DialogFooter,
	DialogHeader,
	Overlay,
} from "../../POS/Sliders/Slider.styles"
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined"
import { Checkbox, FormControl, FormControlLabel } from "@mui/material"
import { FormWrapper } from "../../POS/Sliders/NoBarcodeSlider/NoBarcodeSlider.styles"
import Button from "../../common/Button/Button.component"
import { useSelector } from "react-redux"
import {
	useDeleteUserMutation,
	usePatchUserMutation,
} from "../../../redux/services/userApi"

const EditUserSlider = ({ isOpen, setIsOpen, user }) => {
	const theme = useSelector((state) => state.theme.theme)
	const [isAdmin, setIsAdmin] = useState(
		user.user_is_admin === "true" ? true : false
	)
	const overlayRef = useRef()
	const [patchUser, res] = usePatchUserMutation()
	const [deleteUser, response] = useDeleteUserMutation()

	const closeSlider = (e) => {
		if (overlayRef.current === e.target) {
			setIsOpen(false)
		}
	}

	const handleDelete = () => {
		deleteUser({ id: user.user_id })
	}

	const handleClose = () => {
		setIsOpen(false)
	}

	const handleEdit = () => {
		let newUser = {
			isAdmin: isAdmin ? "true" : "false",
			id: user.user_id,
		}
		patchUser(newUser)
	}

	return isOpen ? (
		<Overlay theme={theme} onClick={closeSlider} ref={overlayRef}>
			<Dialog id="dialog" theme={theme}>
				<DialogHeader>
					<SubTitle>Edit User</SubTitle>
					<CloseOutlinedIcon onClick={() => setIsOpen(false)} />
				</DialogHeader>
				<DialogBody>
					<SpaceHeader>
						<ArtTitle>
							{user?.user_first_name} {user?.user_last_name}
						</ArtTitle>
						<Button title="Delete User" color="error" onClick={handleDelete} />
					</SpaceHeader>
					<DialogCard theme={theme}>
						{res.isSuccess || response.isSuccess ? (
							<FullCenter>
								<SubTitle>
									User {res.isSuccess ? "Edited" : "Deleted"} Successfully
								</SubTitle>
							</FullCenter>
						) : (
							<FormControl fullWidth>
								<FormWrapper>
									<FullCenter>
										<FormControlLabel
											value="start"
											control={
												<Checkbox
													checked={isAdmin}
													onChange={() => setIsAdmin(!isAdmin)}
												/>
											}
											label={user.user_first_name + " has Admin rights"}
											labelPlacement="start"
										/>
										{res.isError && <ArtTitle>{res.error.data}</ArtTitle>}
									</FullCenter>
								</FormWrapper>
							</FormControl>
						)}
					</DialogCard>
				</DialogBody>
				<DialogFooter>
					<Button
						title={res.isSuccess || response.isSuccess ? "Close" : "Edit"}
						onClick={
							res.isSuccess || response.isSuccess ? handleClose : handleEdit
						}
					/>
				</DialogFooter>
			</Dialog>
		</Overlay>
	) : null
}

export default EditUserSlider
