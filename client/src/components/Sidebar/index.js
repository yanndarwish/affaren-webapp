import {  LogOut, Settings, Store } from "lucide-react"
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
	const { setActiveItem } = useSidebar()
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
			<SidebarHeader>
				<SidebarMenu>
					<SidebarMenuItem>
						<SidebarMenuButton
							size="lg"
							className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
						>
							<div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
								<Store className="size-4" />
							</div>
							<div className="grid flex-1 text-left text-sm leading-tight">
								<span className="truncate font-semibold">Affären</span>
								<span className="truncate text-xs">Paris</span>
							</div>
						</SidebarMenuButton>
					</SidebarMenuItem>
				</SidebarMenu>
			</SidebarHeader>
			<SidebarContent>
				<SidebarGroup>
					{/* <SidebarGroupLabel>Application</SidebarGroupLabel> */}
					<SidebarGroupContent>
						<SidebarMenu>
							{config.modules.map((module) => {
								if (!module.active) return null
								return (
									<SidebarMenuItem key={module.name} className="h-10">
										<SidebarMenuButton asChild isActive={isActive(module.url)}>
											<a href={module.url}>
												<module.icon />
												<span>{module.label}</span>
											</a>
										</SidebarMenuButton>
									</SidebarMenuItem>
								)
							})}
						</SidebarMenu>
					</SidebarGroupContent>
				</SidebarGroup>
			</SidebarContent>
			<SidebarFooter className="pb-4">
				<SidebarMenu>
					<SidebarMenuItem className="h-10">
						<SidebarMenuButton asChild isActive={isActive("settings")}>
							<a href={"/settings"}>
								<Settings />
								<span>Settings</span>
							</a>
						</SidebarMenuButton>
					</SidebarMenuItem>
					<SidebarMenuItem className="h-10">
						<SidebarMenuButton
							variant="destructive"
							className="w-full"
							onClick={handleClickLogout}
						>
							<LogOut />
							<span>Logout</span>
						</SidebarMenuButton>
					</SidebarMenuItem>
				</SidebarMenu>
			</SidebarFooter>
			<ModalLogout controller={modalLogout} />
		</Sidebar>
	)
}
