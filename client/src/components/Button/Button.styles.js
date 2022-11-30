import { constant } from "../../assets/styles/common.styles";
import styled from "styled-components";

export const StyledButton = styled.button`
    padding-inline:${constant.GAP}px;
    padding-block:21px;
    border:none;
    color: white;
    font-size: ${constant.FONT_BODY}px;
    border-radius:${constant.BORDER_RADIUS_S}px;
    background-color:${constant.CLR_ACCENT};
`

export const SuccessButton = styled(StyledButton)`
    background-color: ${constant.CLR_SUCCESS};
`

export const WarningButton = styled(StyledButton)`
	background-color: ${constant.CLR_WARNING};
`

export const DangerButton = styled(StyledButton)`
	background-color: ${constant.CLR_DANGER};
`
