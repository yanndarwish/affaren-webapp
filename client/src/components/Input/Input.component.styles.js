import { StyleSheet } from "react-native"
import common from "../../styles/common.styles"
import light from "../../styles/light.theme.styles"
import dark from "../../styles/dark.theme.styles"

export const styles = StyleSheet.create({
	input: {
		padding: common.PADDING_S,
		borderRadius: common.BORDER_RADIUS_M,
		fontSize: common.FONT_BODY,
		justifyContent: "space-between",
		borderWidth: 1,
		height: 60
	},
	lightInput: {
		borderColor: light.COLOR_TEXT,
		color: light.COLOR_TEXT,
	},
	darkInput: {
		borderColor: dark.COLOR_TEXT,
		color: dark.COLOR_TEXT,
	},
})