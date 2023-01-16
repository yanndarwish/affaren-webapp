import Button from "../../common/Button/Button.component"
import { Gap } from "../../../assets/common/common.styles"

const SalesModalFooter = ({ deleteClick, printClick }) => {
	return (
		<Gap>
			<Button title="Delete Sale" color="error" onClick={deleteClick} />
			<Button title="Print Ticket" onClick={printClick} />
		</Gap>
	)
}

export default SalesModalFooter
