import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined"
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline"
import { IconButton, Tab, Tabs } from "@mui/material"
import AddIcon from "@mui/icons-material/Add"
import { Box } from "@mui/system"
import {
	Column,
	SpaceHeaderCenter,
} from "../../../../assets/common/common.styles"

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

const TableProducts = ({ table, value, peopleSet, handleChange, handleDelete, handleAddPerson }) => {

	return (
		<Box
			sx={{
				flexGrow: 1,
				bgcolor: "background.paper",
				display: "flex",
				height: 300,
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
									<h3>{item.dish_name}</h3>
									<h3>{item.dish_price} €</h3>
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
								</SpaceHeaderCenter>
							))}
					</Column>
				</TabPanel>
			))}
		</Box>
	)
}

export default TableProducts
