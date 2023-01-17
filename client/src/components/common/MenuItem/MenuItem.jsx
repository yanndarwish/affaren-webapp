import {
	Column,
	Flex,
	VerticalCenter,
} from "../../../assets/common/common.styles"
import { Name, Price, Wrapper } from "./MenuItem.styles"
import { IconButton } from "@mui/material"

import EditOutlinedIcon from "@mui/icons-material/EditOutlined"
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined"

const MenuItem = ({ data, color, disabled, openEdit, openDelete, onClick }) => {
	return (
		<Wrapper
			color={color}
			disabled={disabled}
			onClick={onClick && onClick}
			data-id={data.dish_id}
		>
			<Column data-id={data.dish_id}>
				<Flex data-id={data.dish_id}>
					<Name data-id={data.dish_id}>{data.dish_name}</Name>
				</Flex>
				<Flex data-id={data.dish_id}>
					{data.dish_ingredients.map((ing, i) => (
						<span key={ing + i}>{i === 0 ? ing : ", " + ing}</span>
					))}
				</Flex>
			</Column>
			<VerticalCenter data-id={data.dish_id}>
				<Flex data-id={data.dish_id}>
					<Price data-id={data.dish_id}>{data.dish_price.toFixed(2)}</Price>
					<h3 data-id={data.dish_id}>€</h3>
				</Flex>

				{openEdit && (
					<IconButton data-id={data.dish_id} onClick={openEdit}>
						<EditOutlinedIcon color="primary" data-id={data.dish_id} />
					</IconButton>
				)}
				{openDelete && (
					<IconButton data-id={data.dish_id} onClick={openDelete}>
						<DeleteOutlineOutlinedIcon color="error" data-id={data.dish_id} />
					</IconButton>
				)}
			</VerticalCenter>
		</Wrapper>
	)
}

export default MenuItem
