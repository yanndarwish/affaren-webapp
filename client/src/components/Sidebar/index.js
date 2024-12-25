import { LogOut } from "lucide-react"
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
import { useConfig } from "../../lib/hooks/useConfig"

export function AppSidebar() {
	const { open, setActiveItem } = useSidebar()
	const location = useLocation()
	const modalLogout = useModal()
	const { config } = useConfig()

	const isActive = (url) => {
		return location.pathname === `/${url}`
	}

	const handleClickLogout = () => {
		modalLogout.openModal()
	}

	useEffect(() => {
		setActiveItem(config.modules.find((item) => isActive(item.url)))
	}, [location.pathname])

	return (
		<Sidebar collapsible="icon">
			<SidebarHeader />
			<SidebarContent>
				<SidebarGroup>
					{/* <SidebarGroupLabel>Application</SidebarGroupLabel> */}
					<SidebarGroupContent>
						<SidebarMenu>
							{config.modules.map((module) => (
								<SidebarMenuItem key={module.name} className="h-10">
									<SidebarMenuButton asChild isActive={isActive(module.url)}>
										<a href={module.url}>
											<module.icon />
											<span>{module.label}</span>
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
					<span>Logout</span>
				</SidebarMenuButton>
			</SidebarFooter>
			<ModalLogout controller={modalLogout} />
		</Sidebar>
	)
}
