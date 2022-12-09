import styled from "styled-components"
import dark from "../../../assets/styles/dark.theme.styles"
import { constant } from "../../../assets/styles/common.styles"

export const StyledProductCard = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	flex-shrink:0;
	padding: ${constant.PADDING_M}px;
	width: 100px;
	height: 100px;
	background-color: ${(props) =>
		props.theme === "dark" ? dark.COLOR_BG_TERTIARY : dark.COLOR_BG_TERTIARY};
`
