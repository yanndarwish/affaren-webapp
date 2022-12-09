import { useSelector } from "react-redux"
import ProductCardSection from "../../components/ProductCardSection/ProductCardSection"
import BarcodeInput from "../../components/BarcodeInput/BarcodeInput"
import Button from "../../components/Button/Button.component"
import Cart from "../../components/Cart/Cart"
import { Box } from "@mui/material"
import {
	ButtonSection,
	ButtonSectionSpace,
	PosContainer,
	TotalSection,
} from "./Pos.styles"
import CropSquareOutlinedIcon from "@mui/icons-material/CropSquareOutlined"
import { CardSectionButton } from "../../components/ProductCardSection/ProductCardSection.styles"
import { useState } from "react"
import PaymentSlider from "../../components/Sliders/PaymentSlider/PaymentSlider"
import NoBarcodeSlider from "../../components/Sliders/NoBarcodeSlider/NoBarcodeSlider"
import DiscountSlider from "../../components/Sliders/DiscountSlider/DiscountSlider"
import AddCardSlider from "../../components/Sliders/AddCardSlider/AddCardSlider"
import {
	Body,
	Container,
	SpaceHeader,
	SearchSection,
	SubTitle,
	Title,
} from "../../assets/styles/common.styles"
import EditSaleSection from "../../components/EditSaleSection/EditSaleSection"

const Pos = () => {
	const theme = useSelector((state) => state.theme.theme)
	const [cardSection, setCardSection] = useState(false)
	const [paymentSlider, setPaymentSlider] = useState(false)
	const [noBarcodeSlider, setNoBarcodeSlider] = useState(false)
	const [discountSlider, setDiscountSlider] = useState(false)
	const [addCardSlider, setAddCardSlider] = useState(false)

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

	const openDiscountSlider = () => {
		setDiscountSlider(true)
	}

	const openAddCardSlider = () => {
		setAddCardSlider(true)
	}
	return (
		<PosContainer>
			<Container theme={theme}>
				<SpaceHeader xs={12}>
					<Title>Sale N°</Title>
					<EditSaleSection />
				</SpaceHeader>
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
					<TotalSection display="flex" justifyContent="flex-end">
						<SubTitle>Total</SubTitle>
						<SubTitle>14,60€</SubTitle>
					</TotalSection>
					<ButtonSectionSpace>
						<ButtonSection>
							<Button title="Receipt" />
							<Button title="Drawer" />
							<Button title="Discount" onClick={() => openDiscountSlider()} />
						</ButtonSection>
						<Box>
							<Button
								color="success"
								title="Continue to Payment"
								onClick={() => openPaymentSlider()}
							/>
						</Box>
					</ButtonSectionSpace>
				</Body>
				<CardSectionButton onClick={toggleCardSection} id="card-section-button">
					<CropSquareOutlinedIcon />
				</CardSectionButton>
			</Container>
			<ProductCardSection theme={theme} onClick={openAddCardSlider}/>
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
			<DiscountSlider
				theme={theme}
				isOpen={discountSlider}
				setIsOpen={setDiscountSlider}
			/>
			<AddCardSlider
				theme={theme}
				isOpen={addCardSlider}
				setIsOpen={setAddCardSlider}
			/>
		</PosContainer>
	)
}

export default Pos
