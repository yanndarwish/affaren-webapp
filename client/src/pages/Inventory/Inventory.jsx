import { useSelector } from "react-redux"
import Input from "../../components/common/Input/Input.component"
import Button from "../../components/common/Button/Button.component"
import {
	Container,
	FitContainer,
	Flex,
	SearchSection,
	SpaceHeader,
	SpaceHeaderCenter,
	SubTitle,
	Title,
} from "../../assets/common/common.styles"
import InventoryTable from "../../components/INVENTORY/InventoryTable/InventoryTable"
import { useState } from "react"
import { useGetProductsQuery } from "../../redux/services/productsApi"
import { useEffect } from "react"
import BarcodeInput from "../../components/common/BarcodeInput/BarcodeInput"
import EditProduct from "../../components/INVENTORY/EditProduct/EditProduct"
import CreateProduct from "../../components/INVENTORY/CreateProduct/CreateProduct"
import { useNavigate } from "react-router-dom"
import InfoMessage from "../../components/common/InfoMessage/InfoMessage"

const Inventory = () => {
	const loggedIn = useSelector((state) => state.login.loggedIn)
	const navigate = useNavigate()
	const theme = useSelector((state) => state.theme.theme)
	const [pageNumber, setPageNumber] = useState(1)
	const [searchString, setSearchString] = useState("")
	const [barcode, setBarcode] = useState("")
	const [barcodeValue, setBarcodeValue] = useState("")
	const [inputBarcode, setInputBarcode] = useState("")
	const [barcodeSearch, setBarcodeSearch] = useState(false)
	const [products, setProducts] = useState([])
	const [editingProduct, setEditingProduct] = useState({})
	const [isEditMode, setIsEditMode] = useState(false)
	const [isCreationMode, setIsCreationMode] = useState(false)
	const [isProductFound, setIsProductFound] = useState(false)
	const [sent, setSent] = useState(false)

	const { data, isError, refetch } = useGetProductsQuery({
		page: pageNumber,
		name: searchString,
		barcode: barcodeValue,
	})

	const redirect = () => {
		!loggedIn && navigate("/login")
	}

	const focusOnBarcode = () => {
		const input = document.getElementById("barcode-input")
		input.focus()
	}

	const handlePageClick = (num) => {
		setPageNumber(pageNumber + num)
	}

	const toggleCreationMode = () => {
		setInputBarcode("")
		setSearchString("")
		setSent(!sent)
		setIsCreationMode(!isCreationMode)
	}

	const cancelEditingMode = () => {
		setIsEditMode(false)
	}

	// when clickin on table row, open editor
	const openEditor = (product) => {
		setIsEditMode(true)
		setIsProductFound(true)
		setEditingProduct(product)
		setIsCreationMode(false)
	}

	const fetchProducts = ({ barcode, name }) => {
		if (barcode) {
			let barcodeValue = barcode.endsWith("/n") ? barcode.slice(0, -2) : barcode

			setBarcodeSearch(true)
			setBarcodeValue(barcodeValue)
		} else if (name) {
			setBarcode("")
			setBarcodeValue("")
		} else {
			setBarcodeSearch(false)
			setBarcodeValue(barcode)
		}
		refetch()
	}

	const resetBarcode = () => {
		// setIsProductFound(false)
		setBarcode("")
		setEditingProduct({})
		setBarcodeSearch(false)
		fetchProducts({})
		focusOnBarcode()
	}

	const softResetBarcode = () => {
		setBarcode("")
		// setEditingProduct({})
		setBarcodeSearch(false)
		// filterProducts({ data: data })
		focusOnBarcode()
	}

	useEffect(() => {
		setIsCreationMode(false)
		setIsEditMode(false)
		fetchProducts({ name: searchString })
	}, [searchString])

	useEffect(() => {
		if (barcode.length !== 0) {
			setIsCreationMode(false)
			setIsEditMode(false)
		}
		if (barcode.endsWith("/n") || barcode.length === 0) {
			fetchProducts({ barcode: barcode })
		}
	}, [barcode])

	useEffect(() => {
		setProducts(data)
		if (data && data.length === 0) {
			setIsProductFound(false)
			setIsCreationMode(true)
			setInputBarcode(barcode)
		}
	}, [data])

	useEffect(() => {
		redirect()
	}, [])

	return (
		<Container theme={theme}>
			<SpaceHeader>
				<Title>Inventory</Title>
				{/* <Button
					title="Edit Mode"
					variant={isEditMode ? "contained" : "outlined"}
					color={isEditMode ? "success" : "error"}
					onClick={toggleEditMode}
				/> */}
			</SpaceHeader>
			<SearchSection>
				<Flex>
					<BarcodeInput barcode={barcode} setBarcode={setBarcode} />
					<Button
						title={barcodeSearch ? "Reset" : "Search"}
						onClick={
							barcodeSearch
								? () => resetBarcode()
								: () => fetchProducts({ barcode: barcode })
						}
					/>
				</Flex>
				<Flex>
					<Input label="Name" value={searchString} onChange={setSearchString} />
				</Flex>
			</SearchSection>
			<FitContainer theme={theme}>
				<SpaceHeader>
					<SubTitle>{isEditMode ? "Edit Mode" : "Products"}</SubTitle>

					{isEditMode ? (
						<Button title="Cancel" onClick={cancelEditingMode} />
					) : (
						<Button
							title={isCreationMode ? "Cancel" : "Create a Product"}
							onClick={toggleCreationMode}
						/>
					)}
				</SpaceHeader>
				<div>
					{isProductFound && isEditMode ? (
						<EditProduct
							product={editingProduct}
							focusOnBarcode={focusOnBarcode}
							resetBarcode={softResetBarcode}
							setIsProductFound={setIsProductFound}
							setSent={setSent}
							sent={sent}
						/>
					) : isCreationMode ? (
						<CreateProduct
							inputBarcode={inputBarcode}
							focusOnBarcode={focusOnBarcode}
							resetBarcode={resetBarcode}
							sent={sent}
							setSent={setSent}
						/>
					) : isError ? (
						<InfoMessage state="error" text="Failed to fetch products" />
					) : (
						<>
							<InventoryTable products={products} openEditor={openEditor} />
							<SpaceHeaderCenter style={{ width: "100%" }}>
								<Button
									title="Prev"
									onClick={() => handlePageClick(-1)}
									disabled={pageNumber === 1}
								/>
								<Button
									title="Next"
									onClick={() => handlePageClick(1)}
									disabled={products && products.length < 25}
								/>
							</SpaceHeaderCenter>
						</>
					)}
				</div>
			</FitContainer>
		</Container>
	)
}

export default Inventory
