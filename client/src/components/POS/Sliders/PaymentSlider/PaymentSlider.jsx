import { useRef, useState, useEffect } from "react"
import {
	Dialog,
	DialogBody,
	DialogCard,
	DialogFooter,
	DialogHeader,
	Overlay,
} from "../Slider.styles"
import Tabs from "@mui/material/Tabs"
import Tab from "@mui/material/Tab"
import Box from "@mui/material/Box"
import { ArtTitle, SubTitle } from "../../../../assets/styles/common.styles"
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined"
import EuroSymbolOutlinedIcon from "@mui/icons-material/EuroSymbolOutlined"
import CreditCardOutlinedIcon from "@mui/icons-material/CreditCardOutlined"
import SellOutlinedIcon from "@mui/icons-material/SellOutlined"
import Button from "../../../common/Button/Button.component"
import NumPad from "../../../common/NumPad/NumPad"
import { useSelector, useDispatch } from "react-redux"
import { setSalePaymentMethods } from "../../../../redux/features/sale"

function TabPanel(props) {
	const { children, value, index, ...other } = props

	return (
		<div
			role="tabpanel"
			hidden={value !== index}
			id={`simple-tabpanel-${index}`}
			aria-labelledby={`simple-tab-${index}`}
			{...other}
		>
			{value === index && (
				<Box sx={{ p: 3 }}>
					<Box>{children}</Box>
				</Box>
			)}
		</div>
	)
}

function a11yProps(index) {
	return {
		id: `simple-tab-${index}`,
		"aria-controls": `simple-tabpanel-${index}`,
	}
}

const Slider = ({ theme, isOpen, setIsOpen }) => {
	const overlayRef = useRef()
	const dispatch = useDispatch()
	const [value, setValue] = useState(0)
	const [paying, setPaying] = useState("")
	const [leftPaying, setLeftPaying] = useState("")
	const [giveBack, setGiveBack] = useState(0)
	const sale = useSelector((state) => state.sale)

	const handleChange = (event, newValue) => {
		setValue(newValue)
	}

	const closeSlider = (e) => {
		if (overlayRef.current === e.target) {
			setIsOpen(false)
		}
	}

	const handlePayment = () => {
		let paymentMethod = value === 0 ? "cash" : value === 1 ? "card" : "check"
		let leftToPay = (leftPaying - paying).toFixed(2)
		setLeftPaying(leftToPay)

		console.log(parseFloat(paying))
		console.log(parseFloat(leftToPay))

		if (
			parseFloat(leftToPay) === 0 ||
			(leftToPay !== 0 && paying > leftToPay && value === 0)
		) {
			// pay
			console.log("pay")
			// display how much ot give back
			if (leftToPay !== 0 && paying > leftToPay && value === 0) {
				setGiveBack(Math.abs(leftToPay))
			} 
				setPaying(leftToPay)

			// update inventory for each products

			// post sales_products

			// post sale

			// open success payment modal

			// print ticket button in modal

			// Close payment slider
		} else if (
			parseFloat(leftToPay) !== 0 &&
			parseFloat(paying) < parseFloat(leftToPay)
		) {
			// split
			console.log("split")
			// set what is left to pay
			setPaying((sale.amount - paying).toFixed(2))
		} else {
			return
		}

		let salePaymentMethods = {
			...sale.paymentMethods,
			[paymentMethod]: parseFloat(paying > leftPaying ? leftPaying : paying),
		}
		console.log(salePaymentMethods)
		dispatch(setSalePaymentMethods({ paymentMethods: salePaymentMethods }))
	}

	useEffect(() => {
		setPaying(sale.amount)
		setLeftPaying(sale.amount)
	}, [sale.amount])

	return isOpen ? (
		<Overlay theme={theme} onClick={closeSlider} ref={overlayRef}>
			<Dialog id="dialog" theme={theme}>
				<DialogHeader>
					<SubTitle>Payment</SubTitle>
					<CloseOutlinedIcon onClick={() => setIsOpen(false)} />
				</DialogHeader>
				<DialogBody>
					<ArtTitle>Payment Method</ArtTitle>
					<DialogCard theme={theme}>
						<Box sx={{ borderBottom: 1, borderColor: "divider" }}>
							<Tabs
								value={value}
								onChange={handleChange}
								variant="fullWidth"
								aria-label="basic tabs example"
							>
								<Tab label={<EuroSymbolOutlinedIcon />} {...a11yProps(0)} />
								<Tab label={<CreditCardOutlinedIcon />} {...a11yProps(1)} />
								<Tab label={<SellOutlinedIcon />} {...a11yProps(2)} />
							</Tabs>
						</Box>
						<TabPanel value={value} index={0}>
							<NumPad display value={paying} setValue={setPaying} unit="€" />
							<EuroSymbolOutlinedIcon />
						</TabPanel>
						<TabPanel value={value} index={1}>
							<NumPad display value={paying} setValue={setPaying} unit="€" />
							<CreditCardOutlinedIcon />
						</TabPanel>
						<TabPanel value={value} index={2}>
							<NumPad display value={paying} setValue={setPaying} unit="€" />
							<SellOutlinedIcon />
						</TabPanel>
					</DialogCard>
				</DialogBody>
				<DialogFooter>
					<Button
						title="Confirm Payment"
						color="success"
						onClick={handlePayment}
					/>
				</DialogFooter>
			</Dialog>
		</Overlay>
	) : null
}

export default Slider
