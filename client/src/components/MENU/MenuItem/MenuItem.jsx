import { Column, Flex, Gap, VerticalCenter } from "../../../assets/styles/common.styles"
import { Name, Price, Wrapper } from "./MenuItem.styles"
import { Icon, IconButton } from "@mui/material"

import EditOutlinedIcon from "@mui/icons-material/EditOutlined"
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined"

const MenuItem = ({ data, color, disabled, openEdit, openDelete  }) => {


	return (
		<Wrapper color={color} disabled={disabled}>
			<Column>
				<Flex>
					<Name>{data.dish_name}</Name>
				</Flex>
				<Flex>
					{data.dish_ingredients.map((ing, i) => (
						<span key={ing + i}>{i === 0 ? ing : ", " + ing}</span>
					))}
				</Flex>
			</Column>
			<VerticalCenter>
				<Flex>
					<Price>{data.dish_price.toFixed(2)}</Price>
					<h3>€</h3>
				</Flex>

				<IconButton data-id={data.dish_id}  onClick={openEdit}>
					<EditOutlinedIcon color="primary" data-id={data.dish_id} />
				</IconButton>
				<IconButton data-id={data.dish_id} onClick={openDelete}>
					<DeleteOutlineOutlinedIcon color="error" data-id={data.dish_id} />
				</IconButton>
			</VerticalCenter>
		</Wrapper>
	)
}

export default MenuItem
