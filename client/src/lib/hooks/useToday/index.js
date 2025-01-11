import { useCallback } from "react"
import { format } from "date-fns"

export const useToday = ({ setCurrentDate, setValue, triggerAnimation }) => {
	return useCallback(() => {
		const today = new Date()
		triggerAnimation(() => {
			setCurrentDate(today)
			setValue(format(today, "MMMM").toLowerCase())
		})
	}, [setCurrentDate, setValue, triggerAnimation])
}
