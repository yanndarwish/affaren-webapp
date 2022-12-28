import {
	ArtTitle,
	ButtonSection,
	CenterContainer,
	Container,
	SpaceHeaderCenter,
	SubTitle,
	Title,
	VerticalCenter,
} from "../../../assets/styles/common.styles"
import Button from "../../common/Button/Button.component"
import LocalPhoneIcon from "@mui/icons-material/LocalPhone"
import EditIcon from "@mui/icons-material/Edit"
import SendIcon from "@mui/icons-material/Send"
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined"

const OrderContent = ({ order, theme }) => {
	const handleEdit = () => {
		console.log("edit")
	}

	const handleSend = () => {
		console.log("send")
	}

    const handleDelete = () => {
        console.log("delete")
    }

	return order ? (
		<Container theme={theme}>
			<SpaceHeaderCenter>
				<Title>{order.order_title}</Title>
				<ButtonSection>
					<Button title={<EditIcon />} color="warning" onClick={handleEdit} />
					<Button title={<SendIcon />} onClick={handleSend} />
					<Button
						title={<DeleteOutlinedIcon />}
						color="error"
						onClick={handleDelete}
					/>
				</ButtonSection>
			</SpaceHeaderCenter>
			<SubTitle>
				{order.order_due_date}
				{order.order_due_time && " at " + order.order_due_time}
			</SubTitle>
			<VerticalCenter>
				<ArtTitle>{order.order_client_name}</ArtTitle>
				<LocalPhoneIcon />
				<ArtTitle>{" " + order.order_client_phone}</ArtTitle>
			</VerticalCenter>
			<ul>
				{order.order_description &&
					order.order_description.map((item, i) => <li key={i}>{item}</li>)}
			</ul>
		</Container>
	) : (
		<CenterContainer theme={theme}>
			<Title>Select an order to start</Title>
		</CenterContainer>
	)
}

export default OrderContent
