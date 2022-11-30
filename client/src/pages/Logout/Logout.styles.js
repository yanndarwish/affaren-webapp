import { StyleSheet } from "react-native"
import common from "../../styles/common.styles"
import light from "../../styles/light.theme.styles"
import dark from "../../styles/dark.theme.styles"

export const styles = StyleSheet.create({
	container: {
        flex: 1,
		justifyContent: "center",
		alignItems: "center",
	},
	containerLight: {
		backgroundColor: light.COLOR_BG_PRIMARY,
	},
	containerDark: {
		backgroundColor: dark.COLOR_BG_PRIMARY,
	},
})
