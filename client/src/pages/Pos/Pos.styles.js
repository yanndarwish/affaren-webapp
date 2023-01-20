import styled from "styled-components"
import dark from "../../assets/common/dark.theme.styles"
import light from "../../assets/common/light.theme.styles"
export const PosContainer = styled.div`
	display: flex;
	flex: 1;
	height: 100vh;
	overflow: hidden;
	color: ${(props) =>
		props.theme === "dark" ? dark.COLOR_TEXT : light.COLOR_TEXT};
	background-color: ${(props) =>
		props.theme === "dark" ? dark.COLOR_BG_PRIMARY : light.COLOR_BG_PRIMARY};
`

export const ButtonSection = styled.div`
    display:flex;
    gap:1rem;
`

export const ButtonSectionSpace = styled.div`
	display: flex;
    justify-content: space-between;
	gap: 1rem;
`

export const TotalSection = styled.div`
    display:flex;
    justify-content: flex-end;
    gap:2rem;
`

export const StyledPos = styled.div`
	display: flex;
	flex: 1;
	height: 100vh;
	overflow: hidden;
	@media (max-width: 768px) {
		display: none;
	}
`