import { useState } from "react"
import { ArtTitle } from "../../../assets/styles/common.styles"
import { CorrectBtn, Display, Keypad, Num, NumRow } from "./NumPad.styles"
import BackspaceOutlinedIcon from "@mui/icons-material/BackspaceOutlined"

const NumPad = ({ display, size, target, unit, value, setValue }) => {
	// const [value, setValue] = useState("")

	const handleClick = (e) => {
		if (target) {
			document.getElementById(target).value += e.target.dataset.value
		} else {
			setValue(parseFloat(value + e.target.dataset.value))
		}
	}

	const handleCorrect = () => {
		let newValue = value.toString().slice(0, -1)

		setValue(newValue === "" ? 0 : parseFloat(newValue))
	}
	return (
		<div className="numpad">
			{display ? (
				<Display className="display">
					<ArtTitle>
						{value} {unit}
					</ArtTitle>
					<CorrectBtn onClick={handleCorrect}>
						<BackspaceOutlinedIcon />
					</CorrectBtn>
				</Display>
			) : null}
			<Keypad>
				<NumRow>
					<Num size={size} className="num" data-value={1} onClick={handleClick}>
						1
					</Num>
					<Num size={size} className="num" data-value={2} onClick={handleClick}>
						2
					</Num>
					<Num size={size} className="num" data-value={3} onClick={handleClick}>
						3
					</Num>
				</NumRow>
				<NumRow className="num-row">
					<Num size={size} className="num" data-value={4} onClick={handleClick}>
						4
					</Num>
					<Num size={size} className="num" data-value={5} onClick={handleClick}>
						5
					</Num>
					<Num size={size} className="num" data-value={6} onClick={handleClick}>
						6
					</Num>
				</NumRow>
				<NumRow className="num-row">
					<Num size={size} className="num" data-value={7} onClick={handleClick}>
						7
					</Num>
					<Num size={size} className="num" data-value={8} onClick={handleClick}>
						8
					</Num>
					<Num size={size} className="num" data-value={9} onClick={handleClick}>
						9
					</Num>
				</NumRow>
				<NumRow className="num-row">
					<Num
						size={size}
						className="num"
						data-value=""
						onClick={handleClick}
					></Num>
					<Num size={size} className="num" data-value={0} onClick={handleClick}>
						0
					</Num>
					<Num size={size} className="num" data-value="." onClick={handleClick}>
						.
					</Num>
				</NumRow>
			</Keypad>
		</div>
	)
}

export default NumPad
