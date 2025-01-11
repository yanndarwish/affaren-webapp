import { Calendar } from "../../components/calendar"
import {
	FixedContainer,
	PageContainer,
} from "../../components/shared/containers"

export default function CalendarPage() {
	return (
		<PageContainer className="grid gap-4 md:grid-cols-12 grid-rows-1 h-full">
			<FixedContainer className="col-span-12 ">
				<Calendar />
			</FixedContainer>
		</PageContainer>
	)
}
