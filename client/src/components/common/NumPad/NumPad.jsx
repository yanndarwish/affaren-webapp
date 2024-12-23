import { useState } from "react"
import { ArtTitle } from "../../../assets/common/common.styles"
import { CorrectBtn, Display, Keypad, NumRow } from "./NumPad.styles"
import BackspaceOutlinedIcon from "@mui/icons-material/BackspaceOutlined"
import { Button } from "../../ui/button"

export const NumPad = ({
	size,
	value,
	unit,
	display,
	onClick = () => null,
	onCorrect = () => null,
}) => {
	const handleClick = (e) => {
		onClick(e.target.dataset.value)
	}

	const handleCorrect = () => {
		onCorrect()
	}

	return (
		<div className="numpad space-y-4">
			{display ? (
				<Display className="display space-x-4">
					<ArtTitle>
						{value} {unit}
					</ArtTitle>
					<Button onClick={handleCorrect}>
						<BackspaceOutlinedIcon />
					</Button>
				</Display>
			) : null}
			<Keypad>
				<NumRow>
					<Num size={size} className="num" value={1} onClick={handleClick} />
					<Num size={size} className="num" value={2} onClick={handleClick} />
					<Num size={size} className="num" value={3} onClick={handleClick} />
				</NumRow>
				<NumRow className="num-row">
					<Num size={size} className="num" value={4} onClick={handleClick} />
					<Num size={size} className="num" value={5} onClick={handleClick} />
					<Num size={size} className="num" value={6} onClick={handleClick} />
				</NumRow>
				<NumRow className="num-row">
					<Num size={size} className="num" value={7} onClick={handleClick} />
					<Num size={size} className="num" value={8} onClick={handleClick} />
					<Num size={size} className="num" value={9} onClick={handleClick} />
				</NumRow>
				<NumRow className="num-row">
					<Num size={size} className="num" value="" onClick={handleClick} />
					<Num size={size} className="num" value={0} onClick={handleClick} />
					<Num size={size} className="num" value="" onClick={handleClick} />
				</NumRow>
			</Keypad>
		</div>
	)
}

const Num = ({ size, value, onClick }) => {
	return (
		<button
			size={size}
			className={`flex justify-center items-center flex-1 p-2 text-slate-600 rounded ${
				value !== "" ? "bg-slate-100" : ""
			}`}
			data-value={value}
			onClick={onClick}
		>
			{value}
		</button>
	)
}
