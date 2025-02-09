import { Stack } from "@mui/material"

import { useSale } from "../../../lib/providers/sale"

import { Input } from "../../../components/ui/input"
import { Button } from "../../../components/ui/button"

import { useBarcode } from "../hooks/use-barcode"

export const BarcodeSection = ({ onSuccess }) => {
	const sale = useSale()
	const { barcode, setBarcode, handleBarcodeSearch } = useBarcode({
		onSuccess,
	})

	return (
		<Stack direction="row" spacing={2}>
			<div className="flex w-full max-w-sm items-center space-x-2">
				<Input
					id="barcode-input"
					type="text"
					placeholder="Barcode"
					value={barcode}
					onChange={(e) => setBarcode(e.target.value)}
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
