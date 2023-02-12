import Button from "../../components/common/Button/Button.component"
import { TextField } from "@mui/material"
import { useEffect, useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import { setCash } from "../../redux/features/day"
import {
	ColumnCenter,
	Container,
	ErrorMessage,
	Gap,
	PrimaryText,
	SpaceHeader,
	SubTitle,
	Title,
} from "../../assets/common/common.styles"
import { usePostDrawerMutation } from "../../redux/services/printApi"

const Opening = () => {
	const dispatch = useDispatch()
	const navigate = useNavigate()
	const theme = useSelector((state) => state.theme.theme)
	const loggedIn = useSelector((state) => state.login.loggedIn)
	const cash = useSelector((state) => state.day.cash)
	const [cashInput, setCashInput] = useState(0)
	const [required, setRequired] = useState(false)
	const [postDrawer, res] = usePostDrawerMutation()

	console.log(cash)

	const printTicket = () => {
		console.log("print ticket")
	}

	const handleOpen = () => {
		if (cashInput !== 0) {
			setRequired(false)
			dispatch(setCash({ cash: parseFloat(cashInput) }))
		} else {
			setRequired(true)
		}
	}

	const openDrawer = () => {
		postDrawer()
	}

	const redirect = (destination) => {
		if (destination === "pos") {
			navigate("/pos")
		}
		!loggedIn && navigate("/login")
	}

	useEffect(() => {
		if (cash !== 0) {
			redirect("pos")
		}
	}, [cash])

	useEffect(() => {
		redirect()
	}, [])

	return (
		<Container theme={theme}>
			<SpaceHeader>
				<Title>Opening</Title>
				<Button title="SKIP" onClick={() => redirect("pos")} />
			</SpaceHeader>
			<ColumnCenter>
				<ColumnCenter>
					<SubTitle>1 - Count the cash</SubTitle>
					<PrimaryText>Print the ticket and fill in the details</PrimaryText>
					<Gap>
						<Button title="PRINT TICKET" onClick={() => printTicket()} />
						<Button title="OPEN DRAWER" onClick={() => openDrawer()} />
					</Gap>
					{res.isError && !res.isSuccess && (
						<ErrorMessage>
							Failed to open drawer, make sure the printer is turned on
						</ErrorMessage>
					)}
					<PrimaryText>Enter the total Cash amount</PrimaryText>
					<TextField
						type="number"
						placeholder="Enter cash total"
						value={cashInput}
						onChange={(e) => setCashInput(e.target.value)}
					/>
					{required && <ErrorMessage>Cash total is required</ErrorMessage>}
					<PrimaryText>Once filled, put the ticket in the drawer</PrimaryText>
				</ColumnCenter>
				<ColumnCenter>
					<SubTitle>2 - Turn on everything</SubTitle>
					<PrimaryText>
						Make sure everything is on: the ticket printer, the keyboard.
					</PrimaryText>
					<PrimaryText>Turn on the speaker and put some music</PrimaryText>
				</ColumnCenter>
				<Button title="OPEN" onClick={() => handleOpen()} color="success" />
			</ColumnCenter>
		</Container>
	)
}

export default Opening
