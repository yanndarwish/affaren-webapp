import { useSelector } from "react-redux"
import Input from "../../components/common/Input/Input.component"
import Button from "../../components/common/Button/Button.component"
import {
	ArtTitle,
	Body,
	Container,
	Flex,
	FullCenter,
	SearchSection,
	SpaceHeader,
	SubTitle,
	Title,
} from "../../assets/styles/common.styles"
import InventoryTable from "../../components/INVENTORY/InventoryTable/InventoryTable"
import { useState } from "react"
import { useGetProductsQuery } from "../../redux/services/productsApi"
import { useEffect } from "react"
import BarcodeInput from "../../components/INVENTORY/BarcodeInput/BarcodeInput"
import EditProduct from "../../components/INVENTORY/EditProduct/EditProduct"
import CreateProduct from "../../components/INVENTORY/CreateProduct/CreateProduct"

const Inventory = () => {
	const theme = useSelector((state) => state.theme.theme)
	const [searchString, setSearchString] = useState("")
	const [barcode, setBarcode] = useState("")
	const [barcodeSearch, setBarcodeSearch] = useState(false)
	const [filteredProducts, setFilteredProducts] = useState([])
	const [editingProduct, setEditingProduct] = useState({})
	const [isInventoryMode, setIsInventoryMode] = useState(false)
	const [isCreationMode, setIsCreationMode] = useState(false)
	const [isProductFound, setIsProductFound] = useState(false)
	const { data } = useGetProductsQuery()

	const handleExport = () => {
		console.log("export")
	}

	const toggleInventoryMode = () => {
		setIsInventoryMode(!isInventoryMode)
	}

	const toggleCreationMode = () => {
		setIsCreationMode(!isCreationMode)
	}

	const cancelEditingMode = () => {
		setIsProductFound(false)
	}

	const filterProducts = ({ data, searchString }) => {
		if (!searchString) {
			setFilteredProducts(data)
		} else {
			let array = data?.filter((item) =>
				item.product_name.toLowerCase().includes(searchString)
			)
			setFilteredProducts(array)
		}
	}

	const openEditor = (product) => {
		console.log(product)
		setIsInventoryMode(true)

			setIsProductFound(true)
			setEditingProduct(product)
			setIsCreationMode(false)


	}

	const findBarcode = ({ nosuffix, barcode }) => {
		let found
		if (nosuffix) {
			found = data?.filter((item) => item.product_barcode === barcode)
		} else {
			found = data?.filter(
				(item) => item.product_barcode === barcode.slice(0, -2)
			)
		}
		setBarcodeSearch(true)
		if (found.length > 0) {
			setFilteredProducts(found)
			setIsProductFound(true)
			setEditingProduct(found[0])
			setIsCreationMode(false)
			if (isInventoryMode) {
				setBarcode("")
				setBarcodeSearch(false)
			}
		} else {
			setIsProductFound(false)
		}
	}

	const resetBarcode = () => {
		setBarcode("")
		setEditingProduct({})
		setBarcodeSearch(false)
		filterProducts({ data: data })
	}

	useEffect(() => {
		filterProducts({ data, searchString })
	}, [data, searchString])

	useEffect(() => {
		if (barcode.endsWith("/n")) {
			findBarcode({ barcode })
		}
	}, [barcode])

	return (
		<Container theme={theme}>
			<SpaceHeader>
				<Title>Inventory</Title>
				<Button
					title="Inventory"
					variant={isInventoryMode ? "contained" : "outlined"}
					color={isInventoryMode ? "success" : "error"}
					onClick={toggleInventoryMode}
				/>
			</SpaceHeader>
			<SearchSection>
				<Flex>
					<BarcodeInput
						barcode={barcode}
						setBarcode={setBarcode}
						setFilteredProducts={setFilteredProducts}
					/>
					<Button
						title={barcodeSearch ? "Reset" : "Search"}
						onClick={
							barcodeSearch
								? () => resetBarcode()
								: () => findBarcode({ nosuffix: true, barcode })
						}
					/>
				</Flex>
				<Flex>
					{!isInventoryMode && (
						<Input
							label="Name"
							value={searchString}
							onChange={setSearchString}
						/>
					)}
				</Flex>
			</SearchSection>
			<Body theme={theme}>
				<SpaceHeader>
					<SubTitle>{isInventoryMode ? "Inventory Mode" : "Products"}</SubTitle>
					{isInventoryMode ? (
						isProductFound ? (
							<Button title="Cancel" onClick={cancelEditingMode} />
						) : (
							
								<Button
									title={isCreationMode ? "Cancel" : "Create a Product"}
									onClick={toggleCreationMode}
								/>
							
						)
					) : (
						<Button
							title="Export"
							onClick={handleExport}
						/>
					)}
				</SpaceHeader>
				<div>
					{isInventoryMode ? (
						isProductFound ? (
							<EditProduct
								product={editingProduct}
								setInputBarcode={setBarcode}
							/>
						) : isCreationMode ? (
							<CreateProduct />
						) : (
							<FullCenter>
								<ArtTitle>Scan a product to start</ArtTitle>
							</FullCenter>
						)
					) : (
						<InventoryTable products={filteredProducts} openEditor={openEditor} />
					)}
				</div>

				<div>
					<div></div>
					<div></div>
				</div>
			</Body>
		</Container>
	)
}

export default Inventory
