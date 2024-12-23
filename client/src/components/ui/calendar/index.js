"use client"

import * as React from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { DayPicker } from "react-day-picker"

import { cn } from "../../../lib/utils"
import { buttonVariants } from "../button"

function Calendar({ className, classNames, disabled = {}, showOutsideDays = true, ...props }) {
	return (
		<DayPicker
			weekStartsOn={1}
			showOutsideDays={showOutsideDays}
			className={cn("p-3", className)}
			classNames={{
				month: "space-y-4",
				month_caption: "flex justify-center pt-1 relative items-center",
				caption_label: "text-sm font-medium",
				button_previous: cn(
					buttonVariants({ variant: "outline" }),
					"h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100 absolute left-4 z-10"
				),
				button_next: cn(
					buttonVariants({ variant: "outline" }),
					"h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100 absolute right-4 z-10"
				),
				weeks: "w-full border-collapse space-y-1",
				weekdays: "flex space-x-2 w-full justify-between",
				weekday: "text-gray-700 font-thin w-full",
				head_cell:
					"text-muted-foreground rounded-md w-8 font-normal text-[0.8rem]",
				week: "flex w-full mt-2",
				cell: cn(
					"relative p-0 text-center text-sm focus-within:relative focus-within:z-20 [&:has([aria-selected])]:bg-accent [&:has([aria-selected].day-outside)]:bg-accent/50 [&:has([aria-selected].day-range-end)]:rounded-r-md",
					props.mode === "range"
						? "[&:has(>.day-range-end)]:rounded-r-md [&:has(>.day-range-start)]:rounded-l-md first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md"
						: "[&:has([aria-selected])]:rounded-md"
				),
				focused: "bg-primary text-primary-foreground",
				day: cn(
					buttonVariants({ variant: "ghost" }),
					"h-8 w-8 p-0 font-normal aria-selected:opacity-100"
				),
				range_start: "day-range-start",
				range_end: "day-range-end",
				selected:
					"bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground",
				today: "bg-accent text-accent-foreground",
				outside:
					"text-muted-foreground opacity-50 aria-selected:bg-accent/50 aria-selected:text-gray-500",
				disabled: "text-muted-foreground opacity-50",
				day_range_middle:
					"aria-selected:bg-accent aria-selected:text-accent-foreground",
				hidden: "invisible",
				...classNames,
			}}
			disabled={disabled}
			components={{
				IconLeft: ({ className, ...props }) => (
					<ChevronLeft className={cn("h-4 w-4", className)} {...props} />
				),
				IconRight: ({ className, ...props }) => (
					<ChevronRight className={cn("h-4 w-4", className)} {...props} />
				),
			}}
			{...props}
		/>
	)
}
Calendar.displayName = "Calendar"

export { Calendar }
