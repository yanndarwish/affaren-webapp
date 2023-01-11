import styled from "styled-components"
import dark from "../../../assets/styles/dark.theme.styles"
import { constant } from "../../../assets/styles/common.styles"
import light from "../../../assets/styles/light.theme.styles"

export const Container = styled.div`
	position: fixed;
	display: flex;
    flex-direction: column;
	padding: ${constant.PADDING_M}px;
	width: 50%;
	height: 100%;
    z-index:100;
    overflow:scroll;
	color: ${(props) =>
		props.theme === "dark" ? dark.COLOR_TEXT : light.COLOR_TEXT};
	background-color: ${(props) =>
		props.theme === "dark" ? dark.COLOR_BG_TERTIARY : light.COLOR_BG_TERTIARY};
`

export const CardTitle = styled.p`
	text-align: center;
`

export const Trash = styled.div`
	position: absolute;
	top: 0;
	right: 0;
`
