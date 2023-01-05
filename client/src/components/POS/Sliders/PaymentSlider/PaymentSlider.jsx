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
import {
	ArtTitle,
	ErrorMessage,
	SubTitle,
} from "../../../../assets/styles/common.styles"
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined"
import EuroSymbolOutlinedIcon from "@mui/icons-material/EuroSymbolOutlined"
import CreditCardOutlinedIcon from "@mui/icons-material/CreditCardOutlined"
import SellOutlinedIcon from "@mui/icons-material/SellOutlined"
import Button from "../../../common/Button/Button.component"
import NumPad from "../../../common/NumPad/NumPad"
import { useSelector, useDispatch } from "react-redux"
import {
	setSalePaymentMethods,
	setSaleDate,
	resetSale,
	setUser,
} from "../../../../redux/features/sale"
import {
	usePostSaleProductsMutation,
	usePostSaleMutation,
} from "../../../../redux/services/salesApi"
import { useUpdateProductsMutation } from "../../../../redux/services/productsApi"
import { Modal } from "modal-rjs"

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
	const [modalIsOpen, setModalIsOpen] = useState(false)
	const sale = useSelector((state) => state.sale)
	const user = useSelector((state) => state.user.user)

	const [updateProduct, res] = useUpdateProductsMutation()
	const [postSaleProducts, resp] = usePostSaleProductsMutation()
	const [postSale, response] = usePostSaleMutation()

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
		let leftToPay = parseFloat(leftPaying)

		setLeftPaying(parseFloat(leftToPay) - parseFloat(paying))

		if (
			parseFloat(leftToPay) === parseFloat(paying) ||
			(parseFloat(leftToPay) !== 0 && parseFloat(paying) > parseFloat(leftToPay))
		) {
			let salePaymentMethods = {
				...sale.paymentMethods,
				[paymentMethod]: parseFloat(paying > leftPaying ? leftPaying : paying),
			}

			const timestamp = new Date()

			const day = timestamp.getDate()
			const month = timestamp.getMonth() + 1
			const year = timestamp.getFullYear()

			const date = day + "-" + month + "-" + year

			let confirmedSale = {
				...sale,
				year: year,
				month: month,
				day: day,
				paymentMethods: salePaymentMethods,
			}

			dispatch(setSalePaymentMethods({ paymentMethods: salePaymentMethods }))
			dispatch(setSaleDate({ date: date }))
			// pay

			// display how much ot give back
			if (leftToPay !== 0 && paying > leftToPay && value === 0) {
				setGiveBack((paying - leftToPay).toFixed(2))
			}
			setPaying(leftToPay)

			postSale({ sale: confirmedSale })
			// update inventory for each products
			// if id is an int
			sale.products.forEach((product) => {
				if (typeof product.id === "number") {
					updateProduct({ quantity: product.quantity, id: product.id })
				}
			})

			// post sale

			// post sales_products

			// open success payment modal
			setModalIsOpen(true)

			postSaleProducts({
				products: sale.products,
				year: year,
				month: month,
				id: parseInt(confirmedSale.id),
			})
			// print ticket button in modal

			// reset sale
			dispatch(resetSale())
			dispatch(setUser({ user: user.user_first_name }))
		} else if (
			parseFloat(leftToPay) !== 0 &&
			parseFloat(paying) < parseFloat(leftToPay)
		) {
			// split
			// set what is left to pay
			setPaying(parseFloat((sale.amount - paying).toFixed(2)))
			let salePaymentMethods = {
				...sale.paymentMethods,
				[paymentMethod]: parseFloat(paying > leftPaying ? leftPaying : paying),
			}

			dispatch(setSalePaymentMethods({ paymentMethods: salePaymentMethods }))
		}
		leftToPay = (parseFloat(leftPaying) - parseFloat(paying)).toFixed(2)
	}

	const ModalBody = () => {
		if (giveBack) {
			return (
				<>
					<ArtTitle>Give Back {giveBack}€</ArtTitle>
				</>
			)
		}
	}

	const ModalFooter = () => {
		return (
			<>
				<Button title="Print Ticket" onClick={closeModals} />
			</>
		)
	}

	const closeModals = () => {
		setModalIsOpen(false)
		if (!res.isError && !resp.isError && !response.isError) {
			setIsOpen(false)
		}
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
						{res.isError && (
							<ErrorMessage>Failed to update Products quantity</ErrorMessage>
						)}
						{resp.isError && (
							<ErrorMessage>Failed to add products to sale</ErrorMessage>
						)}
						{response.isError && (
							<ErrorMessage>Failed to create sale</ErrorMessage>
						)}
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
			<Modal
				isOpen={modalIsOpen}
				setIsOpen={setModalIsOpen}
				title="Sale Confirmed"
				bodyContent={<ModalBody />}
				footerContent={<ModalFooter />}
			/>
		</Overlay>
	) : null
}

export default Slider
