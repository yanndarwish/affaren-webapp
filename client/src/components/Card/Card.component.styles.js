import { StyleSheet } from "react-native"
import common from "../../styles/common.styles"
import dark from "../../styles/dark.theme.styles"
import light from "../../styles/light.theme.styles"

export const styles = StyleSheet.create({
	container: {
		padding: common.PADDING_M,
		borderRadius: common.BORDER_RADIUS_M,
		justifyContent: "space-between",
	},
	containerLight: {
		backgroundColor: light.COLOR_BG_SECONDARY,
	},
	containerDark: {
		backgroundColor: dark.COLOR_BG_SECONDARY,
	},
	header: {
		marginBottom: common.GAP / 2,
	},
	title: {
		fontSize: common.FONT_SECTION_TITLE,
	},
	body: {
		marginVertical: common.GAP / 2,
	},
	text: {
		fontSize: common.FONT_BODY,
	},
	colorDark: {
		color: dark.COLOR_TEXT,
	},
	colorLight: {
		color: light.COLOR_TEXT,
	},
	shadow: {
		shadowColor: "#171717",
		shadowOffset: { width: 2, height: 4 },
		shadowOpacity: 0.2,
		shadowRadius: 3,
	},
	footer: {
		marginTop: common.GAP / 2,
		flexDirection: "row",
		justifyContent: "space-between",
	},
})
