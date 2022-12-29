import { ListSubheader } from "@mui/material"
import AddIcon from "@mui/icons-material/Add"

const OrdersAddButton = ({selected, setSelected, setAdd}) => {
    const handleClick = () => {
			setAdd(true)
			setSelected("add")
		}
  return (
		<ListSubheader
			selected={selected === "add"}
			alignItems="center"
			sx={{ justifyContent: "center", paddingBlock: 1 }}
			onClick={handleClick}
		>
			<AddIcon />
		</ListSubheader>
	)
}

export default OrdersAddButton
