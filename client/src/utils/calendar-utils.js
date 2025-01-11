import FullCalendar from "@fullcalendar/react"

export function generateDaysInMonth(daysInMonth) {
	const daysArray = []

	for (let day = 1; day <= daysInMonth; day++) {
		daysArray.push({
			value: String(day),
			label: String(day),
		})
	}

	return daysArray
}

export function goPrev(calendarRef) {
	const calendarApi = calendarRef.current.getApi()
	calendarApi.prev()
}

export function goNext(calendarRef) {
	const calendarApi = calendarRef.current.getApi()
	calendarApi.next()
}

export function goToday(calendarRef) {
	const calendarApi = calendarRef.current.getApi()
	calendarApi.today()
}

export function handleDayChange(calendarRef, currentDate, day) {
	const calendarApi = calendarRef.current.getApi()
	const newDate = currentDate.setDate(Number(day))
	calendarApi.gotoDate(newDate)
}

export function handleMonthChange(calendarRef, currentDate, month) {
	const calendarApi = calendarRef.current.getApi()
	const newDate = new Date(currentDate)
	newDate.setMonth(Number(month) - 1)
	calendarApi.gotoDate(newDate)
}

export function handleYearChange(calendarRef, currentDate, e) {
	const calendarApi = calendarRef.current.getApi()
	const newDate = currentDate.setFullYear(Number(e.target.value))
	calendarApi.gotoDate(newDate)
}

export function setView(calendarRef, viewName, setCurrentView) {
	const calendarApi = calendarRef.current.getApi()
	setCurrentView(viewName)
	calendarApi.changeView(viewName)
}

