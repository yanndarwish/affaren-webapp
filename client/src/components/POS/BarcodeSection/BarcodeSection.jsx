import { useEffect, useState } from "react"
import { Input } from "../../ui/input"
import { Button } from "../../ui/button"
import { getProducts } from "../../../lib/api"
import { useQuery } from "../../../lib/hooks/useQuery"
import { useNotify } from "../../../lib/hooks/useNotify"
import { useNavigate } from "react-router-dom"
import { Stack } from "@mui/material"
import { useSale } from "../../../lib/providers/sale"

const BarcodeSection = ({ onSuccess }) => {
	const [barcode, setBarcode] = useState("")
	const { notifyError } = useNotify()
	const navigate = useNavigate()
	const sale = useSale()

	const queryGetProduct = useQuery({
		queryFn: getProducts,
		onSuccess: (data) => {
			handleSuccess(data.data)
		},
		onError: () => {
			notifyError("An error occurred")
		},
	})

	const handleCreateNewProduct = (productBarcode) => {
		navigate(`/inventory?new=${productBarcode}`)
	}

	const handleSuccess = (data) => {
		if (data.length === 0) {
			const productBarcode = barcode.endsWith("/n")
				? barcode.slice(0, -2)
				: barcode

			notifyError(`Product ${productBarcode} not found, create new ?`, () =>
				handleCreateNewProduct(productBarcode)
			)
		} else {
			onSuccess(data)
		}
		setBarcode("")
	}

	const handleBarcodeInput = (barcode) => {
		if (barcode.endsWith("/n")) {
			const barcodeWithoutNewLine = barcode.slice(0, -2)
			queryGetProduct.send({ barcode: barcodeWithoutNewLine })
		}
	}

	const handleBarcodeSearch = () => {
		if (barcode.length > 0) {
			queryGetProduct.send({ barcode })
			document.getElementById("barcode-input").focus()
		}
	}

	const handleBarcodeChange = (e) => {
		setBarcode(e.target.value)
	}

	useEffect(() => {
		handleBarcodeInput(barcode)
	}, [barcode])

	return (
		<Stack direction="row" spacing={2}>
			<div className="flex w-full max-w-sm items-center space-x-2">
				<Input
					id="barcode-input"
					type="text"
					placeholder="Barcode"
					value={barcode}
					onChange={handleBarcodeChange}
					disabled={sale.isRefund}
				/>
				<Button
					type="submit"
					onClick={handleBarcodeSearch}
					disabled={sale.isRefund}
				>
					Search
				</Button>
			</div>
		</Stack>
	)
}

export default BarcodeSection
