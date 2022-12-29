import {
	ListItem,
	RadioGroup,
	FormControlLabel,
	Radio,
	Divider,
} from "@mui/material"
import { VerticalCenter } from "../../../assets/styles/common.styles"
import {
	setStatusFilter,
	setLocationFilter,
} from "../../../redux/features/orders"
import { useDispatch, useSelector } from "react-redux"
import { Fragment } from "react"

const OrdersFilter = ({ selected, setSelected, setAdd }) => {
	const statusFilter = useSelector((state) => state.orders.statusFilter)
	const locationFilter = useSelector((state) => state.orders.locationFilter)
	const dispatch = useDispatch()
	const handleClick = (target) => {
		setSelected(target)
		setAdd(false)
	}

	const handleStatusFilter = (e) => {
		dispatch(setStatusFilter(e.target.value))
	}

	const handleLocationFilter = (e) => {
		dispatch(setLocationFilter(e.target.value))
	}
	return (
		<Fragment>
			<ListItem
				selected={selected === "statusFilter"}
				alignItems="center"
				sx={{ justifyContent: "center", paddingBlock: 2.5 }}
				onClick={() => handleClick("statusFilter")}
			>
				<VerticalCenter>
					<RadioGroup
						row
						aria-labelledby="demo-radio-buttons-group-label"
						value={statusFilter}
						name="status-group"
						onChange={handleStatusFilter}
					>
						<FormControlLabel value="all" control={<Radio />} label="All" />
						<FormControlLabel value="todo" control={<Radio />} label="To Do" />
						<FormControlLabel
							value="pending"
							control={<Radio />}
							label="Pending"
						/>
						<FormControlLabel value="done" control={<Radio />} label="Done" />
						<FormControlLabel
							value="picked-up"
							control={<Radio />}
							label="Picked Up"
						/>
					</RadioGroup>
				</VerticalCenter>
			</ListItem>
			<Divider component="li" />
			<ListItem
				selected={selected === "locationFilter"}
				alignItems="center"
				sx={{ justifyContent: "center", paddingBlock: 2.5 }}
				onClick={() => handleClick("locationFilter")}
			>
				<VerticalCenter>
					<RadioGroup
						row
						aria-labelledby="radio-buttons-group-label"
						value={locationFilter}
						name="location-group"
						onChange={handleLocationFilter}
					>
						<FormControlLabel value="all" control={<Radio />} label="All" />
						<FormControlLabel
							value="pick-up"
							control={<Radio />}
							label="Pick Up"
						/>
						<FormControlLabel
							value="on-site"
							control={<Radio />}
							label="On Site"
						/>
						<FormControlLabel
							value="to-deliver"
							control={<Radio />}
							label="To Deliver"
						/>
					</RadioGroup>
				</VerticalCenter>
			</ListItem>
		</Fragment>
	)
}

export default OrdersFilter
