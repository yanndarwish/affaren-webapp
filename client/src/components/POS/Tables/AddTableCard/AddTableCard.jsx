import { StyledTableCard } from "../TableCard.styles"
import AddOutlinedIcon from "@mui/icons-material/AddOutlined"

const AddTableCard = ({ onClick }) => {
	return (
		<StyledTableCard className="product-card" onClick={onClick}>
			<AddOutlinedIcon />
		</StyledTableCard>
	)
}

export default AddTableCard
