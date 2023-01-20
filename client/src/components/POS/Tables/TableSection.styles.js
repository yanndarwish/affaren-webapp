import styled from "styled-components"
import { constant } from "../../../assets/common/common.styles"

export const SmallScreen = styled.div`
	display: none;
	width: 0;
	@media (max-width: 768px) {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		width: 100%;
		gap: ${constant.GAP}px;
	}
`

export const BigScreen = styled.div`
	@media (max-width: 768px) {
		display: none;
	}
`
