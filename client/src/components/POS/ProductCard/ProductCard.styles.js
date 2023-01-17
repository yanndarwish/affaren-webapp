import styled from "styled-components"
import dark from "../../../assets/common/dark.theme.styles"
import { constant } from "../../../assets/common/common.styles"
import light from "../../../assets/common/light.theme.styles"

export const StyledProductCard = styled.div`
	position: relative;
	display: flex;
	justify-content: center;
	align-items: center;
	flex-shrink: 0;
	padding: ${constant.PADDING_M}px;
	width: 100px;
	height: 100px;
	border-radius: ${constant.BORDER_RADIUS_M}px;
	box-shadow: 3px 3px 5px rgb(0, 0, 0, 0.3);
	color: ${(props) =>
		props.theme === "dark" ? light.COLOR_TEXT : dark.COLOR_TEXT};
	background-color: ${(props) =>
		props.theme === "dark" ? "#90CAF9" : "#1876D2"};
`

export const CardTitle = styled.p`
	text-align: center;
`

export const Trash = styled.div`
	position: absolute;
	display: flex;
	justify-content: center;
	align-items: center;
	padding: ${constant.PADDING_XS}px;
	color: ${dark.COLOR_TEXT};
	background: ${constant.CLR_DANGER};
	border-radius: 50%;
	top: -${constant.PADDING_XS}px;
	right: -${constant.PADDING_XS}px;
`
