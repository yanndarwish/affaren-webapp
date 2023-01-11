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
	ColumnCenter,
	ErrorMessage,
	SpaceHeader,
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
import { usePostPrintMutation } from "../../../../redux/services/printApi"
import { usePostDrawerMutation } from "../../../../redux/services/printApi"
import { Modal } from "modal-rjs"
import InfoMessage from "../../../common/InfoMessage/InfoMessage"

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

const TableSlider = ({ theme, isOpen, setIsOpen }) => {
	const overlayRef = useRef()
	const dispatch = useDispatch()
	const [value, setValue] = useState(0)
	const [paying, setPaying] = useState("")
	const [leftPaying, setLeftPaying] = useState("")
	const [giveBack, setGiveBack] = useState(0)
	const [modalIsOpen, setModalIsOpen] = useState(false)
	const [actualSale, setActualSale] = useState({})
	const sale = useSelector((state) => state.sale)
	const user = useSelector((state) => state.user.user)

	const [updateProduct, res] = useUpdateProductsMutation()
	const [postSaleProducts, resp] = usePostSaleProductsMutation()
	const [postSale, response] = usePostSaleMutation()
	const [print, respo] = usePostPrintMutation()
	const [postDrawer, re] = usePostDrawerMutation()

	const handleChange = (event, newValue) => {
		setValue(newValue)
	}

	const closeSlider = (e) => {
		if (overlayRef.current === e.target) {
			setIsOpen(false)
			if (respo.status === "rejected") {
				respo.reset()
				re.reset()
			}
		}
	}

	const updateTable = () => {
		console.log('update table')
	}

	return isOpen ? (
		<Overlay theme={theme} onClick={closeSlider} ref={overlayRef}>
			<Dialog id="dialog" theme={theme}>
				<DialogHeader>
					<SubTitle>Table</SubTitle>
					<CloseOutlinedIcon onClick={() => setIsOpen(false)} />
				</DialogHeader>
				<DialogBody>
					<ArtTitle>Detail</ArtTitle>
					<DialogCard theme={theme}>
						<Box sx={{ flexGrow: 1, bgcolor: 'background.paper', display: 'flex', height: 224, borderBottom: 1, borderColor: "divider" }}>
							<Tabs
							orientation="vertical"
								value={value}
								onChange={handleChange}
								variant="scrollable"
								aria-label="basic tabs example"
							>
								<Tab label={<EuroSymbolOutlinedIcon />} {...a11yProps(0)} />
								<Tab label={<CreditCardOutlinedIcon />} {...a11yProps(1)} />
								<Tab label={<SellOutlinedIcon />} {...a11yProps(2)} />
							</Tabs>
						</Box>
						<TabPanel value={value} index={0}>
						</TabPanel>
						<TabPanel value={value} index={1}>
						</TabPanel>
						<TabPanel value={value} index={2}>
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
						title="Apply"
						color="success"
						onClick={updateTable}
					/>
				</DialogFooter>
			</Dialog>
		</Overlay>
	) : null
}

export default TableSlider
