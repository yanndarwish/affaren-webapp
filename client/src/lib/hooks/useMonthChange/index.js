import { useCallback } from "react"
import { addMonths, format, subMonths } from "date-fns"

export const useMonthChange = ({
	currentDate,
	setCurrentDate,
	setValue,
	triggerAnimation,
	months,
}) => {
	return useCallback(
		(action) => {
			triggerAnimation(() => {
				if (action === "prev") {
					const newDate = subMonths(currentDate, 1)
					setCurrentDate(newDate)
					setValue(format(newDate, "MMMM").toLowerCase())
				} else if (action === "next") {
					const newDate = addMonths(currentDate, 1)
					setCurrentDate(newDate)
					setValue(format(newDate, "MMMM").toLowerCase())
				} else {
					const monthIndex = months.findIndex((month) => month.value === action)
					if (monthIndex !== -1) {
						setCurrentDate(new Date(currentDate.getFullYear(), monthIndex, 1))
					}
				}
			})
		},
		[currentDate, setCurrentDate, setValue, triggerAnimation, months]
	)
}
