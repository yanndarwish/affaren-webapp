import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

import { getProducts } from "../../../lib/api"
import { useSale } from "../../../lib/providers/sale"
import { useQuery } from "../../../lib/hooks/useQuery"
import { useNotify } from "../../../lib/hooks/useNotify"

export const useBarcode = ({ onSuccess }) => {
	const sale = useSale()
	const navigate = useNavigate()
	const { notifyError } = useNotify()
	const [barcode, setBarcode] = useState("")

	const queryGetProduct = useQuery({
		queryFn: getProducts,
		onSuccess: (data) => {
			handleSuccess(data.data)
		},
	})

	const handleSuccess = (data) => {
		if (data.length === 0) {
			notifyError(`Product ${barcode} not found, create new ?`, () =>
				handleCreateNewProduct(barcode)
			)
		} else {
			onSuccess(data)
		}
		handleResetBarcode()
		sale.refocus()
	}

	const handleCreateNewProduct = (productBarcode) => {
		navigate(`/inventory?new=${productBarcode}`)
	}

	const handleBarcodeChange = (barcode) => {
		if (barcode.endsWith("/n")) {
			const barcodeWithoutNewLine = barcode.slice(0, -2)
			queryGetProduct.send({ barcode: barcodeWithoutNewLine })
		}
	}

	const handleBarcodeSearch = () => {
		queryGetProduct.send({ barcode })
	}

	const handleResetBarcode = () => {
		setBarcode("")
	}

	useEffect(() => {
		handleBarcodeChange(barcode)
	}, [barcode])

	return {
		barcode,
		setBarcode,
		handleBarcodeSearch,
	}
}
