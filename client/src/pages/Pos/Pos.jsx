import { useSelector } from "react-redux"
import ProductCardSection from "../../components/POS/ProductCardSection/ProductCardSection"
import BarcodeInput from "../../components/POS/BarcodeInput/BarcodeInput"
import Button from "../../components/common/Button/Button.component"
import Cart from "../../components/POS/Cart/Cart"
import { Box } from "@mui/material"
import {
	ButtonSection,
	ButtonSectionSpace,
	PosContainer,
	TotalSection,
} from "./Pos.styles"
import CropSquareOutlinedIcon from "@mui/icons-material/CropSquareOutlined"
import { CardSectionButton } from "../../components/POS/ProductCardSection/ProductCardSection.styles"
import { useState } from "react"
import PaymentSlider from "../../components/POS/Sliders/PaymentSlider/PaymentSlider"
import NoBarcodeSlider from "../../components/POS/Sliders/NoBarcodeSlider/NoBarcodeSlider"
import DiscountSlider from "../../components/POS/Sliders/DiscountSlider/DiscountSlider"
import AddCardSlider from "../../components/POS/Sliders/AddCardSlider/AddCardSlider"
import {
	Body,
	Container,
	SpaceHeader,
	SearchSection,
	SubTitle,
	Title,
} from "../../assets/styles/common.styles"
import EditSaleSection from "../../components/POS/EditSaleSection/EditSaleSection"
import { useGetNextSaleIdQuery } from "../../redux/services/salesApi"

const Pos = () => {
	const theme = useSelector((state) => state.theme.theme)
	const sale = useSelector((state) => state.sale)
	console.log(sale)
	const [cardSection, setCardSection] = useState(false)
	const [paymentSlider, setPaymentSlider] = useState(false)
	const [noBarcodeSlider, setNoBarcodeSlider] = useState(false)
	const [discountSlider, setDiscountSlider] = useState(false)
	const [addCardSlider, setAddCardSlider] = useState(false)

	const {data, error, isLoading} = useGetNextSaleIdQuery()

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
					<Title>Sale N°{sale.id}</Title>
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
