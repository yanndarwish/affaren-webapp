import { useState, useEffect } from "react"

import { useSale } from "../../../../../lib/providers/sale"

import { Label } from "../../../../../components/ui/label"
import { Input } from "../../../../../components/ui/input"
import { Button } from "../../../../../components/ui/button"
import { Modal } from "../../../../../components/shared/modal"
import { NumPad } from "../../../../../components/common/NumPad/NumPad"

export const ModalBookmark = ({ controller, onSubmit = () => null }) => {
	const sale = useSale()
	const [name, setName] = useState("")
	const [number, setNumber] = useState("")

	const handleSubmit = () => {
		onSubmit(name, number)
		handleClose()
	}

	const handleChange = (value) => {
		setNumber(number + value)
	}

	const handleCorrect = () => {
		if (number === "") return

		let digits = number.slice(0, -1)

		setNumber(digits)
	}

	const handleClose = () => {
		controller.closeModal()
		setName("")
		setNumber("")
	}

	useEffect(() => {
		setNumber(String(Object.keys(sale.bookmarks).length + 1))
	}, [sale.bookmarks])

	return (
		<Modal
			open={controller.open}
			title="Save to Bookmarks"
			handleClose={handleClose}
		>
			<div className="grid gap-2">
				<Label htmlFor="name">Name</Label>
				<Input
					id="name"
					type="text"
					value={name}
					onChange={(e) => setName(e.target.value)}
					placeholder="Bookmark Name"
					required
					autoFocus
				/>
			</div>
			<div className="grid gap-2">
				<Label htmlFor="number">Number</Label>
				<NumPad
					display
					value={number}
					onClick={handleChange}
					onCorrect={handleCorrect}
				/>
			</div>
			<Button onClick={handleSubmit}>Save</Button>
		</Modal>
	)
}
