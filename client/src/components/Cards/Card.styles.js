import styled from "styled-components"
import dark from "../../assets/styles/dark.theme.styles"
import light from "../../assets/styles/light.theme.styles"
import { constant } from "../../assets/styles/common.styles"

export const Container = styled.div`
	max-width:500px;
	min-width:350px;
	height:400px;
	display: flex;
	flex-direction: column;
	gap: ${constant.GAP}px;
	padding: ${constant.PADDING_M}px;
	box-shadow: 10px 10px 15px 0px rgba(0, 0, 0, 0.3);
	color: ${(props) =>
		props.theme === "dark" ? dark.COLOR_TEXT : light.COLOR_TEXT};
	background-color: ${(props) =>
		props.theme === "dark"
			? dark.COLOR_BG_SECONDARY
			: light.COLOR_BG_SECONDARY};
`

export const Text = styled.p`
	font-size: ${constant.FONT_BODY * 1.5}px;

`

export const Footer = styled.div`
	display: flex;
	justify-content: space-between;
`
