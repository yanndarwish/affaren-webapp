import { useRef, useState } from "react"
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
	const [value, setValue] = useState(0)

	// O=cash 1=card 2=check

	const handleChange = (event, newValue) => {
		setValue(newValue)
	}

	const closeSlider = (e) => {
		if (overlayRef.current === e.target) {
			setIsOpen(false)
		}
	}

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
							<NumPad display/>
							<EuroSymbolOutlinedIcon />
						</TabPanel>
						<TabPanel value={value} index={1}>
							<NumPad display/>
							<CreditCardOutlinedIcon />
						</TabPanel>
						<TabPanel value={value} index={2}>
							<NumPad display/>
							<SellOutlinedIcon />
						</TabPanel>
					</DialogCard>
				</DialogBody>
				<DialogFooter>
					<Button title="Confirm Payment" color="success" />
				</DialogFooter>
			</Dialog>
		</Overlay>
	) : null
}

export default Slider
