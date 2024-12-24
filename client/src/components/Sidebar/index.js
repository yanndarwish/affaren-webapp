import {
	Home,
	ChartSpline,
	Box,
	User,
	List,
	KeyRound,
	LogOut,
} from "lucide-react"
import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarGroup,
	SidebarGroupContent,
	SidebarHeader,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
	useSidebar,
} from "../ui/sidebar"
import { ModalLogout } from "../Cards/ModalLogout/ModalLogout"
import { useLocation } from "react-router-dom"
import { useEffect } from "react"
import { useModal } from "../shared/modal"

export const items = [
	{
		title: "Point of sale",
		url: "pos",
		icon: Home,
	},
	{
		title: "Sales",
		url: "sales",
		icon: List,
	},
	{
		title: "Dashboard",
		url: "dashboard",
		icon: ChartSpline,
	},
	{
		title: "Inventory",
		url: "inventory",
		icon: Box,
	},
	{
		title: "Profile",
		url: "profile",
		icon: User,
	},
	{
		title: "Closing",
		url: "closing",
		icon: KeyRound,
	},
]

export function AppSidebar() {
	const { open, setActiveItem } = useSidebar()
	const location = useLocation()
	const modalLogout = useModal()

	const isActive = (url) => {
		return location.pathname === `/${url}`
	}

	const handleClickLogout = () => {
		modalLogout.openModal()
	}

	useEffect(() => {
		setActiveItem(items.find((item) => isActive(item.url)))
	}, [location.pathname])

	return (
		<Sidebar collapsible="icon">
			<SidebarHeader />
			<SidebarContent>
				<SidebarGroup>
					{/* <SidebarGroupLabel>Application</SidebarGroupLabel> */}
					<SidebarGroupContent>
						<SidebarMenu>
							{items.map((item) => (
								<SidebarMenuItem key={item.title} className="h-10">
									<SidebarMenuButton asChild isActive={isActive(item.url)}>
										<a href={item.url}>
											<item.icon />
											<span>{item.title}</span>
										</a>
									</SidebarMenuButton>
								</SidebarMenuItem>
							))}
						</SidebarMenu>
					</SidebarGroupContent>
				</SidebarGroup>
			</SidebarContent>
			<SidebarFooter className="pb-4">
				<SidebarMenuButton
					variant="destructive"
					className="w-full"
					onClick={handleClickLogout}
				>
					<LogOut />
					{open && <span>Logout</span>}
				</SidebarMenuButton>
			</SidebarFooter>
			<ModalLogout controller={modalLogout} />
		</Sidebar>
	)
}
