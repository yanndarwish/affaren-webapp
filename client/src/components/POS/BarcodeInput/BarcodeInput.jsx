import Input from "../../common/Input/Input.component"
import { useEffect, useState } from "react"
import { useGetProductQuery } from "../../../redux/services/productsApi"
import { addProduct, updateProducts } from "../../../redux/features/sale"
import { useDispatch, useSelector } from "react-redux"

const BarcodeInput = () => {
	const products = useSelector((state) => state.sale.products)

	const dispatch = useDispatch()
	const [barcode, setBarcode] = useState("")
	const [skip, setSkip] = useState(true)
	const { data } = useGetProductQuery(
		{ barcode: barcode.slice(0, -2) },
		{ skip }
	)

	// add data (product) to cart
	const addToCart = (data) => {
		if (data !== undefined && data !== null) {
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
				found = { ...found, quantity: found.quantity + 1, price: (data.product_price * (found.quantity + 1)).toFixed(2)}

				const updated = products.map((product) => {
					if (product.id === found.id) {
						return found
					} else {
						return product
					}
				})

				dispatch(updateProducts({ products: updated }))
			}
		}
		setBarcode("")
		setSkip(true)
	}

	const handleBarcodeInput = (barcode) => {
		if (barcode.endsWith("/n")) {
			setSkip(false)
		}
	}

	useEffect(() => {
		handleBarcodeInput(barcode)
	}, [barcode])

	useEffect(() => {
		addToCart(data)
	}, [data])

	return <Input label="Barcode" value={barcode} onChange={setBarcode} />
}

export default BarcodeInput
