import {
	ArtTitle,
	CenterContainer,
	Container,
	SearchSection,
	SpaceHeader,
	SubTitle,
	Title,
	VerticalCenter,
} from "../../../assets/styles/common.styles"
import Button from "../../common/Button/Button.component"
import LocalPhoneIcon from "@mui/icons-material/LocalPhone"
import EditIcon from "@mui/icons-material/Edit"
import SendIcon from "@mui/icons-material/Send"

const OrderContent = ({ order, theme }) => {
	const handleEdit = () => {
		console.log("edit")
	}

	const handleSend = () => {
		console.log("send")
	}

	return order ? (
		<Container theme={theme}>
			<SpaceHeader>
				<Title>{order.order_title}</Title>
				<SearchSection>
					<Button title={<EditIcon />} onClick={handleEdit}/>
					<Button title={<SendIcon />} onClick={handleSend}/>
				</SearchSection>
			</SpaceHeader>
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
