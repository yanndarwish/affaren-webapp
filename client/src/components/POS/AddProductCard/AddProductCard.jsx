import { StyledProductCard } from "../ProductCard/ProductCard.styles"
import AddOutlinedIcon from "@mui/icons-material/AddOutlined"

const AddProductCard = ({onClick}) => {
  return (
    <StyledProductCard className="product-card" onClick={onClick}>
        <AddOutlinedIcon />
    </StyledProductCard>
  )
}

export default AddProductCard
