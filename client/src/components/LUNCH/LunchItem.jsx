import React from "react"
import { Flex, SubTitle } from "../../assets/styles/common.styles"

const LunchItem = ({ data }) => {
	return (
	<Flex >
		<SubTitle>
			{data.dish_quantity} {data.dish_name}
		</SubTitle>
	</Flex>)
}

export default LunchItem
