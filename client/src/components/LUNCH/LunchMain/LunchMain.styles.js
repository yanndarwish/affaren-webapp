import styled from "styled-components";
import { constant } from "../../../assets/common/common.styles";
import dark from "../../../assets/common/dark.theme.styles";
import light from "../../../assets/common/light.theme.styles";

export const Container = styled.div`
	position: relative;
	display: flex;
	flex-direction: column;
	flex: 1;
	padding: ${constant.PADDING_L}px;
	height: 100%;
	width: 100%;
	overflow: scroll;
	gap: ${constant.GAP * 2}px;
	color: ${(props) =>
		props.theme === "dark" ? dark.COLOR_TEXT : light.COLOR_TEXT};
	background-color: ${(props) =>
		props.theme === "dark" ? dark.COLOR_BG_PRIMARY : light.COLOR_BG_PRIMARY};

	@media (max-width: 768px) {
		padding: ${constant.PADDING_M}px;
		padding-block: ${constant.PADDING_M * 3}px;
		gap: ${constant.GAP}px;
	}
`
