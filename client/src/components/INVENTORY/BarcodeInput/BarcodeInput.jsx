import Input from "../../common/Input/Input.component"

const BarcodeInput = ({ barcode, setBarcode }) => {

	return <Input label="Barcode" value={barcode} onChange={setBarcode} />
}

export default BarcodeInput
