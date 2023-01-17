import Input from "../Input/Input.component"

const BarcodeInput = ({ barcode, setBarcode }) => {
	return (
		<Input
			id="barcode-input"
			label="Barcode"
			value={barcode}
			onChange={setBarcode}
		/>
	)
}

export default BarcodeInput
