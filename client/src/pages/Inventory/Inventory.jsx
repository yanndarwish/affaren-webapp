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
import { ModalCreateProduct } from "../../components/INVENTORY/modals/create"
import { useModal } from "../../components/shared/modal"
import { ModalEditProduct } from "../../components/INVENTORY/modals/edit"

const Inventory = () => {
	const loggedIn = useSelector((state) => state.login.loggedIn)
	const navigate = useNavigate()
	const theme = useSelector((state) => state.theme.theme)
	const [pageNumber, setPageNumber] = useState(1)
	const [searchString, setSearchString] = useState("")
	const [barcode, setBarcode] = useState("")
	const [barcodeValue, setBarcodeValue] = useState("")
	const [barcodeSearch, setBarcodeSearch] = useState(false)
	const [products, setProducts] = useState([])
	const createProductController = useModal()
	const editProductController = useModal()

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

	const handleCreateProduct = () => {
		createProductController.openModal()
	}

	const handleEditProduct = (product) => {
		editProductController.openModal()
		editProductController.setData(product)
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
		setBarcode("")
		setBarcodeSearch(false)
		fetchProducts({})
		focusOnBarcode()
	}

	useEffect(() => {
		fetchProducts({ name: searchString })
	}, [searchString])

	useEffect(() => {
		if (barcode.endsWith("/n") || barcode.length === 0) {
			fetchProducts({ barcode: barcode })
		}
	}, [barcode])

	useEffect(() => {
		setProducts(data)
	}, [data])

	// useEffect(() => {
	// 	redirect()
	// }, [])

	return (
		<Container theme={theme}>
			<SpaceHeader>
				<Title>Inventory</Title>
				<Button title="Create Product" onClick={handleCreateProduct} />
			</SpaceHeader>
			<SearchSection>
				<Flex>
					<BarcodeInput barcode={barcode} setBarcode={setBarcode} />
					{barcodeSearch ? (
						<Button title="Reset" onClick={() => resetBarcode()} />
					) : (
						<Button
							title="Search"
							onClick={() => fetchProducts({ barcode: barcode })}
						/>
					)}
				</Flex>
				<Flex>
					<Input label="Name" value={searchString} onChange={setSearchString} />
				</Flex>
			</SearchSection>
			<FitContainer theme={theme}>
				<SubTitle>Products</SubTitle>
				<div>
					{isError ? (
						<InfoMessage state="error" text="Failed to fetch products" />
					) : (
						<>
							<InventoryTable
								products={products}
								openEditor={handleEditProduct}
							/>
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
			<ModalCreateProduct controller={createProductController} />
			<ModalEditProduct controller={editProductController} />
		</Container>
	)
}

export default Inventory
