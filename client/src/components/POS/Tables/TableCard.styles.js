import styled from "styled-components"
import dark from "../../../assets/styles/dark.theme.styles"
import { constant } from "../../../assets/styles/common.styles"
import light from "../../../assets/styles/light.theme.styles"

export const StyledTableCard = styled.div`
position:relative;
	display: flex;
	justify-content: center;
	align-items: center;
	flex-shrink: 0;
	padding: ${constant.PADDING_M}px;
	width: 100px;
	height: 100px;
	color: ${(props) =>
		props.theme === "dark" ? dark.COLOR_TEXT : light.COLOR_TEXT};
	background-color: ${(props) =>
		props.theme === "dark" ? dark.COLOR_BG_TERTIARY : dark.COLOR_BG_TERTIARY};
`

export const CardTitle = styled.p`
	text-align: center;
`

export const Trash = styled.div`
	position:absolute;
	top:0;
	right:0;
`