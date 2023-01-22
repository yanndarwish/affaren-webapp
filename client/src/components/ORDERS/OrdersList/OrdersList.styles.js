import styled from "styled-components"

export const Wrapper = styled.div`
	width: 100%;
	max-width: 280px;

	@media (max-width: 830px) {
		position: absolute;

		max-width: 100%;
	}
`

export const OrderButton = styled.div`
	position: absolute;
	display: none;
	top: 16px;
	left: 82px;
	@media (max-width: 830px) {
		z-index: 10;
		display: block;
	}
`
