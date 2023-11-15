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

	@media (max-width: 768px) {
		padding: ${constant.PADDING_M}px;
		padding-block: ${constant.PADDING_M * 3}px;
		gap: ${constant.GAP}px;
	}
`

export const CenterContainer = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	width: 100%;
	height: 100%;
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

export const Grid = styled.div`
	display: flex;
	height: 100%;
	@media (max-width: 768px) {
		flex-direction: column;
	}
`

export const Navbar = styled.div`
	display: ${(props) => (props.drawerIsOpen === true ? "block" : "none")};
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
	@media (max-width: 768px) {
		flex-direction: column;
		gap: ${constant.GAP}px;
	}
`

export const FixedSpaceHeader = styled.header`
	display: flex;
	width: 100%;
	justify-content: space-between;
	align-items: flex-start;
`

export const AppBar = styled.div`
	position: absolute;
	top: 0;
	left: 0;
	display: flex;
	justify-content: center;
	align-items: center;
	height: 72px;
	width: 100px;
	z-index: 4;
`

export const SpaceHeaderCenter = styled.header`
	display: flex;
	justify-content: space-between;
	width: 100%;
	align-items: center;
`

export const SpaceBetween = styled.div`
	display: flex;
	justify-content: space-between;
`

export const Title = styled.h1`
	font-size: ${constant.FONT_PAGE_TITLE}px;
	font-weight: bold;
	@media (max-width: 768px) {
		text-align: center;
	}
`

export const SearchSection = styled.div`
	display: flex;
	gap: ${constant.GAP * 2}px;
	@media (max-width: 768px) {
		flex-direction: column;
		gap: ${constant.GAP}px;
	}
`

export const ButtonSection = styled.div`
	display: flex;
	gap: ${constant.GAP}px;
`

export const Flex = styled.div`
	display: flex;
`

export const FullFlex = styled.div`
	position: relative;
	display: flex;
	flex: 1;
	color: ${(props) =>
		props.theme === "dark" ? dark.COLOR_TEXT : light.COLOR_TEXT};
`

export const Body = styled.div`
	position: relative;
	display: flex;
	flex-direction: column;
	height: max(100%, fit-content);
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

export const GapS = styled.div`
	display: flex;
	gap: ${constant.GAP}px;
`

export const CloseColumn = styled.div`
	display: flex;
	flex-direction: column;
	width: 100%;
	height: 100%;
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

export const HorizontalEnd= styled.div`
	display: flex;
	justify-content: end;
`

export const FullCenter = styled.div`
	display: flex;
	height: 100%;
	width: 100%;
	gap: 1rem;
	justify-content: center;
	align-items: center;
`
export const PrimaryText = styled.p`
	font-size: ${constant.FONT_BODY}px;
	font-weight: 500;
	color: ${(props) =>
		props.theme === "dark"
			? `rgb(${dark.COLOR_TEXT_RGB})`
			: `rgb(${light.COLOR_TEXT_RGB})`};
`

export const SecondaryText = styled.p`
	font-size: ${constant.FONT_BODY}px;
	font-weight: 500;
	color: ${(props) =>
		props.theme === "dark"
			? `rgb(${dark.COLOR_TEXT_RGB}, 0.5)`
			: `rgb(${light.COLOR_TEXT_RGB}, 0.5)`};
`

export const SecondaryEllipsis = styled.p`
	font-size: ${constant.FONT_BODY}px;
	font-weight: 500;
	width: 14ch;
	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;
	color: ${(props) =>
		props.theme === "dark"
			? `rgb(${dark.COLOR_TEXT_RGB}, 0.5)`
			: `rgb(${light.COLOR_TEXT_RGB}, 0.5)`};
`

export const SuccessText = styled.p`
	font-size: ${constant.FONT_BODY}px;
	font-weight: 500;
	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;
	color: ${constant.CLR_SUCCESS};
`

export const Ellipsis = styled.p`
	font-size: ${constant.FONT_BODY}px;
	font-weight: 500;
	max-width: 12ch;
	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;
	color: ${(props) =>
		props.theme === "dark" && props.color === "primary"
			? `rgb(${dark.COLOR_TEXT_RGB})`
			: props.theme === "dark" && props.color === "secondary"
			? `rgb(${dark.COLOR_TEXT_RGB}, 0.5)`
			: props.color === "success"
			? constant.CLR_SUCCESS
			: props.color === "primary"
			? `rgb(${light.COLOR_TEXT_RGB})`
			: props.color === "secondary"
			? `rgb(${light.COLOR_TEXT_RGB}, 0.5)`
			: props.color === "tertiary" && "#1876D2"};
	@media (max-width: 768px) {
		width: 9ch;
	}
`

export const Wrap = styled.div`
	display: flex;
	gap: ${constant.GAP}px;
	flex-wrap: wrap;
`
export const WrapS = styled.div`
	display: flex;
	gap: ${constant.GAP / 2}px;
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

export const Notification = styled.div`
	position: absolute;
	top: -25px;
	right: -25px;
	display: flex;
	justify-content: center;
	align-items: center;
	color: ${dark.COLOR_TEXT};
	background: ${constant.CLR_DANGER};
	height: 50px;
	width: 50px;
	z-index: 0;
	border-radius: 50%;
`
