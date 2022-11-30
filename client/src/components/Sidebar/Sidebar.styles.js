import styled from "styled-components"
import dark from "../../assets/styles/dark.theme.styles"
import light from "../../assets/styles/light.theme.styles"
import { constant } from "../../assets/styles/common.styles"
import { Link } from "react-router-dom"

export const StyledSidebar = styled.div`
	flex-direction: column;
	justify-content: space-between;
	align-items: center;
	padding: ${constant.PADDING_M}px;
	height: 100%;
	border-right: 2px solid ${props => props.theme === "dark" ? `rgb(${dark.COLOR_TEXT_RGB}, 0.15)` : `rgb(${light.COLOR_TEXT_RGB}, 0.15)`};
	background-color: ${(props) =>
		props.theme === "dark" ? dark.COLOR_BG_SECONDARY : light.COLOR_BG_SECONDARY};
`

export const SidebarTop = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	gap: ${constant.PADDING_M}px;
	flex: 1;
`

export const StyledLink = styled(Link)``
export const Separator = styled.div`
	height: 2px;
	width: 80%;
	opacity: 0.15;
	background-color: ${(props) =>
		props.theme === "dark" ? dark.COLOR_TEXT : light.COLOR_TEXT};
`

export const LinksContainer = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content:center;
	gap:1.5rem;
	height:80%;
`
