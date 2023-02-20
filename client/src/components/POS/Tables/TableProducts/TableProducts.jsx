import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined"
import AccessTimeOutlinedIcon from "@mui/icons-material/AccessTimeOutlined"
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline"
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline"
import { IconButton, Tab, Tabs } from "@mui/material"
import CheckIcon from "@mui/icons-material/Check"
import AddIcon from "@mui/icons-material/Add"
import { Box } from "@mui/system"
import {
	Column,
	Ellipsis,
	GapS,
	PrimaryText,
	SecondaryText,
	SpaceBetween,
	SpaceHeaderCenter,
	SuccessText,
} from "../../../../assets/common/common.styles"
import { useContext } from "react"
// import { WebSocketContext } from "../../../../utils/context/webSocket"
import { usePatchProductTableStatusMutation } from "../../../../redux/services/tableProductsApi"
import InfoMessage from "../../../common/InfoMessage/InfoMessage"
import Button from "../../../common/Button/Button.component"
import { FormulaButtonWrapper } from "./TableProducts.styles"
import { setLunchUpdate } from "../../../../redux/features/tableProducts"
import { useDispatch } from "react-redux"

function TabPanel(props) {
	const { children, value, index, ...other } = props

	return (
		<div
			role="tabpanel"
			hidden={value !== index}
			id={`simple-tabpanel-${index}`}
			aria-labelledby={`simple-tab-${index}`}
			{...other}
		>
			{value === index && (
				<Box sx={{ p: 3 }}>
					<Box>{children}</Box>
				</Box>
			)}
		</div>
	)
}

function a11yProps(index) {
	return {
		id: `simple-tab-${index}`,
		"aria-controls": `simple-tabpanel-${index}`,
	}
}

const TableProducts = ({
	theme,
	table,
	value,
	peopleSet,
	handleChange,
	handleDelete,
	handleAddPerson,
	applyFormula,
}) => {
	const dispatch = useDispatch()
	// const ws = useContext(WebSocketContext)
	const [updateStatus, res] = usePatchProductTableStatusMutation()

	const handleStatus = (e) => {
		const id = e.target.dataset.id
			? e.target.dataset.id
			: e.target.parentNode.dataset.id
		let person = e.target.dataset.person
			? e.target.dataset.person
			: e.target.parentNode.dataset.person
		person = parseInt(person)

		const target = table.find(
			(item) => item.table_person === person && item.dish_id === id
		)

		const status = target.dish_status
		updateStatus({
			tableId: target.table_id,
			personId: person,
			dishId: id,
			status: status === "todo" ? "waiting" : "todo",
		})

		dispatch(setLunchUpdate())

		// ws?.sendMessage({
		// 	type: "lunch",
		// 	table: target.table_id,
		// 	action: "status",
		// })
	}

	return (
		<Box
			sx={{
				position: "relative",
				flexGrow: 1,
				bgcolor: "background.paper",
				display: "flex",
				height: "100%",
				borderBottom: 1,
				borderColor: "divider",
				overflow: "scroll",
			}}
		>
			<Tabs
				id="tabs"
				orientation="vertical"
				value={value}
				onChange={handleChange}
				variant="scrollable"
				aria-label="basic tabs example"
				sx={{ minWidth: "70px" }}
			>
				{peopleSet?.map((id, i) => (
					<Tab
						label={<PersonOutlineOutlinedIcon />}
						{...a11yProps(i)}
						key={i + "tab"}
					/>
				))}
				<Tab label={<AddIcon />} onClick={handleAddPerson} />
			</Tabs>
			{peopleSet?.map((id, i) => (
				<TabPanel value={value} index={i} key={i + "panel"}>
					<Column>
						{table
							?.filter((product) => product.table_person === parseInt(id))
							.map((item, i) => (
								<SpaceHeaderCenter key={id + "-" + i}>
									{item.dish_status === "waiting" ? (
										<SpaceHeaderCenter>
											<GapS>
												{res.isError && (
													<InfoMessage
														state="error"
														text="Failed to update product status"
													/>
												)}
												<Ellipsis theme={theme} color="secondary">
													{item.dish_name}
												</Ellipsis>
												<SecondaryText theme={theme}>
													{item.dish_price} €
												</SecondaryText>
												<IconButton
													aria-label="waiting"
													color="disabled"
													data-id={item.dish_id}
													data-person={id}
													onClick={handleStatus}
												>
													<AccessTimeOutlinedIcon
														data-id={item.dish_id}
														data-person={id}
													/>
												</IconButton>
												<IconButton
													aria-label="delete"
													color="error"
													data-id={item.dish_id}
													data-person={id}
													onClick={handleDelete}
												>
													<DeleteOutlineIcon
														data-id={item.dish_id}
														data-person={id}
													/>
												</IconButton>
											</GapS>
										</SpaceHeaderCenter>
									) : item.dish_status === "paid" ? (
										<SpaceBetween>
											<GapS>
												{res.isError && (
													<InfoMessage
														state="error"
														text="Failed to update product status"
													/>
												)}
												<Ellipsis theme={theme} color="success">
													{item.dish_name}
												</Ellipsis>
												<SuccessText>paid</SuccessText>
												<CheckIcon
													color="success"
													data-id={item.dish_id}
													data-person={id}
												/>
											</GapS>
										</SpaceBetween>
									) : item.dish_category === "formula" ? (
										<GapS>
											<Ellipsis theme={theme} color="tertiary">
												{item.dish_name}
											</Ellipsis>
											<Ellipsis theme={theme} color="tertiary">
												{item.dish_price} €
											</Ellipsis>
										</GapS>
									) : item.dish_status === "done" ? (
										<GapS>
											<Ellipsis theme={theme} color="tertiary">
												{item.dish_name}
											</Ellipsis>
											<Ellipsis theme={theme} color="tertiary">
												{item.dish_price} €
											</Ellipsis>
											<CheckIcon
												color="primary"
												data-id={item.dish_id}
												data-person={id}
											/>
										</GapS>
									) : (
										<GapS>
											<Ellipsis theme={theme} color="primary">
												{item.dish_name}
											</Ellipsis>
											<PrimaryText theme={theme}>
												{item.dish_price} €
											</PrimaryText>
											<IconButton
												aria-label="active"
												color="success"
												data-id={item.dish_id}
												data-person={id}
												onClick={handleStatus}
											>
												<ErrorOutlineIcon
													data-id={item.dish_id}
													data-person={id}
												/>
											</IconButton>
											<IconButton
												aria-label="delete"
												color="error"
												data-id={item.dish_id}
												data-person={id}
												onClick={handleDelete}
											>
												<DeleteOutlineIcon
													data-id={item.dish_id}
													data-person={id}
												/>
											</IconButton>
										</GapS>
									)}
								</SpaceHeaderCenter>
							))}
						<FormulaButtonWrapper>
							<Button title="Apply Formula" onClick={applyFormula} />
						</FormulaButtonWrapper>
					</Column>
				</TabPanel>
			))}
		</Box>
	)
}

export default TableProducts
