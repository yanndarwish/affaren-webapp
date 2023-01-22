import {
	ArtTitle,
	Column,
	Container,
	FixedCenterContainter,
	OrderTitle,
	SpaceHeader,
	SubTitle,
	Title,
	VerticalCenter,
	WrapS,
} from "../../../assets/common/common.styles"
import Button from "../../common/Button/Button.component"
import LocalPhoneIcon from "@mui/icons-material/LocalPhone"
import EditIcon from "@mui/icons-material/Edit"
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined"
import PrintOutlinedIcon from "@mui/icons-material/PrintOutlined"
import { Modal } from "modal-rjs"
import { useState } from "react"
import { useDeleteOrderMutation } from "../../../redux/services/orderApi"
import EditOrder from "../EditOrder/EditOrder"
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

	function printDiv() {
		let title = document.getElementById("order-title").innerHTML
		let time = document.getElementById("order-time").innerHTML
		let location = document.getElementById("order-location").innerHTML
		let clientName = document.getElementById("order-client-name").innerHTML
		let clientPhone = document.getElementById("order-client-phone").innerHTML
		let orderItems = document.getElementById("order-items").innerHTML
		let a = window.open("", "", "height=800, width=800")
		a.document.write("<html>")
		a.document.write("<body>")
		a.document.write("<h1>")
		a.document.write(title)
		a.document.write("</h1>")
		a.document.write("<h1>")
		a.document.write(time)
		a.document.write("</h1>")
		a.document.write("<h2>")
		a.document.write(location)
		a.document.write("</h2>")
		a.document.write("<h2>")
		a.document.write(clientName)
		a.document.write("</h2>")
		a.document.write("<h2>")
		a.document.write(clientPhone)
		a.document.write("</h2>")
		a.document.write("<h2>")
		a.document.write(orderItems)
		a.document.write("</h2>")

		a.document.write("</body></html>")
		a.document.close()
		a.print()
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
			<Container theme={theme} id="order-content">
				<OrderTitle>
					<Title id="order-title">{order.order_title}</Title>
					<WrapS>
						<Button title={<EditIcon />} color="warning" onClick={handleEdit} />
						<Button
							title={<DeleteOutlinedIcon />}
							color="error"
							onClick={openDeleteModal}
						/>
						<Button title={<PrintOutlinedIcon />} onClick={printDiv} />
						<OrderStatusMenu order={order} />
					</WrapS>
				</OrderTitle>
				<Column>
					<SubTitle id="order-time">
						{order.order_due_date}
						{order.order_due_time && " at " + order.order_due_time}
					</SubTitle>
					<SubTitle id="order-location">{order.order_location}</SubTitle>
				</Column>
				<VerticalCenter>
					<ArtTitle id="order-client-name">{order.order_client_name}</ArtTitle>
					<LocalPhoneIcon />
					<ArtTitle id="order-client-phone">
						{" " + order.order_client_phone}
					</ArtTitle>
				</VerticalCenter>
				<ul id="order-items">
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
		<FixedCenterContainter theme={theme}>
			<Title>Select an order to start</Title>
		</FixedCenterContainter>
	)
}

export default OrderContent
