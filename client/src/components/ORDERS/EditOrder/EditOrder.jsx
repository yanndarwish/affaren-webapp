import { useEffect } from "react"
import { useState } from "react"
import {
	Column,
	Container,
	FixedSpaceHeader,
	FullCenter,
	HorizontalCenter,
	SearchSection,
	SpaceHeader,
	SubTitle,
	Title,
} from "../../../assets/common/common.styles"
import Button from "../../common/Button/Button.component"
import Input from "../../common/Input/Input.component"
import { useUpdateOrderMutation } from "../../../redux/services/orderApi"
import { FormControlLabel, Radio, RadioGroup } from "@mui/material"
import InfoMessage from "../../common/InfoMessage/InfoMessage"

const EditOrder = ({ theme, order, setIsEdit }) => {
	const [title, setTitle] = useState(order.order_title)
	const [inputList, setInputList] = useState([])
	let description = order.order_description
	const [dueDate, setDueDate] = useState(order.order_due_date)
	const [dueTime, setDueTime] = useState(order.order_due_time)
	const [clientName, setClientName] = useState(order.order_client_name)
	const [clientPhone, setClientPhone] = useState(order.order_client_phone)
	const [orderLocation, setOrderLocation] = useState(order.order_location)

	const [updateOrder, res] = useUpdateOrderMutation()

	const handleEdit = () => {
		const items = document.querySelectorAll(".order-items")

		let newDescription = []
		// check if item input is empty, keep the original item description[i]
		items.forEach((item, i) => {
			let value = item.querySelector("textarea").value
			if (!value) {
				newDescription.push(description[i])
			} else {
				newDescription.push(value)
			}
		})

		const newOrder = {
			title: title,
			description: newDescription,
			dueDate: dueDate,
			dueTime: dueTime,
			status: 'todo',
			clientName: clientName,
			clientPhone: clientPhone,
			orderLocation: orderLocation,
		}
		updateOrder({ id: order.order_id, payload: newOrder })
		setIsEdit(false)
	}

	const cancelEdit = () => {
		setIsEdit(false)
	}

	const handleRadio = (e) => {
		setOrderLocation(e.target.value)
	}

	const ItemInput = ({ id, placeholder }) => {
		return (
			<Input
				className="order-items"
				multiline
				fullWidth
				placeholder={placeholder}
			/>
		)
	}

	const handleAddItemInput = () => {
		setInputList(inputList.concat(<ItemInput key={inputList.length} />))
	}

	const populateInputList = () => {
		setInputList([])
		description &&
			description.forEach((item, i) => {
				setInputList((current) => [
					...current,
					<ItemInput key={i} placeholder={item} />,
				])
			})
	}

	const handleRemoveItemInput = () => {
		setInputList(inputList.slice(0, -1))
	}

	useEffect(() => {
		populateInputList()
	}, [])

	return (
		<Container theme={theme}>
			{res.isError ? (
				<InfoMessage state="error" text="Failed to edit order" />
			) : (
				<>
					<FixedSpaceHeader>
						<Title>Edit Order</Title>
						<Button title="Cancel" color="warning" onClick={cancelEdit} />
					</FixedSpaceHeader>
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
							<Column>{inputList}</Column>
							<FullCenter>
								<Button title="Add Item" onClick={handleAddItemInput} />
								<Button title="Remove Item" onClick={handleRemoveItemInput} />
							</FullCenter>
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
						<Column>
							<SubTitle>Where</SubTitle>
							<SearchSection>
								<RadioGroup
									row
									aria-labelledby="demo-radio-buttons-group-label"
									value={orderLocation}
									name="radio-buttons-group"
									onChange={handleRadio}
								>
									<FormControlLabel
										value="pick-up"
										control={<Radio />}
										label="Pick Up"
									/>
									<FormControlLabel
										value="to-deliver"
										control={<Radio />}
										label="To Deliver"
									/>
									<FormControlLabel
										value="on-site"
										control={<Radio />}
										label="On Site"
									/>
								</RadioGroup>
							</SearchSection>
						</Column>
					</Column>
					<HorizontalCenter>
						<Button title="Edit Order" color="success" onClick={handleEdit} />
					</HorizontalCenter>
				</>
			)}
		</Container>
	)
}

export default EditOrder
