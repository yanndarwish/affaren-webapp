import { useContext, useState } from "react"
import {
	Column,
	Container,
	HorizontalCenter,
	SearchSection,
	SubTitle,
	Title,
} from "../../../assets/common/common.styles"
import Button from "../../common/Button/Button.component"
import Input from "../../common/Input/Input.component"
import { usePostOrderMutation } from "../../../redux/services/orderApi"
import { FormControlLabel, Radio, RadioGroup } from "@mui/material"
import InfoMessage from "../../common/InfoMessage/InfoMessage"
import { WebSocketContext } from "../../../utils/context/webSocket"

const AddOrder = ({ theme, setAdd, setNewOrder }) => {
	const ws = useContext(WebSocketContext)
	const [title, setTitle] = useState("")
	const [inputList, setInputList] = useState([])
	const [dueDate, setDueDate] = useState("")
	const [dueTime, setDueTime] = useState("")
	const [clientName, setClientName] = useState("")
	const [clientPhone, setClientPhone] = useState("")
	const [orderLocation, setOrderLocation] = useState("pick-up")
	const [titleError, setTitleError] = useState(false)
	const [dateError, setDateError] = useState(false)
	const [phoneError, setPhoneError] = useState(false)
	const [nameError, setNameError] = useState(false)
	const [postOrder, res] = usePostOrderMutation()

	const handleCreate = () => {
		!title ? setTitleError(true) : setTitleError(false)
		!clientName ? setNameError(true) : setNameError(false)
		!clientPhone ? setPhoneError(true) : setPhoneError(false)
		!dueDate ? setDateError(true) : setDateError(false)

		if ((title, clientName, clientPhone, dueDate)) {
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
				orderLocation: orderLocation,
			}
			setNewOrder(true)
			setAdd(false)
			postOrder(newOrder)
			ws?.sendMessage({
				type: "order",
				action: "add",
				order: newOrder
			})
		}
	}

	const handleRadio = (e) => {
		setOrderLocation(e.target.value)
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
			{res.isError ? (
				<InfoMessage state="error" text="Failed to create order" />
			) : (
				<>
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
									error={nameError}
									helperText={nameError && "Required"}
								/>
								<Input
									value={clientPhone}
									label="Client Phone"
									fullWidth
									onChange={(e) => setClientPhone(e)}
									error={phoneError}
									helperText={phoneError && "Required"}
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
								error={titleError}
								helperText={titleError && "Required"}
							/>
							<Column>
								<Input
									className="order-items"
									label="Item 1"
									multiline
									fullWidth
								/>
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
									error={dateError}
									helperText={dateError && "Required"}
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
						<Button
							title="Create Order"
							color="success"
							onClick={handleCreate}
						/>
					</HorizontalCenter>
				</>
			)}
		</Container>
	)
}

export default AddOrder
