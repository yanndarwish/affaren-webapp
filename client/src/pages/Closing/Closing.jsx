import React, { useState } from "react"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import {
	ColumnCenter,
	ErrorMessage,
	Gap,
	PrimaryText,
	SpaceHeader,
	SubTitle,
	Title,
	Container,
	ArtTitle,
	SecondaryText,
	Column,
} from "../../assets/common/common.styles"
import Button from "../../components/common/Button/Button.component"
import { setDetailArray, setFullArray } from "../../redux/features/dashboard"
import {
	usePostDrawerMutation,
	usePostPrintCashMutation,
} from "../../redux/services/printApi"
import { useGetMonthSalesQuery } from "../../redux/services/salesApi"
import {
	setTodayCard,
	setTodayCash,
	setTodayCheck,
} from "../../redux/features/day"

const Closing = () => {
	const navigate = useNavigate()
	const dispatch = useDispatch()
	const [skip, setSkip] = useState(true)
	const loggedIn = useSelector((state) => state.login.loggedIn)
	const cash = useSelector((state) => state.day.cash)
	const dashboard = useSelector((state) => state.dashboard)
	const todayCash = useSelector((state) => state.day.todayCash)
	const todayCard = useSelector((state) => state.day.todayCard)
	const todayCheck = useSelector((state) => state.day.todayCheck)
	const user = useSelector((state) => state.user.user)
	const theme = useSelector((state) => state.theme.theme)
	const [month, setMonth] = useState("")
	const [year, setYear] = useState("")
	const { data, error, isLoading } = useGetMonthSalesQuery(
		{
			month: month,
			year: year,
		},
		{ skip }
	)

	const setDate = () => {
		const timestamp = new Date()
		const month = timestamp.getMonth() + 1
		const year = timestamp.getFullYear()
		setYear(year)
		setMonth(month)
	}

	const storeFullArrayInState = (data) => {
		dispatch(setFullArray({ fullArray: data }))
	}

	const [printCash, re] = usePostPrintCashMutation()
	const [postDrawer, res] = usePostDrawerMutation()

	const printTicket = () => {
		printCash({ user: user.user_first_name })
	}

	const openDrawer = () => {
		postDrawer()
	}

	const formatData = (data) => {
		const timestamp = new Date()
		const today = timestamp.getDate()

		let days = []
		let detail = []

		data?.forEach((item) => {
			if (!days.includes(item.sale_day)) {
				days.push(item.sale_day)
				let day = {
					day: item.sale_day,
					alimentation: item.sale_taxes.total1
						? parseFloat(item.sale_taxes.total1)
						: 0,
					magazine: item.sale_taxes.total2
						? parseFloat(item.sale_taxes["total2"])
						: 0,
					decoAlcool: item.sale_taxes.total3
						? parseFloat(item.sale_taxes.total3)
						: 0,
					htAlimentation: item.sale_taxes.ht1
						? parseFloat(item.sale_taxes.ht1)
						: 0,
					htMagazine: item.sale_taxes.ht2 ? parseFloat(item.sale_taxes.ht2) : 0,
					htDecoAlcool: item.sale_taxes.ht3
						? parseFloat(item.sale_taxes.ht3)
						: 0,
					tvaAlimentation: item.sale_taxes.tva1
						? parseFloat(item.sale_taxes.tva1)
						: 0,
					tvaMagazine: item.sale_taxes.tva2
						? parseFloat(item.sale_taxes.tva2)
						: 0,
					tvaDecoAlcool: item.sale_taxes.tva3
						? parseFloat(item.sale_taxes.tva3)
						: 0,
					totalHt: item.sale_taxes.totalHt
						? parseFloat(item.sale_taxes.totalHt)
						: 0,
					totalTva: item.sale_taxes.totalTva
						? parseFloat(item.sale_taxes.totalTva)
						: 0,
					cash: item.sale_payment_methods.cash
						? parseFloat(item.sale_payment_methods.cash)
						: 0,
					carte: item.sale_payment_methods.card
						? parseFloat(item.sale_payment_methods.card)
						: 0,
					cheque: item.sale_payment_methods.check
						? parseFloat(item.sale_payment_methods.check)
						: 0,
					total: item.sale_amount ? parseFloat(item.sale_amount) : 0,
				}
				detail.push(day)
			} else {
				let index = detail.findIndex((det) => det.day === item.sale_day)

				detail[index].alimentation += item.sale_taxes.total1
					? parseFloat(item.sale_taxes.total1)
					: 0
				detail[index].magazine += item.sale_taxes.total2
					? parseFloat(item.sale_taxes["total2"])
					: 0
				detail[index].decoAlcool += item.sale_taxes.total3
					? parseFloat(item.sale_taxes.total3)
					: 0
				detail[index].htAlimentation += item.sale_taxes.ht1
					? parseFloat(item.sale_taxes.ht1)
					: 0
				detail[index].htMagazine += item.sale_taxes.ht2
					? parseFloat(item.sale_taxes.ht2)
					: 0
				detail[index].htDecoAlcool += item.sale_taxes.ht3
					? parseFloat(item.sale_taxes.ht3)
					: 0
				detail[index].tvaAlimentation += item.sale_taxes.tva1
					? parseFloat(item.sale_taxes.tva1)
					: 0
				detail[index].tvaMagazine += item.sale_taxes.tva2
					? parseFloat(item.sale_taxes.tva2)
					: 0
				detail[index].tvaDecoAlcool += item.sale_taxes.tva3
					? parseFloat(item.sale_taxes.tva3)
					: 0
				detail[index].totalHt += item.sale_taxes.totalHt
					? parseFloat(item.sale_taxes.totalHt)
					: 0
				detail[index].totalTva += item.sale_taxes.totalTva
					? parseFloat(item.sale_taxes.totalTva)
					: 0
				detail[index].cash += item.sale_payment_methods.cash
					? parseFloat(item.sale_payment_methods.cash)
					: 0
				detail[index].carte += item.sale_payment_methods.card
					? parseFloat(item.sale_payment_methods.card)
					: 0
				detail[index].cheque += item.sale_payment_methods.check
					? parseFloat(item.sale_payment_methods.check)
					: 0
				detail[index].total += item.sale_amount
					? parseFloat(item.sale_amount)
					: 0
			}

			if (item.sale_day === today) {
				let todayDetail = detail.find((item) => item.day === today)
				dispatch(setTodayCash({ cash: parseFloat(todayDetail.cash) }))
				dispatch(setTodayCard({ card: parseFloat(todayDetail.carte) }))
				dispatch(setTodayCheck({ check: parseFloat(todayDetail.cheque) }))
			}
		})
		detail = detail.sort((a, b) => a.day - b.day)
		dispatch(setDetailArray({ detailArray: detail }))
	}

	const redirect = (destination) => {
		if (destination === "logout") {
			navigate("/logout")
		} 
		!loggedIn && navigate("/login")
	}

	useEffect(() => {
		if (month && year) {
			setSkip(false)
		}
	}, [month, year])

	useEffect(() => {
		storeFullArrayInState(data)
	}, [data])

	useEffect(() => {
		formatData(dashboard.fullArray)
	}, [dashboard.fullArray])

	useEffect(() => {
		redirect()
		setDate()
	}, [])
	return (
		<Container theme={theme}>
			<SpaceHeader>
				<Title>Closing</Title>
			</SpaceHeader>
			<ColumnCenter>
				<SubTitle>1 - Check card revenue</SubTitle>
				<Column>
					<ArtTitle>You made {parseFloat(todayCard).toFixed(2)}€ in card today</ArtTitle>

					<PrimaryText>
						On the card terminal, print the days tickets
					</PrimaryText>
					<SecondaryText>
						Grey button, then "Param", then select the 2 "CB EMV", then press 1
						for "Consultation"
					</SecondaryText>
					<SecondaryText>
						Repeat for number 3 "CB CLESS", 4 "AMEX CONTACT", and 5 "AX QUICK
						PAY"
					</SecondaryText>
					<PrimaryText>
						Once you have the tickets, add the totals together to get today's
						Total Card Revenue
					</PrimaryText>
					<PrimaryText>
						Now, make sure this number matches with the card amount above.
					</PrimaryText>
				</Column>
				<SubTitle>2 - Count the cash</SubTitle>
				<Column>
					<PrimaryText>
						You already had {parseFloat(cash).toFixed(2)}€ in the drawer this morning
					</PrimaryText>
					<PrimaryText>You made {parseFloat(todayCash).toFixed(2)}€ in cash today</PrimaryText>
					{todayCheck !== 0 && (
						<ArtTitle>You made {parseFloat(todayCheck).toFixed(2)}€ in check today</ArtTitle>
					)}
					<ArtTitle>
						So now, you should have {parseFloat(cash + todayCash).toFixed(2)}€
						in the drawer
					</ArtTitle>
					<PrimaryText>Print the ticket and fill in the details</PrimaryText>
					<Gap>
						<Button title="PRINT TICKET" onClick={() => printTicket()} />
					</Gap>
					{res.isError && !res.isSuccess && (
						<ErrorMessage>
							Failed to open drawer, make sure the printer is turned on
						</ErrorMessage>
					)}
					<PrimaryText>Once filled, put the ticket in the drawer</PrimaryText>
					<Gap>
						<Button title="OPEN DRAWER" onClick={() => openDrawer()} />
					</Gap>
				</Column>
				<SubTitle>3 - Turn off everything</SubTitle>
				<Column>
					<PrimaryText>
						Now you can turn off everything: the ticket printer, the keyboard,
						and the speaker.
					</PrimaryText>
					<PrimaryText>
						You can turn off the iPad after you log out.
					</PrimaryText>
					<Button
						title="LOGOUT"
						color="success"
						onClick={() => redirect("logout")}
					/>
				</Column>
			</ColumnCenter>
		</Container>
	)
}

export default Closing
