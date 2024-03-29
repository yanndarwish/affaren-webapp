import styled from "styled-components"
import { constant } from "../../../assets/common/common.styles"

export const Display = styled.div`
	display: flex;
	justify-content: flex-end;
	align-items: center;
`

export const CorrectBtn = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	padding: ${constant.PADDING_M}px;
	padding-right: ${constant.PADDING_L}px;
`

export const Keypad = styled.div`
	width: 100%;
`

export const NumRow = styled.div`
	display: flex;
	width: 100%;
`

export const Num = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	flex: 1;
	padding: ${(props) =>
		props.size === "S" ? `${constant.PADDING_S}px` : `${constant.PADDING_M}px`};
`
