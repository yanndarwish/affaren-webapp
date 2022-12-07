import Input from "../Input/Input.component"
import { useEffect, useState } from "react"
import { useGetProductQuery } from "../../redux/services/productsApi"
import { addProduct } from "../../redux/features/sale"
import { useDispatch } from "react-redux"

const BarcodeInput = () => {
    const dispatch = useDispatch()
	const [barcode, setBarcode] = useState("")
	const [skip, setSkip] = useState(true)
	const { data, error, isLoading } = useGetProductQuery(
		{ barcode: barcode.slice(0, -2) },
		{ skip }
	)

	// add data (product) to cart
    const addToCart = (data) => {
        if (data !== undefined) {
            console.log("now")
            console.log(data)
            dispatch(addProduct({products: data}))
            setSkip(true)
            setBarcode("")
        }
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

	return <Input value={barcode} onChange={setBarcode} />
}

export default BarcodeInput