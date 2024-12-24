import { useEffect, useState } from "react"

import {
	SidebarInset,
	SidebarProvider,
	SidebarTrigger,
	useSidebar,
} from "../ui/sidebar"
import { AppSidebar } from "../Sidebar"

import { Outlet, useNavigate } from "react-router-dom"
import { Grid } from "../../assets/common/common.styles"
// import Sidebar from "../Sidebar/Sidebar"
import { useDailyTotal } from "../../lib/providers/dailyTotal"
import { formatDailyTotals } from "../../lib/sales"
import { useSession } from "../../lib/hooks/useSession"
import { useQuery } from "../../lib/hooks/useQuery"
import { getDaySales } from "../../lib/api"
import { useLocation } from "react-router-dom"
import { Separator } from "../ui/separator"
import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbPage,
	BreadcrumbSeparator,
} from "../ui/breadcrumb"
import { AppHeader } from "../Sidebar/appHeader"

const Root = () => {
	const navigate = useNavigate()
	const { isLoggedIn } = useSession()
	const { setCash, setCredit, setCheck, setTotal } = useDailyTotal()
	const location = useLocation()

	const queryGetDaySales = useQuery({
		queryFn: getDaySales,
		onSuccess: (data) => {
			const dailyTotals = formatDailyTotals(data)

			setCash(dailyTotals.cash)
			setCredit(dailyTotals.card)
			setCheck(dailyTotals.check)
			setTotal(dailyTotals.total)
		},
		onError: (error) => {
			console.log(error)
		},
	})

	useEffect(() => {
		if (
			!isLoggedIn &&
			location.pathname !== "/login" &&
			location.pathname !== "/forgot-password"
		) {
			navigate("/login")
		} else if (isLoggedIn) {
			queryGetDaySales.send({
				year: new Date().getFullYear(),
				month: new Date().getMonth() + 1,
				day: new Date().getDate(),
			})
		}
	}, [isLoggedIn])

	return isLoggedIn ? (
		<SidebarProvider>
			<AppSidebar />
			<SidebarInset>
				<AppHeader />
				<div className="flex flex-1 flex-col gap-4 p-4 pt-0">
					<Outlet />
				</div>
			</SidebarInset>
		</SidebarProvider>
	) : (
		<Outlet />
	)
}

export default Root
