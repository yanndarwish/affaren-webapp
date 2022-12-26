import AddProductCard from "../AddProductCard/AddProductCard"
import ProductCard from "../ProductCard/ProductCard"
import { StyledProductCardSection } from "./ProductCardSection.styles"
import { updateCards } from "../../../redux/features/cards"
import { useSelector, useDispatch } from "react-redux"

const ProductCardSection = ({ theme, onClick }) => {
	const cards = useSelector((state) => state.cards.cards)
	const dispatch = useDispatch()

	const filterOut = (id) => {
		const filter = cards.filter((card) => card.card_id !== parseInt(id))
		dispatch(updateCards({ cards: filter }))
	}
	return (
		<StyledProductCardSection theme={theme} id="card-section">
			{/* dynamically create boxes based on cards */}
			{cards &&
				cards.map((card) => (
					<ProductCard
						key={card.card_id}
						theme={theme}
						id={card.card_id}
						name={card.card_name}
						price={card.card_price}
						taxe={card.card_taxe}
						onDelete={filterOut}
					/>
				))}
			<AddProductCard onClick={onClick} />
		</StyledProductCardSection>
	)
}

export default ProductCardSection
