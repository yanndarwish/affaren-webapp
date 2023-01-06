import {
	ArtTitle,
	ColumnCenter,
	ErrorMessage,
	FullCenter,
} from "../../../assets/styles/common.styles"
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline"
import HighlightOffOutlinedIcon from "@mui/icons-material/HighlightOffOutlined"

const InfoMessage = ({ state, text }) => {
	return (
		<FullCenter>
			{state === "error" && (
				<ColumnCenter>
					<HighlightOffOutlinedIcon sx={{ fontSize: "64px", color: "red" }} />
					{text && <ErrorMessage>{text}</ErrorMessage>}
				</ColumnCenter>
			)}
			{state === "success" && (
				<ColumnCenter>
					<CheckCircleOutlineIcon sx={{ fontSize: "64px" }} color="success" />
					{text && <ArtTitle>{text}</ArtTitle>}
				</ColumnCenter>
			)}
		</FullCenter>
	)
}

export default InfoMessage
