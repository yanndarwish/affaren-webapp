import { useSelector } from "react-redux"
import ProductCardSection from "../../components/ProductCardSection/ProductCardSection"
import BarcodeInput from "../../components/BarcodeInput/BarcodeInput"
import Button from "../../components/Button/Button.component"
import Cart from "../../components/Cart/Cart"
import { Box, Grid, Typography } from "@mui/material"
import {
	Body,
	Container,
	Header,
	SearchSection,
	SubTitle,
	Title,
} from "../../assets/styles/common.styles"
import { PosContainer } from "./Pos.styles"
import "./Pos.css"
import CropSquareOutlinedIcon from "@mui/icons-material/CropSquareOutlined"
import { CardSectionButton } from "../../components/ProductCardSection/ProductCardSection.styles"
import { useState } from "react"
import PaymentSlider from "../../components/Sliders/PaymentSlider/PaymentSlider"
import NoBarcodeSlider from "../../components/Sliders/NoBarcodeSlider/NoBarcodeSlider"

const Pos = () => {
	const theme = useSelector((state) => state.theme.theme)
	const [cardSection, setCardSection] = useState(false)
	const [paymentSlider, setPaymentSlider] = useState(false)
	const [noBarcodeSlider, setNoBarcodeSlider] = useState(false)

	const toggleCardSection = () => {
		const cardSectionEl = document.getElementById("card-section")
		const productCards = document.querySelectorAll(".product-card")

		if (!cardSection) {
			productCards.forEach((card) => {
				card.style.display = "none"
			})
			cardSectionEl.style.width = "0"
		} else {
			productCards.forEach((card) => {
				card.style.display = "flex"
			})
			cardSectionEl.style.width = "148px"
		}
		setCardSection(!cardSection)
	}

	const openPaymentSlider = () => {
		setPaymentSlider(true)
	}

	const opentNoBarcodeSlider = () => {
		setNoBarcodeSlider(true)
	}

	return (
		<PosContainer>
			<Container theme={theme} className="pos-main-section">
				<Header xs={12}>
					<Title>Pos</Title>
				</Header>
				<SearchSection>
					<BarcodeInput />
					<Button title="No Barcode" onClick={() => opentNoBarcodeSlider()} />
				</SearchSection>
				<Body theme={theme}>
					<Box>
						<SubTitle>Panier</SubTitle>
					</Box>
					<Box>
						<Cart />
					</Box>
					<Box display="flex" justifyContent="flex-end">
						<Typography variant="h3">Total</Typography>
						<Typography variant="h3">14,60€</Typography>
					</Box>
					<Box
						display="flex"
						justifyContent="space-between"
						className="button-section"
					>
						<Box className="button-section">
							<Button title="Receipt" />
							<Button title="Drawer" />
							<Button title="Discount" />
						</Box>
						<Box>
							<Button
								color="success"
								title="Continue to Payment"
								onClick={() => openPaymentSlider()}
							/>
						</Box>
					</Box>
				</Body>
				<CardSectionButton onClick={toggleCardSection} id="card-section-button">
					<CropSquareOutlinedIcon />
				</CardSectionButton>
			</Container>
			<ProductCardSection theme={theme} />
			<PaymentSlider
				theme={theme}
				isOpen={paymentSlider}
				setIsOpen={setPaymentSlider}
			/>
			<NoBarcodeSlider
				theme={theme}
				isOpen={noBarcodeSlider}
				setIsOpen={setNoBarcodeSlider}
			/>
		</PosContainer>
	)
}

export default Pos
