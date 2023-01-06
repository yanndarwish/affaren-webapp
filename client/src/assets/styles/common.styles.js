import styled from "styled-components"
import dark from "./dark.theme.styles"
import light from "./light.theme.styles"

export const constant = {
	// padding
	PADDING_XS: 6,
	PADDING_S: 12,
	PADDING_M: 24,
	PADDING_L: 48,
	PADDING_XL: 96,
	// margin
	MARGIN_XS: 6,
	MARGIN_S: 12,
	MARGIN_M: 24,
	MARGIN_L: 48,
	MARGIN_XL: 96,
	// gap
	GAP: 24,
	// font-size
	FONT_PAGE_TITLE: 52,
	FONT_SECTION_TITLE: 36,
	FONT_ARTICLE_TITLE: 24,
	FONT_SUBTITLE: 24,
	FONT_LABEL: 16,
	FONT_BODY: 20,
	// border-radius
	BORDER_RADIUS_S: 4,
	BORDER_RADIUS_M: 6,
	//base colors
	CLR_ACCENT: "#7F5AF0",
	CLR_SUCCESS: "#2CB67D",
	CLR_WARNING: "#FAAE2B",
	CLR_DANGER: "#EF4565",
}

export const Container = styled.main`
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
`

export const CenterContainer = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	width: 100%;
	height:100%;
	color: ${(props) =>
		props.theme === "dark" ? dark.COLOR_TEXT : light.COLOR_TEXT};
	background-color: ${(props) =>
		props.theme === "dark" ? dark.COLOR_BG_PRIMARY : light.COLOR_BG_PRIMARY};
`

export const FixedCenterContainter = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	width: 100%;
	height: 100vh;
	color: ${(props) =>
		props.theme === "dark" ? dark.COLOR_TEXT : light.COLOR_TEXT};
	background-color: ${(props) =>
		props.theme === "dark" ? dark.COLOR_BG_PRIMARY : light.COLOR_BG_PRIMARY};
`

export const FitContainer = styled.div`
	display: flex;
	flex-direction: column;
	height: fit-content;
	gap: 1rem;
	padding: ${constant.PADDING_M}px;
	box-shadow: 10px 10px 15px 0px rgba(0, 0, 0, 0.3);

	background-color: ${(props) =>
		props.theme === "dark"
			? dark.COLOR_BG_SECONDARY
			: light.COLOR_BG_SECONDARY};
`

export const Header = styled.header`
	display: flex;
	align-items: flex-start;
`

export const SpaceHeader = styled.header`
	display: flex;
	width: 100%;
	justify-content: space-between;
	align-items: flex-start;
`

export const SpaceHeaderCenter = styled.header`
	display: flex;
	justify-content: space-between;
	align-items: center;
`

export const Title = styled.h1`
	font-size: ${constant.FONT_PAGE_TITLE}px;
	font-weight: bold;
`

export const SearchSection = styled.div`
	display: flex;
	gap: ${constant.GAP * 2}px;
`

export const ButtonSection = styled.div`
	display: flex;
	gap: ${constant.GAP}px;
`


export const Flex = styled.div`
	display: flex;
`

export const FullFlex = styled.div`
	display: flex;
	flex: 1;
	color: ${(props) =>
		props.theme === "dark" ? dark.COLOR_TEXT : light.COLOR_TEXT};
`

export const Body = styled.div`
	display: flex;
	flex-direction: column;
	height: 100%;
	gap: 1rem;
	padding: ${constant.PADDING_M}px;
	box-shadow: 10px 10px 15px 0px rgba(0, 0, 0, 0.3);

	background-color: ${(props) =>
		props.theme === "dark"
			? dark.COLOR_BG_SECONDARY
			: light.COLOR_BG_SECONDARY};
`

export const SubTitle = styled.h2`
	font-size: ${constant.FONT_SECTION_TITLE}px;
`

export const ArtTitle = styled.h3`
	font-size: ${constant.FONT_ARTICLE_TITLE}px;
`

export const Gap = styled.div`
	display: flex;
	gap: ${constant.GAP * 2}px;
`

export const Column = styled.div`
	display: flex;
	flex-direction: column;
	gap: ${constant.GAP}px;
	width: 100%;
`

export const ColumnCenter = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: ${constant.GAP}px;
`

export const ColumnSpace = styled.div`
	display: flex;
	height: 100%;
	flex-direction: column;
	justify-content: space-between;
	align-items: center;
`

export const VerticalCenter = styled.div`
	display: flex;
	gap: 1rem;
	align-items: center;
`

export const HorizontalCenter = styled.div`
	display: flex;
	justify-content: center;
`

export const FullCenter = styled.div`
	display: flex;
	height: 100%;
	width: 100%;
	gap: 1rem;
	justify-content: center;
	align-items: center;
`

export const SecondaryText = styled.p`
	font-size: ${constant.FONT_BODY}px;
	font-weight: 500;
	color: rgb(${light.COLOR_TEXT_RGB}, 0.5);
`

export const Wrap = styled.div`
	display: flex;
	gap: ${constant.GAP}px;
	flex-wrap: wrap;
`
export const WrapS = styled.div`
	display: flex;
	gap: ${constant.GAP /2}px;
	flex-wrap: wrap;
`

export const OrderTitle = styled.div`
	display: flex;
	flex-direction: column;
	gap: ${constant.GAP}px;
	width: 100%;
`

export const ErrorMessage = styled.p`
		color: ${constant.CLR_DANGER};
`
