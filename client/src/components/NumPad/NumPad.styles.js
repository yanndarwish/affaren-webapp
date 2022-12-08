import styled from "styled-components"
import dark from "../../assets/styles/dark.theme.styles"
import light from "../../assets/styles/light.theme.styles"
import { constant } from "../../assets/styles/common.styles"

export const Display = styled.div`
	display: flex;
	justify-content: flex-end;
    align-items:center;
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
	padding: ${constant.PADDING_M}px;
`
