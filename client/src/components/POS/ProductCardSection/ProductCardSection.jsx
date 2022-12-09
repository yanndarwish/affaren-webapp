import AddProductCard from "../AddProductCard/AddProductCard"
import ProductCard from "../ProductCard/ProductCard"
import { StyledProductCardSection } from "./ProductCardSection.styles"

const ProductCardSection = ({ theme, onClick }) => {
	
	return (
		<StyledProductCardSection theme={theme} id="card-section">
			{/* dynamically create boxes based on cards */}
			<ProductCard theme={theme} />
			<ProductCard theme={theme} />
			<ProductCard theme={theme} />
			<AddProductCard onClick={onClick}/>
		</StyledProductCardSection>
	)
}

export default ProductCardSection
