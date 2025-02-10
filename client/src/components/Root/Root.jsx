import { useEffect } from "react"
import { Outlet } from "react-router-dom"

import { AppSidebar } from "../sidebar"
import { AppHeader } from "../app-header"
import { SidebarInset, SidebarProvider } from "../ui/sidebar"

import { getDaySales } from "../../lib/api"
import { useQuery } from "../../lib/hooks/useQuery"
import { formatDailyTotals } from "../../lib/sales"
import { useSession } from "../../lib/hooks/useSession"
import { useDailyTotal } from "../../lib/providers/dailyTotal"

const Root = () => {
	const { isLoggedIn } = useSession()
	const { setCash, setCredit, setCheck, setTotal } = useDailyTotal()

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
		if (isLoggedIn) {
			queryGetDaySales.send({
				year: new Date().getFullYear(),
				month: new Date().getMonth() + 1,
				day: new Date().getDate(),
			})
		}
	}, [isLoggedIn])

	return (
		<SidebarProvider>
			{isLoggedIn ? (
				<>
					<AppSidebar />
					<SidebarInset>
						<AppHeader />
						<div className="flex flex-1 flex-col gap-4 p-4 pt-0">
							<Outlet />
						</div>
					</SidebarInset>
				</>
			) : (
				<div className="flex flex-1 flex-col gap-4 p-4">
					<Outlet />
				</div>
			)}
		</SidebarProvider>
	)
}

export default Root
