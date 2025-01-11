"use client"

import { useEvents } from "../../lib/hooks/useEvents"
// import "@/styles/calendar.css"

import dayGridPlugin from "@fullcalendar/daygrid"
import interactionPlugin from "@fullcalendar/interaction"
import listPlugin from "@fullcalendar/list"
import multiMonthPlugin from "@fullcalendar/multimonth"
import FullCalendar from "@fullcalendar/react"
import timeGridPlugin from "@fullcalendar/timegrid"

import { useEffect, useRef, useState } from "react"
import CalendarNav from "./calendar-nav"
import { earliestTime, latestTime } from "../../utils/data"
import { getDateFromMinutes } from "../../lib/utils"
import { Card } from "../ui/card"
import { EventEditForm } from "./event-edit-form"
import { EventView } from "./event-view"
import { EventAddForm } from "./event-add-form"
import { useModal } from "../shared/modal"
import { Stack } from "@mui/material"
import { useQuery } from "../../lib/hooks/useQuery"
import { getEvents } from "../../lib/api"
import { useNotify } from "../../lib/hooks/useNotify"
import { getMonth, getYear } from "./utils"

export function Calendar() {
	const modalAddEvent = useModal()
	const modalViewEvent = useModal()
	const modalEditEvent = useModal()
	const { notifyError } = useNotify()

	const calendarRef = useRef(null)
	const [currentView, setCurrentView] = useState("timeGridWeek")
	const [viewedDate, setViewedDate] = useState(new Date())
	const [selectedStart, setSelectedStart] = useState(new Date())
	const [selectedEnd, setSelectedEnd] = useState(new Date())
	const [selectedEvent, setSelectedEvent] = useState()
	const [events, setEvents] = useState([])

	const queryGetEvents = useQuery({
		queryFn: getEvents,
		onSuccess: (data) => {
			setEvents(formatEvents(data))
		},
		onError: () => {
			notifyError("Error fetching events")
		},
	})

	const handleEventClick = (info) => {
		const event = {
			id: info.event.id,
			title: info.event.title,
			description: info.event.extendedProps.description,
			backgroundColor: info.event.backgroundColor,
			start: info.event.start,
			end: info.event.end,
			typeName: info.event.extendedProps.typeName,
			typeId: info.event.extendedProps.typeId,
			color: info.event.color,
		}

		setSelectedEvent(event)
		modalViewEvent.openModal()
	}

	const handleEventChange = (info) => {
		const event = {
			id: info.event.id,
			title: info.event.title,
			description: info.event.extendedProps.description,
			backgroundColor: info.event.backgroundColor,
			start: info.event.start,
			end: info.event.end,
			typeName: info.event.extendedProps.typeName,
			typeId: info.event.extendedProps.typeId,
			color: info.event.color,
		}

		setSelectedEvent(event)
	}

	const fetchEvents = () => {
		if (currentView === "dayGridMonth") {
			// get month of the viewedDate
			const month = getMonth(currentView, viewedDate) - 1
			const year = getYear(currentView, viewedDate)
			const startDate = new Date(year, month, 1)
			const endDate = new Date(year, month + 1, 0)
			// set hour to 00:00:00
			startDate.setHours(0, 0, 0, 0)
			endDate.setHours(23, 59, 59, 999)
			queryGetEvents.send({
				start_date: startDate.toISOString(),
				end_date: endDate.toISOString(),
			})
		} else if (currentView === "timeGridWeek") {
			// get date of the monday of the week
			const startDate = new Date(viewedDate)
			startDate.setDate(startDate.getDate() - startDate.getDay() + 1)

			// get the date of the sunday of the week
			const endDate = new Date(startDate)
			endDate.setDate(endDate.getDate() + 6)

			// set hours
			startDate.setHours(0, 0, 0, 0)
			endDate.setHours(23, 59, 59, 999)

			queryGetEvents.send({
				start_date: startDate.toISOString(),
				end_date: endDate.toISOString(),
			})
		} else if (currentView === "timeGridDay") {
			// get date of the viewedDate
			const startDate = new Date(viewedDate)
			const endDate = new Date(startDate)
			// set hour to 00:00:00
			startDate.setHours(0, 0, 0, 0)
			endDate.setHours(23, 59, 59, 999)
			queryGetEvents.send({
				start_date: startDate.toISOString(),
				end_date: endDate.toISOString(),
			})
		}
	}

	useEffect(() => {
		fetchEvents()
	}, [viewedDate])

	const EventItem = ({ info }) => {
		const { event } = info
		const [left, right] = info.timeText.split(" - ")

		return (
			<div className="overflow-hidden w-full">
				{info.view.type == "dayGridMonth" ? (
					<div
						style={{ backgroundColor: info.backgroundColor }}
						className={`flex flex-col rounded-md w-full px-2 py-1 line-clamp-1 text-[0.5rem] sm:text-[0.6rem] md:text-xs`}
					>
						<p className="font-semibold text-gray-950 line-clamp-1 w-11/12">
							{event.title}
						</p>

						<p className="text-gray-800">{left}</p>
						<p className="text-gray-800">{right}</p>
					</div>
				) : (
					<div className="flex flex-col space-y-0 text-[0.5rem] sm:text-[0.6rem] md:text-xs">
						<p className="font-semibold w-full text-gray-950 line-clamp-1">
							{event.title}
						</p>
						<p className="text-gray-800 line-clamp-1">{`${left} - ${right}`}</p>
					</div>
				)}
			</div>
		)
	}

	const DayHeader = ({ info }) => {
		const [weekday] = info.text.split(" ")

		return (
			<div className="flex items-center h-full overflow-hidden">
				{info.view.type == "timeGridDay" ? (
					<div className="flex flex-col rounded-sm">
						<p>
							{info.date.toLocaleDateString("en-US", {
								month: "long",
								day: "numeric",
								year: "numeric",
							})}
						</p>
					</div>
				) : info.view.type == "timeGridWeek" ? (
					<div className="flex flex-col space-y-0.5 rounded-sm items-center w-full text-xs sm:text-sm md:text-md">
						<p className="flex font-semibold">{weekday}</p>
						{info.isToday ? (
							<div className="flex bg-black dark:bg-white h-6 w-6 rounded-full items-center justify-center text-xs sm:text-sm md:text-md">
								<p className="font-light dark:text-black text-white">
									{info.date.getDate()}
								</p>
							</div>
						) : (
							<div className="h-6 w-6 rounded-full items-center justify-center">
								<p className="font-light">{info.date.getDate()}</p>
							</div>
						)}
					</div>
				) : (
					<div className="flex flex-col rounded-sm">
						<p>{weekday}</p>
					</div>
				)}
			</div>
		)
	}

	const DayRender = ({ info }) => {
		return (
			<div className="flex">
				{info.view.type == "dayGridMonth" && info.isToday ? (
					<div className="flex h-7 w-7 rounded-full bg-black dark:bg-white items-center justify-center text-sm text-white dark:text-black">
						{info.dayNumberText}
					</div>
				) : (
					<div className="flex h-7 w-7 rounded-full items-center justify-center text-sm">
						{info.dayNumberText}
					</div>
				)}
			</div>
		)
	}

	const handleDateSelect = (info) => {
		setSelectedStart(info.start)
		setSelectedEnd(info.end)
	}

	const handleClick = (info) => {
		const start = new Date(info.date)
		setSelectedStart(start)
		// add 30 minutes
		const end = new Date(start)
		end.setMinutes(start.getMinutes() + 30)
		setSelectedEnd(end)
		// setEventAddOpen(true)

		modalAddEvent.openModal()
	}

	const earliestHour = getDateFromMinutes(earliestTime)
		.getHours()
		.toString()
		.padStart(2, "0")
	const earliestMin = getDateFromMinutes(earliestTime)
		.getMinutes()
		.toString()
		.padStart(2, "0")
	const latestHour = getDateFromMinutes(latestTime)
		.getHours()
		.toString()
		.padStart(2, "0")
	const latestMin = getDateFromMinutes(latestTime)
		.getMinutes()
		.toString()
		.padStart(2, "0")

	const calendarEarliestTime = `${earliestHour}:${earliestMin}`
	const calendarLatestTime = `${latestHour}:${latestMin}`

	return (
		<div className="flex flex-col space-y-4 h-full overflow-y-hidden">
			<CalendarNav
				calendarRef={calendarRef}
				start={selectedStart}
				end={selectedEnd}
				viewedDate={viewedDate}
				currentView={currentView}
				setCurrentView={setCurrentView}
			/>

			<Stack className="border border-gray-100 rounded-md overflow-hidden flex-1 min-h-0">
				<Stack className="rounded-md p-2 overflow-auto h-full">
					<FullCalendar
						ref={calendarRef}
						timeZone="local"
						plugins={[
							dayGridPlugin,
							timeGridPlugin,
							multiMonthPlugin,
							interactionPlugin,
							listPlugin,
						]}
						initialView="timeGridWeek"
						headerToolbar={false}
						slotMinTime={calendarEarliestTime}
						slotMaxTime={calendarLatestTime}
						allDaySlot={false}
						firstDay={1}
						displayEventEnd={true}
						windowResizeDelay={0}
						events={events}
						slotLabelFormat={{
							hour: "numeric",
							minute: "2-digit",
							hour12: false,
						}}
						eventTimeFormat={{
							hour: "numeric",
							minute: "2-digit",
							hour12: false,
						}}
						eventBorderColor={"black"}
						contentHeight={"auto"}
						expandRows={true}
						eventStartEditable={false}
						eventDurationEditable={false}
						dayCellContent={(dayInfo) => <DayRender info={dayInfo} />}
						eventContent={(eventInfo) => <EventItem info={eventInfo} />}
						dayHeaderContent={(headerInfo) => <DayHeader info={headerInfo} />}
						eventClick={(eventInfo) => handleEventClick(eventInfo)}
						eventChange={(eventInfo) => handleEventChange(eventInfo)}
						select={handleDateSelect}
						datesSet={(dates) => setViewedDate(dates.start)}
						dateClick={(info) => handleClick(info)}
						nowIndicator
						editable
						selectable
					/>
				</Stack>
			</Stack>

			<EventEditForm
				event={selectedEvent}
				controller={modalEditEvent}
				onSuccess={fetchEvents}
			/>
			<EventView
				event={selectedEvent}
				controller={modalViewEvent}
				onSuccess={fetchEvents}
			/>
			<EventAddForm
				controller={modalAddEvent}
				start={selectedStart}
				end={selectedEnd}
				onSuccess={fetchEvents}
			/>
		</div>
	)
}

const formatEvents = (events) => {
	return events.map((event) => {
		const start = new Date(event.event_start_date)
		const end = new Date(event.event_end_date)

		// Format to YYYY-MM-DD HH:mm
		const formatDate = (date) => {
			return date.toLocaleString("sv", {
				// 'sv' locale gives us YYYY-MM-DD HH:mm format
				year: "numeric",
				month: "2-digit",
				day: "2-digit",
				hour: "2-digit",
				minute: "2-digit",
			})
		}

		return {
			id: String(event.event_id),
			title: event.event_name,
			start: formatDate(start),
			end: formatDate(end),
			description: event.event_description,
			typeName: event.event_type_name,
			typeId: String(event.event_type_id),
			color: event.event_type_color.toUpperCase(),
			backgroundColor: event.event_type_color.toUpperCase(),
		}
	})
}
