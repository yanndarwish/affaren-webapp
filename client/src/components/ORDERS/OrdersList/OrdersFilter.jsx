import { ListItem, Chip } from "@mui/material"
import { VerticalCenter } from "../../../assets/styles/common.styles"

const OrdersFilter = ({ selected, setSelected, setAdd }) => {
	const handleClick = () => {
		setSelected("filter")
		setAdd(false)
	}

	const handleFilter = (e) => {
		const targetFilter = e.target.dataset.filter
			? e.target.dataset.filter
			: e.target.parentNode.dataset.filter
		console.log(targetFilter)
	}
	return (
		<ListItem
			selected={selected === "filter"}
			alignItems="center"
			sx={{ justifyContent: "center", paddingBlock: 2.5 }}
			onClick={handleClick}
		>
			<VerticalCenter>
				<Chip
					variant="outlined"
					label="On site"
					onClick={handleFilter}
					data-filter="on-site"
				/>
				<Chip
					variant="outlined"
					label="Pick up"
					onClick={handleFilter}
					data-filter="pick-up"
				/>
				<Chip
					variant="outlined"
					label="To deliver"
					onClick={handleFilter}
					data-filter="to-deliver"
				/>
			</VerticalCenter>
		</ListItem>
	)
}

export default OrdersFilter
