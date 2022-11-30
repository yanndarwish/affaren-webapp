import { StyleSheet } from "react-native";
import common from "../../styles/common.styles"
import light from "../../styles/light.theme.styles";
import dark from "../../styles/dark.theme.styles";

export const defaultStyle = StyleSheet.create({
	sidebar: {
		position: "fixed",
		top: 0,
		left: 0,
		width: 100,
		borderRightWidth: 2,
	},
	sidebarLight: {
		borderRightColor: `rgba(${light.COLOR_TEXT_RGB}, 0.15)`,
		backgroundColor: light.COLOR_BG_SECONDARY,
	},
	sidebarDark: {
		borderRightColor: `rgba(${dark.COLOR_TEXT_RGB}, 0.15)`,
		backgroundColor: dark.COLOR_BG_SECONDARY,
	},
	iconLight: {
		fill: light.COLOR_TEXT,
	},
	iconDark: {
		fill: dark.COLOR_TEXT,
	},
	iconAccent: {
		fill: common.CLR_ACCENT,
	},
	sidebarTop: {
		position: "relative",
		width: "100%",
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
		maxHeight: 120,
	},
	separator: {
		position: "absolute",
		bottom: 0,
		height: 2,
		width: "60%",
		marginHorizontal: "20%",
		opacity: 0.15,
	},
	separatorLight: {
		backgroundColor: light.COLOR_TEXT,
	},
	separatorDark: {
		backgroundColor: dark.COLOR_TEXT,
	},
	linksContainer: {
		height: "100%",
		width: "100%",
		flex: 7,
		flexDirection: "column",
		justifyContent: "center",
		gap: 20,
	},
	text: {
		color: "white",
		textAlign: "center",
	},
	link: {
		paddingVertical: common.PADDING_M,
		paddingHorizontal: common.PADDING_M,
	},
})