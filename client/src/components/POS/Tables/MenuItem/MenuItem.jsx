import { Column, Flex, VerticalCenter } from "../../../../assets/styles/common.styles"
import { Name, Price, Wrapper } from "./MenuItem.styles"

const MenuItem = ({ data, color, onClick }) => {
	return (
		<Wrapper color={color} onClick={onClick} data-id={data.dish_id}>
			<Column data-id={data.dish_id}>
				<Flex data-id={data.dish_id}>
					<Name data-id={data.dish_id}>{data.dish_name}</Name>
				</Flex>
				<Flex data-id={data.dish_id}>
					{data.dish_ingredients.map((ing, i) => (
						<span key={ing + i} data-id={data.dish_id}>
							{i === 0 ? ing : ", " + ing}
						</span>
					))}
				</Flex>
			</Column>
			<VerticalCenter data-id={data.dish_id}>
				<Flex data-id={data.dish_id}>
					<Price data-id={data.dish_id}>{data.dish_price.toFixed(2)}</Price>
					<h3 data-id={data.dish_id}>€</h3>
				</Flex>
			</VerticalCenter>
		</Wrapper>
	)
}

export default MenuItem
