import { Stack } from "@mui/material"
import { Minus, Plus, UserRound } from "lucide-react"

import { Button } from "../../../../../components/ui/button"
import { useSale } from "../../../../../lib/providers/sale"

export const PeopleSection = ({ people, uuid }) => {
	const { removePerson, addPerson } = useSale()

	const handleRemovePerson = () => {
		removePerson(uuid)
	}

	const handleAddPerson = () => {
		addPerson(uuid)
	}

	return (
		<Stack direction="row" spacing={1} alignItems="center">
			<Button
				size="icon"
				variant="outline"
				disabled={people === 1}
				onClick={handleRemovePerson}
			>
				<Minus />
			</Button>
			<Stack direction="row">
				{Array.from({ length: people }).map((_, i) => (
					<UserRound key={i} className="w-4 h-4 text-gray-400" />
				))}
			</Stack>
			<Button size="icon" variant="outline" onClick={handleAddPerson}>
				<Plus />
			</Button>
		</Stack>
	)
}
