import { useState } from "react"
import {
	Column,
	Container,
	HorizontalCenter,
	SearchSection,
	SubTitle,
	Title,
} from "../../../assets/styles/common.styles"
import Button from "../../common/Button/Button.component"
import Input from "../../common/Input/Input.component"
import { usePostOrderMutation } from "../../../redux/services/orderApi"

const AddOrder = ({ theme }) => {
	const [title, setTitle] = useState("")
	const [inputList, setInputList] = useState([])
	const [dueDate, setDueDate] = useState("")
	const [dueTime, setDueTime] = useState("")
	const [clientName, setClientName] = useState("")
	const [clientPhone, setClientPhone] = useState("")
	const [postOrder] = usePostOrderMutation()

	const handleCreate = () => {
		const items = document.querySelectorAll(".order-items")
		let description = []
		items.forEach((item) => {
			let value = item.querySelector("textarea").value
			description.push(value)
		})

		const newOrder = {
			title: title,
			description: description,
			dueDate: dueDate,
			dueTime: dueTime,
			clientName: clientName,
			clientPhone: clientPhone,
		}

		postOrder(newOrder)
	}

	const ItemInput = () => {
		return (
			<Input
				className="order-items"
				label={"item " + parseInt(inputList.length + 2)}
				multiline
				fullWidth
			/>
		)
	}

	const handleAddItemInput = () => {
		setInputList(inputList.concat(<ItemInput key={inputList.length} />))
	}

	return (
		<Container theme={theme}>
			<Title>Create New Order</Title>
			<Column>
				<Column>
					<SubTitle>Who</SubTitle>
					<SearchSection>
						<Input
							value={clientName}
							label="Client Name"
							fullWidth
							onChange={(e) => setClientName(e)}
						/>
						<Input
							value={clientPhone}
							label="Client Phone"
							fullWidth
							onChange={(e) => setClientPhone(e)}
						/>
					</SearchSection>
				</Column>
				<Column>
					<SubTitle>What</SubTitle>
					<Input
						value={title}
						label="Title"
						fullWidth
						onChange={(e) => setTitle(e)}
					/>
					<Column>
						<Input className="order-items" label="Item 1" multiline fullWidth />
						{inputList}
					</Column>
					<HorizontalCenter>
						<Button title="Add Item" onClick={handleAddItemInput} />
					</HorizontalCenter>
				</Column>
				<Column>
					<SubTitle>When</SubTitle>
					<SearchSection>
						<Input
							value={dueDate}
							type="date"
							fullWidth
							onChange={(e) => setDueDate(e)}
						/>
						<Input
							value={dueTime}
							type="time"
							fullWidth
							onChange={(e) => setDueTime(e)}
						/>
					</SearchSection>
				</Column>
			</Column>
			<HorizontalCenter>
				<Button title="Create Order" color="success" onClick={handleCreate} />
			</HorizontalCenter>
		</Container>
	)
}

export default AddOrder
