import styled from "styled-components"
import dark from "../../../assets/common/dark.theme.styles"
import light from "../../../assets/common/light.theme.styles"
import { constant } from "../../../assets/common/common.styles"

export const Overlay = styled.div`
	position: fixed;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	z-index: 4;
	background-color: ${(props) =>
		props.theme === "dark"
			? `rgb(${dark.COLOR_TEXT_RGB}, 0.5)`
			: `rgb(${light.COLOR_TEXT_RGB}, 0.5)`};
`

export const Dialog = styled.div`
	display: flex;
	flex-direction: column;
	gap: 1rem;
	position: absolute;
	top: 0;
	bottom: 0;
	right: 0;
	left: 50%;
	overflow-y: scroll;
	padding: ${constant.PADDING_M}px;
	color: ${(props) =>
		props.theme === "dark" ? dark.COLOR_TEXT : light.COLOR_TEXT};
	background-color: ${(props) =>
		props.theme === "dark" ? dark.COLOR_BG_PRIMARY : light.COLOR_BG_PRIMARY};
	transition: 0.2s;
`

export const DialogHeader = styled.div`
	display: flex;
	justify-content: space-between;
`

export const DialogBody = styled.div`
	display: flex;
	flex-direction: column;
	height: 100%;
	gap: 1rem;
	padding: ${constant.PADDING_M}px;
`

export const DialogCard = styled.div`
	height: 100%;
	box-shadow: 10px 10px 15px 0px rgba(0, 0, 0, 0.3);
	background-color: ${(props) =>
		props.theme === "dark"
			? dark.COLOR_BG_SECONDARY
			: light.COLOR_BG_SECONDARY};
`

export const DialogFooter = styled.div`
	display: flex;
	justify-content: center;
`
