import { Stack } from "@mui/material"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "../../ui/button"
import { DatePicker } from "../../ui/datePicker"

export const DateNavigator = ({
	selectedDate,
	disablePreviousDay = false,
	disableNextDay = false,
	disabledRules = {},
	handlePreviousDay = () => {},
	handleNextDay = () => {},
	handleDateChange = () => {},
}) => {
	return (
		<Stack direction="row" justifyContent="flex-start" spacing={2}>
			<Button onClick={handlePreviousDay} disabled={disablePreviousDay}>
				<ChevronLeft />
			</Button>
			<DatePicker
				date={selectedDate}
				setDate={handleDateChange}
				disabled={disabledRules}
			/>
			<Button onClick={handleNextDay} disabled={disableNextDay}>
				<ChevronRight />
			</Button>
		</Stack>
	)
}
