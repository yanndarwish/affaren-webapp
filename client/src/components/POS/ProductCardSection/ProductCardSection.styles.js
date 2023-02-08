import styled from "styled-components"
import dark from "../../../assets/common/dark.theme.styles"
import light from "../../../assets/common/light.theme.styles"
import { constant } from "../../../assets/common/common.styles"

export const StyledProductCardSection = styled.div`
	display: flex;
	align-items: center;
	flex-direction: column;
	gap: ${constant.PADDING_M}px;
	padding-block: ${constant.PADDING_M}px;
	width: 0px;
	height: 100vh;
	overflow-y: scroll;
	z-index: 4;
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
	display: ${(props) =>
		props.display === 'true' ? "none" : "flex"};
	padding: ${constant.GAP / 1.4}px;
	position: absolute;
	top: ${constant.GAP * 6}px;
	right: 48px;
	border: none;
	border-radius: 50%;
	color: ${(props) =>
		props.theme === "dark" ? light.COLOR_TEXT : dark.COLOR_TEXT};

	background-color: ${(props) =>
		props.theme === "dark" ? "#90CAF9" : "#1876D2"};
`

export const CardSectionIcon = styled.div`
	padding: ${constant.GAP / 3}px;
	border-radius: 3px;
	border: ${(props) =>
		props.theme === "dark"
			? "2px solid " + light.COLOR_TEXT
			: "2px solid " + dark.COLOR_TEXT};
`
