import { useEffect, useState } from "react"
import Box from "@mui/material/Box"

import { Outlet, useNavigate } from "react-router-dom"
import { Grid } from "../../assets/common/common.styles"
import Sidebar from "../Sidebar/Sidebar"
import { useDailyTotal } from "../../lib/providers/dailyTotal"
import { formatDailyTotals } from "../../lib/sales"
import { useSession } from "../../lib/hooks/useSession"
import { useQuery } from "../../lib/hooks/useQuery"
import { getDaySales } from "../../lib/api"

const Root = () => {
	const navigate = useNavigate()
	const [open, setOpen] = useState(false)
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
		if (!isLoggedIn) {
			navigate("/login")
		} else {
			queryGetDaySales.send({
				year: new Date().getFullYear(),
				month: new Date().getMonth() + 1,
				day: new Date().getDate(),
			})
		}
	}, [isLoggedIn])

	return (
		<Grid>
			<Sidebar open={open} setOpen={setOpen}>
				<Outlet />
			</Sidebar>
		</Grid>
	)
}

export default Root
