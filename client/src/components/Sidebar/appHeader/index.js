import { Stack } from "@mui/material"
import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbPage,
	BreadcrumbSeparator,
} from "../../ui/breadcrumb"
import { Separator } from "../../ui/separator"
import { SidebarTrigger, useSidebar } from "../../ui/sidebar"
import { DailyTotal } from "../dailyTotal"

export const AppHeader = () => {
	const { activeItem } = useSidebar()

	return (
		<header className="flex h-16 w-full shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
			<Stack
				direction="row"
				justifyContent="space-between"
				alignItems="center"
				className="w-full"
			>
				<div className="flex items-center gap-2 px-4 w-full">
					<SidebarTrigger className="-ml-1" />
					<Separator orientation="vertical" className="mr-2 h-4" />
					<Breadcrumb>
						<BreadcrumbList>
							<BreadcrumbItem className="hidden md:block">
								<BreadcrumbLink href={activeItem?.url}>{activeItem?.title}</BreadcrumbLink>
							</BreadcrumbItem>
							<BreadcrumbSeparator className="hidden md:block" />
							<BreadcrumbItem>
								<BreadcrumbPage></BreadcrumbPage>
							</BreadcrumbItem>
						</BreadcrumbList>
					</Breadcrumb>
				</div>
				<DailyTotal />
			</Stack>
		</header>
	)
}
