import { StyleSheet } from "react-native"
import common from "../../styles/common.styles"
import light from "../../styles/light.theme.styles"
import dark from "../../styles/dark.theme.styles"

export const styles = StyleSheet.create({
	button: {
        alignSelf: "center",
		paddingHorizontal: 24,
		paddingVertical: 21,
        borderRadius: common.BORDER_RADIUS_S
	},
	green: {
		backgroundColor: common.CLR_SUCCESS,
	},
	yellow: {
		backgroundColor: common.CLR_WARNING,
	},
	red: {
		backgroundColor: common.CLR_DANGER,
	},
	purple: {
		backgroundColor: common.CLR_ACCENT,
	},
    text: {
        color: "#FFFFFF"
    }
})