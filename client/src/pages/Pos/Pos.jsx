import { useSelector, useDispatch } from "react-redux"
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
	ErrorMessage,
} from "../../assets/styles/common.styles"
import { useGetNextSaleIdQuery } from "../../redux/services/salesApi"
import { useGetCardsQuery } from "../../redux/services/cardApi"
import { usePostDrawerMutation } from "../../redux/services/printApi"
import { useEffect } from "react"
import { setSaleAmount, setTaxes } from "../../redux/features/sale"
import { useNavigate } from "react-router-dom"
import { TableSectionButton } from "../../components/POS/Tables/TablesSection.styles"
import TablesSection from "../../components/POS/Tables/TablesSection"
import TableSlider from "../../components/POS/Sliders/TableSlider/TableSlider"
import { useGetDishesQuery } from "../../redux/services/dishApi"

const Pos = () => {
	const loggedIn = useSelector((state) => state.login.loggedIn)
	const navigate = useNavigate()
	const theme = useSelector((state) => state.theme.theme)
	const sale = useSelector((state) => state.sale)
	const activeTables = useSelector((state) => state.table.activeTables)
	const dispatch = useDispatch()
	const [cardSection, setCardSection] = useState(false)
	const [tableSection, setTableSection] = useState(false)
	const [paymentSlider, setPaymentSlider] = useState(false)
	const [noBarcodeSlider, setNoBarcodeSlider] = useState(false)
	const [discountSlider, setDiscountSlider] = useState(false)
	const [addCardSlider, setAddCardSlider] = useState(false)
	const [tableSlider, setTableSlider] = useState(false)
	const [selectedTable, setSelectedTable] = useState({})

	const { isError } = useGetCardsQuery()
	const { error } = useGetNextSaleIdQuery()
	const [postDrawer, res] = usePostDrawerMutation()
	useGetDishesQuery()
	const redirect = () => {
		!loggedIn && navigate("/login")
	}

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
		document.getElementById("main-barcode-input").focus()
	}

	const toggleTableSection = () => {
		const tableSectionEl = document.getElementById("table-section")
		const tableCards = document.querySelectorAll(".table-card")

		if (!tableSection) {
			tableCards.forEach((card) => {
				card.style.display = "none"
			})
			tableSectionEl.style.width = "0"
		} else {
			tableCards.forEach((card) => {
				card.style.display = "flex"
			})
			tableSectionEl.style.width = "148px"
		}
		setTableSection(!tableSection)
		document.getElementById("main-barcode-input").focus()
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

	const openTableSlider = (e) => {
		setTableSlider(true)
		const id = e.target.dataset.id
		setSelectedTable(activeTables?.filter((table) => table.table_id === id)[0])
	}

	console.log(selectedTable)
	const openDrawer = () => {
		postDrawer()
	}

	const updateTotalAmount = () => {
		let total = 0
		sale.products.forEach((product) => {
			total += parseFloat(product.price)
		})

		dispatch(setSaleAmount({ amount: total.toFixed(2) }))
	}

	const updateTaxes = () => {
		let taxesDetails = {}
		sale.products.forEach((product) => {
			let ht = (product.price / (1 + parseFloat(product.taxe) / 100)).toFixed(2)
			let tva = (product.price - ht).toFixed(2)
			switch (parseFloat(product.taxe)) {
				case 5.5:
					taxesDetails = {
						...taxesDetails,
						tva1: taxesDetails.tva1
							? (parseFloat(taxesDetails.tva1) + parseFloat(tva)).toFixed(2)
							: tva,
						ht1: taxesDetails.ht1
							? (parseFloat(taxesDetails.ht1) + parseFloat(ht)).toFixed(2)
							: ht,
						total1: taxesDetails.total1
							? (
									parseFloat(taxesDetails.total1) + parseFloat(product.price)
							  ).toFixed(2)
							: product.price,
						totalTva: taxesDetails.totalTva
							? (parseFloat(taxesDetails.totalTva) + parseFloat(tva)).toFixed(2)
							: tva,
						totalHt: taxesDetails.totalHt
							? (parseFloat(taxesDetails.totalHt) + parseFloat(ht)).toFixed(2)
							: ht,
					}
					break
				case 2.1:
					taxesDetails = {
						...taxesDetails,
						tva2: taxesDetails.tva2
							? (parseFloat(taxesDetails.tva2) + parseFloat(tva)).toFixed(2)
							: tva,
						ht2: taxesDetails.ht2
							? (parseFloat(taxesDetails.ht2) + parseFloat(ht)).toFixed(2)
							: ht,
						total2: taxesDetails.total2
							? (
									parseFloat(taxesDetails.total2) + parseFloat(product.price)
							  ).toFixed(2)
							: product.price,
						totalTva: taxesDetails.totalTva
							? (parseFloat(taxesDetails.totalTva) + parseFloat(tva)).toFixed(2)
							: tva,
						totalHt: taxesDetails.totalHt
							? (parseFloat(taxesDetails.totalHt) + parseFloat(ht)).toFixed(2)
							: ht,
					}
					break
				case 20:
					taxesDetails = {
						...taxesDetails,
						tva3: taxesDetails.tva3
							? (parseFloat(taxesDetails.tva3) + parseFloat(tva)).toFixed(2)
							: tva,
						ht3: taxesDetails.ht3
							? (parseFloat(taxesDetails.ht3) + parseFloat(ht)).toFixed(2)
							: ht,
						total3: taxesDetails.total3
							? (
									parseFloat(taxesDetails.total3) + parseFloat(product.price)
							  ).toFixed(2)
							: product.price,
						totalTva: taxesDetails.totalTva
							? (parseFloat(taxesDetails.totalTva) + parseFloat(tva)).toFixed(2)
							: tva,
						totalHt: taxesDetails.totalHt
							? (parseFloat(taxesDetails.totalHt) + parseFloat(ht)).toFixed(2)
							: ht,
					}
					break
				default:
			}
		})
		dispatch(setTaxes({ taxes: taxesDetails }))
	}

	useEffect(() => {
		updateTotalAmount()
		updateTaxes()
		if (res.isError) {
			res.reset()
		}
	}, [sale.products])

	useEffect(() => {
		document.getElementById("main-barcode-input").focus()
	}, [paymentSlider, noBarcodeSlider, discountSlider, addCardSlider])

	useEffect(() => {
		redirect()
	}, [])

	return (
		<PosContainer>
			<Container theme={theme}>
				<SpaceHeader xs={12}>
					<Title>Sale N°{sale.id ? sale.id : 1}</Title>
					{error && <ErrorMessage>Failed to fetch next sale ID</ErrorMessage>}
					{isError && <ErrorMessage>Failed to fetch cards</ErrorMessage>}
				</SpaceHeader>
				<SearchSection>
					<BarcodeInput />
					<Button title="No Barcode" onClick={() => opentNoBarcodeSlider()} />
				</SearchSection>
				<Body theme={theme}>
					<Box>
						<SubTitle>Panier</SubTitle>
					</Box>
					<Box sx={{ height: "100%" }}>
						<Cart />
					</Box>
					<TotalSection display="flex" justifyContent="flex-end">
						<SubTitle>Total</SubTitle>
						<SubTitle>{sale.amount}€</SubTitle>
					</TotalSection>
					<ButtonSectionSpace>
						<ButtonSection>
							<Button title="Drawer" onClick={openDrawer} />
							<Button title="Discount" onClick={() => openDiscountSlider()} />
						</ButtonSection>
						{res.isError && <ErrorMessage>Failed to open Drawer</ErrorMessage>}
						<Box>
							<Button
								color="success"
								title="Continue to Payment"
								onClick={() => openPaymentSlider()}
							/>
						</Box>
					</ButtonSectionSpace>
				</Body>
				<CardSectionButton
					onClick={toggleCardSection}
					id="card-section-button"
					theme={theme}
				>
					<CropSquareOutlinedIcon color="primary" />
				</CardSectionButton>
				<TableSectionButton
					onClick={toggleTableSection}
					id="table-section-button"
					theme={theme}
				>
					<CropSquareOutlinedIcon color="primary" />
				</TableSectionButton>
			</Container>
			<ProductCardSection theme={theme} onClick={openAddCardSlider} />
			<TablesSection theme={theme} onClick={openTableSlider} />
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

			{discountSlider && (
				<DiscountSlider
					theme={theme}
					isOpen={discountSlider}
					setIsOpen={setDiscountSlider}
				/>
			)}
			{addCardSlider && (
				<AddCardSlider
					theme={theme}
					isOpen={addCardSlider}
					setIsOpen={setAddCardSlider}
				/>
			)}

			<TableSlider
				dataTable={selectedTable}
				theme={theme}
				isOpen={tableSlider}
				setIsOpen={setTableSlider}
			/>
		</PosContainer>
	)
}

export default Pos
