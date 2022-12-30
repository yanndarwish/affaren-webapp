import {
	ArtTitle,
	ButtonSection,
	CenterContainer,
	Column,
	Container,
	SpaceHeader,
	SubTitle,
	Title,
	VerticalCenter,
} from "../../../assets/styles/common.styles"
import Button from "../../common/Button/Button.component"
import LocalPhoneIcon from "@mui/icons-material/LocalPhone"
import EditIcon from "@mui/icons-material/Edit"
import SendIcon from "@mui/icons-material/Send"
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined"
import { Modal } from "modal-rjs"
import { useState } from "react"
import { useDeleteOrderMutation } from "../../../redux/services/orderApi"
import EditOrder from "./EditOrder"
import OrderStatusMenu from "./OrderStatusMenu"

const OrderContent = ({ order, theme, setSelected, isEdit, setIsEdit }) => {
	const [isOpen, setIsOpen] = useState(false)
	const [deleteOrder] = useDeleteOrderMutation()

	const handleEdit = () => {
		setIsEdit(true)
	}

	const openDeleteModal = () => {
		setIsOpen(true)
	}

	const ModalBody = () => {
		return <ArtTitle>Are you sure you want to delete this order ?</ArtTitle>
	}

	const ModalFooter = () => {
		const handleDelete = () => {
			deleteOrder({ id: order.order_id })
			setIsOpen(false)
			setSelected("")
		}
		return (
			<SpaceHeader>
				<Button title="Delete order" color="success" onClick={handleDelete} />
			</SpaceHeader>
		)
	}
	return order ? (
		isEdit ? (
			<EditOrder theme={theme} order={order} setIsEdit={setIsEdit} />
		) : (
			<Container theme={theme}>
				<SpaceHeader>
					<Title>{order.order_title}</Title>
					<ButtonSection>
						<Button title={<EditIcon />} color="warning" onClick={handleEdit} />
						<Button
							title={<DeleteOutlinedIcon />}
							color="error"
							onClick={openDeleteModal}
						/>
						<OrderStatusMenu order={order} />
					</ButtonSection>
				</SpaceHeader>
				<Column>
					<SubTitle>
						{order.order_due_date}
						{order.order_due_time && " at " + order.order_due_time}
					</SubTitle>
					<SubTitle>{order.order_location}</SubTitle>
				</Column>
				<VerticalCenter>
					<ArtTitle>{order.order_client_name}</ArtTitle>
					<LocalPhoneIcon />
					<ArtTitle>{" " + order.order_client_phone}</ArtTitle>
				</VerticalCenter>
				<ul>
					{order.order_description &&
						order.order_description.map((item, i) => <li key={i}>{item}</li>)}
				</ul>
				<Modal
					isOpen={isOpen}
					setIsOpen={setIsOpen}
					title={"Delete " + order.order_title}
					bodyContent={<ModalBody />}
					footerContent={<ModalFooter />}
				/>
			</Container>
		)
	) : (
		<CenterContainer theme={theme}>
			<Title>Select an order to start</Title>
		</CenterContainer>
	)
}

export default OrderContent
