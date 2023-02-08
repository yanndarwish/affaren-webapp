import { useEffect, useState } from "react"
import { useGetProductQuery } from "../../../redux/services/productsApi"
import { addProduct, updateProducts } from "../../../redux/features/sale"
import { useDispatch, useSelector } from "react-redux"
import { Flex } from "../../../assets/common/common.styles"
import Button from "../../common/Button/Button.component"
import BarcodeInput from "../../common/BarcodeInput/BarcodeInput"

const BarcodeSection = ({ setNotFound }) => {
	const products = useSelector((state) => state.sale.products)

	const dispatch = useDispatch()
	const [skip, setSkip] = useState(true)
	const [barcode, setBarcode] = useState("")
	const { data } = useGetProductQuery(
		{ barcode: barcode.endsWith("/n") ? barcode.slice(0, -2) : barcode },
		{ skip }
	)

	// add data (product) to cart
	const addToCart = (data) => {
		if (data !== undefined && data !== null) {
			setNotFound(false)
			let found = products.find((product) => product.id === data.product_id)

			if (!found) {
				let product = {
					id: data.product_id,
					name: data.product_name,
					price: parseFloat(data.product_price),
					taxe: data.product_taxe,
					quantity: 1,
				}
				dispatch(addProduct({ products: product }))
			} else {
				found = {
					...found,
					quantity: found.quantity + 1,
					price: (data.product_price * (found.quantity + 1)).toFixed(2),
				}

				const updated = products.map((product) => {
					if (product.id === found.id) {
						return found
					} else {
						return product
					}
				})

				dispatch(updateProducts({ products: updated }))
			}
		} else if (data === null) {
			setNotFound(true)
		}
		setBarcode("")
		setSkip(true)
	}

	const handleBarcodeInput = (barcode) => {
		if (barcode.endsWith("/n")) {
			setSkip(false)
		}
	}

	const handleSearch = () => {
		if (barcode.length > 0) {
			setSkip(false)
			document.getElementById("barcode-input").focus()
		}
	}

	useEffect(() => {
		handleBarcodeInput(barcode)
	}, [barcode])

	useEffect(() => {
		addToCart(data)
	}, [data])

	return (
		<Flex>
			<BarcodeInput barcode={barcode} setBarcode={setBarcode} />

			<Button title="Search" onClick={handleSearch} />
		</Flex>
	)
}

export default BarcodeSection
