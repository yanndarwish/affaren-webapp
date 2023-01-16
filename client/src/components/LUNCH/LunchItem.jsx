import React from "react"
import { Flex, SubTitle } from "../../assets/common/common.styles"

const LunchItem = ({ data }) => {
	return (
		<Flex>
			<SubTitle>
				{data.dish_quantity} {data.dish_name}
			</SubTitle>
		</Flex>
	)
}

export default LunchItem
