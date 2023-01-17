import { StyledProductCard } from "../ProductCard/ProductCard.styles"
import AddOutlinedIcon from "@mui/icons-material/AddOutlined"

const AddProductCard = ({onClick, theme}) => {
  return (
		<StyledProductCard className="product-card" onClick={onClick} theme={theme}>
			<AddOutlinedIcon />
		</StyledProductCard>
	)
}

export default AddProductCard
