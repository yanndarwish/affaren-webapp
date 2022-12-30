import { ListItem } from "@mui/material"
import AddIcon from "@mui/icons-material/Add"

const OrdersAddButton = ({selected, setSelected, setAdd}) => {
    const handleClick = () => {
			setAdd(true)
			setSelected("add")
		}
  return (
		<ListItem
			selected={selected === "add"}
			alignItems="center"
			sx={{ justifyContent: "center", paddingBlock: 2.5 }}
			onClick={handleClick}
		>
			<AddIcon />
		</ListItem>
	)
}

export default OrdersAddButton