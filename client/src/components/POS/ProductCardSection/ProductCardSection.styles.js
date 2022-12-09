import styled from "styled-components"
import dark from "../../../assets/styles/dark.theme.styles"
import light from "../../../assets/styles/light.theme.styles"
import { constant } from "../../../assets/styles/common.styles"

export const StyledProductCardSection = styled.div`
	position: relative;
	display: flex;
	align-items: center;
	flex-direction: column;
	gap: ${constant.PADDING_M}px;
	padding-block: ${constant.PADDING_M}px;
	width: ${constant.PADDING_L + 100}px;
	height: 100vh;
	overflow-y: scroll;
	border-left: 1px solid
		${(props) =>
			props.theme === "dark"
				? `rgb(${dark.COLOR_TEXT_RGB}, 0.15)`
				: `rgb(${light.COLOR_TEXT_RGB}, 0.15)`};

	background-color: ${(props) =>
		props.theme === "dark"
			? dark.COLOR_BG_SECONDARY
			: light.COLOR_BG_SECONDARY};
	transition: 0.2s;
`

export const CardSectionButton = styled.button`
	display: flex;
	padding: ${constant.GAP / 2}px;
	position: absolute;
	top: ${constant.GAP * 2}px;
	right: 0px;
	border: none;
    border-radius:3px;
	background-color: ${(props) =>
		props.theme === "dark"
			? dark.COLOR_BG_SECONDARY
			: light.COLOR_BG_SECONDARY};
`
