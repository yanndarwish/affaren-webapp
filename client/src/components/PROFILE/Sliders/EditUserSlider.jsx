import React, { useRef, useState } from "react"
import {
	ArtTitle,
	Column,
	ColumnCenter,
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
import { Checkbox, FormControl, FormControlLabel, InputLabel, MenuItem, Select } from "@mui/material"
import { FormWrapper } from "../../POS/Sliders/NoBarcodeSlider/NoBarcodeSlider.styles"
import Button from "../../common/Button/Button.component"
import { useSelector } from "react-redux"
import {
	useDeleteUserMutation,
	usePatchUserMutation,
} from "../../../redux/services/userApi"
import { Modal } from "modal-rjs"

const EditUserSlider = ({ isOpen, setIsOpen, user }) => {
	const theme = useSelector((state) => state.theme.theme)
	const [isModalEdit, setIsModalEdit] = useState(false)
	const [isModalDelete, setIsModalDelete] = useState(false)
	const [role, setRole] = useState("")
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

	const toggleModalEdit = () => {
		setIsModalEdit(true)
	}

	const toggleModalDelete = () => {
		setIsModalDelete(true)
	}

	const EditBody = () => {
		return (
			<ArtTitle>Are you sure you want to apply this modification ?</ArtTitle>
		)
	}

	const DeleteBody = () => {
		return <ArtTitle>Are you sure you want to delete this user ?</ArtTitle>
	}

	const EditFooter = () => {
		return <Button title="Edit" color="success" onClick={handleEdit} />
	}
	const DeleteFooter = () => {
		return <Button title="Delete" color="success" onClick={handleDelete} />
	}

	const handleDelete = () => {
		deleteUser({ id: user.user_id })
		setIsModalDelete(false)
	}

	const handleClose = () => {
		setIsOpen(false)
	}

	const handleEdit = () => {
		let newUser = {
			role: role,
			isAdmin: isAdmin ? "true" : "false",
			id: user.user_id,
		}
		patchUser(newUser)
		setIsModalEdit(false)
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
						<Button
							title="Delete User"
							color="error"
							onClick={toggleModalDelete}
						/>
					</SpaceHeader>
					<DialogCard theme={theme}>
						{res.isSuccess || response.isSuccess ? (
							<FullCenter>
								<SubTitle>
									User {res.isSuccess ? "Edited" : "Deleted"} Successfully
								</SubTitle>
							</FullCenter>
						) : (
							<FormControl fullWidth sx={{ height: "100%" , padding:"1.5rem"}}>
								<FormWrapper>
									<ColumnCenter>
										<ArtTitle>Status</ArtTitle>
										<FormControlLabel
											value="start"
											control={
												<Checkbox
													checked={isAdmin}
													onChange={() => setIsAdmin(!isAdmin)}
												/>
											}
											label={user.user_first_name + " has Admin rights"}
											labelPlacement="end"
										/>
										<ArtTitle>Role</ArtTitle>
										<FormControl fullWidth>
											<InputLabel id="demo-simple-select-label">
												Role
											</InputLabel>
											<Select
												labelId="demo-simple-select-label"
												id="demo-simple-select"
												value={role}
												label="Role"
												onChange={(e) => setRole(e.target.value)}
											>
												<MenuItem value="user">User</MenuItem>
												<MenuItem value="cook">Cook</MenuItem>
											</Select>
										</FormControl>
										{res.isError && <ArtTitle>{res.error.data}</ArtTitle>}
									</ColumnCenter>
								</FormWrapper>
							</FormControl>
						)}
					</DialogCard>
				</DialogBody>
				<DialogFooter>
					<Button
						title={res.isSuccess || response.isSuccess ? "Close" : "Edit"}
						onClick={
							res.isSuccess || response.isSuccess
								? handleClose
								: toggleModalEdit
						}
					/>
				</DialogFooter>
			</Dialog>
			<Modal
				isOpen={isModalEdit}
				setIsOpen={setIsModalEdit}
				title="Edit User"
				bodyContent={<EditBody />}
				footerContent={<EditFooter />}
			/>
			<Modal
				isOpen={isModalDelete}
				setIsOpen={setIsModalDelete}
				title="Delete User"
				bodyContent={<DeleteBody />}
				footerContent={<DeleteFooter />}
			/>
		</Overlay>
	) : null
}

export default EditUserSlider
