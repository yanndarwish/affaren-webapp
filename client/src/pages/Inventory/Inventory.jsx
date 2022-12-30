import { useSelector } from "react-redux"
import Input from "../../components/common/Input/Input.component"
import Button from "../../components/common/Button/Button.component"
import {
	Body,
	Container,
	Flex,
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

const Inventory = () => {
	const theme = useSelector((state) => state.theme.theme)
	const [searchString, setSearchString] = useState("")
	const [barcode, setBarcode] = useState("")
	const [barcodeSearch, setBarcodeSearch] = useState(false)
	const [filteredProducts, setFilteredProducts] = useState([])
	const [isInventoryMode, setIsInventoryMode] = useState(false)
	const { data } = useGetProductsQuery()

	const handleSearch = () => {
		console.log(searchString)
	}

	const handleExport = () => {
		console.log("export")
	}

	const toggleInventoryMode = () => {
		setIsInventoryMode(!isInventoryMode)
	}

	const filterProducts = ({ data, searchString }) => {
		if (!searchString) {
			console.log("filteredroducts : return full data")
			setFilteredProducts(data)
		} else {
			console.log("filteredroducts : return filtered data by name")
			let array = data?.filter((item) =>
				item.product_name.toLowerCase().includes(searchString)
			)
			setFilteredProducts(array)
		}
	}

	const findBarcode = ({nosuffix, barcode}) => {
		let found
		console.log(barcode)
		if (nosuffix) {
			console.log(nosuffix)
			found = data?.filter((item) => item.product_barcode === barcode)
		} else {
			console.log(nosuffix)
			found = data?.filter(
				(item) => item.product_barcode === barcode.slice(0, -2)
			)
		}
		setFilteredProducts(found)
		setBarcodeSearch(true)
	}

	const resetBarcode = () => {
		setBarcode("")
		setBarcodeSearch(false)
		filterProducts({ data: data })
	}

	useEffect(() => {
		filterProducts({ data, searchString })
	}, [data, searchString])

	useEffect(() => {
		if (barcode.endsWith("/n")) {
			findBarcode({barcode})
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
								: () => findBarcode({nosuffix: true, barcode})
						}
					/>
				</Flex>
				<Flex>
					<Input label="Name" value={searchString} onChange={setSearchString} />
					<Button title="Search" onClick={handleSearch} />
				</Flex>
			</SearchSection>
			<Body theme={theme}>
				<SpaceHeader>
					<SubTitle>Products</SubTitle>
					<Button title="Export" onClick={handleExport} />
				</SpaceHeader>
				<div>
					<InventoryTable products={filteredProducts} />
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
