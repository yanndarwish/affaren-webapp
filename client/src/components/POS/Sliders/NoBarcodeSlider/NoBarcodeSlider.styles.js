import styled from "styled-components"
import dark from "../../../../assets/common/dark.theme.styles"
import light from "../../../../assets/common/light.theme.styles"
import { constant } from "../../../../assets/common/common.styles"

export const FormWrapper = styled.div`
	height: 100%;
	display: flex;
	flex-direction: column;
	gap: 2rem;
`

export const DialogCard = styled.div`
	padding: ${constant.PADDING_M}px;
	box-shadow: 10px 10px 15px 0px rgba(0, 0, 0, 0.3);
	background-color: ${(props) =>
		props.theme === "dark"
			? dark.COLOR_BG_SECONDARY
			: light.COLOR_BG_SECONDARY};
`
