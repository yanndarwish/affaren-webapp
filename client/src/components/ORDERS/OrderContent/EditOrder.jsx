import { useEffect } from "react"
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
import NewInput from "../../common/Input2/Input.component"

const EditOrder = ({ theme, order }) => {
	const [title, setTitle] = useState(order.order_title)
	const [inputList, setInputList] = useState([])
	let description = order.order_description
	const [dueDate, setDueDate] = useState(order.order_due_date)
	const [dueTime, setDueTime] = useState(order.order_due_time)
	const [clientName, setClientName] = useState(order.order_client_name)
	const [clientPhone, setClientPhone] = useState(order.order_client_phone)

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
		console.log(newOrder)
	}

	const handleChange = (e) => {
        console.log(e.target.value)
		let id = e.target.id
        let copyArray = [...description]
        copyArray[id] = e.target.value
        console.log(copyArray)
        description = copyArray
        e.target.value = description[id]

	}

	const ItemInput = ({ value, id }) => {
		return (
			<NewInput
            id={id && id}
				value={value && value}
				className="order-items"
				label="item "
				multiline
				fullWidth
				onChange={value && handleChange}
			/>
		)
	}

	const handleAddItemInput = () => {
		setInputList(inputList.concat(<ItemInput key={inputList.length} />))
	}
    
	console.log(inputList)

	// const populateInputList = () => {
	// 	setInputList([])
	// 	description &&
	// 		description.forEach((item, i) => {
	// 			setInputList((current) => [
	// 				...current,
	// 				<ItemInput key={i} value={item} id={i.toString()}/>,
	// 			])
	// 		})
	// }

	const handleRemoveItemInput = () => {
		setInputList(inputList.slice(0, -1))
	}

	// useEffect(() => {
	// 	populateInputList()
	// }, [])

	return (
		<Container theme={theme}>
			<Title>Edit Order</Title>
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
						{description &&
							description.map((item, i) => (
								<ItemInput key={i} value={description[i]} id={i.toString()} />
							))}
					</Column>
					<HorizontalCenter>
						<Button title="Add Item" onClick={handleAddItemInput} />
						<Button title="Remove Item" onClick={handleRemoveItemInput} />
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

export default EditOrder
