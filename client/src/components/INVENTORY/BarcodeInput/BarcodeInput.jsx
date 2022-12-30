import Input from "../../common/Input/Input.component"

const BarcodeInput = ({ barcode, setBarcode }) => {

	return <Input id="inventory-barcode-input" label="Barcode" value={barcode} onChange={setBarcode} />
}

export default BarcodeInput
