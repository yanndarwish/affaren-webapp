import { useConfig } from "../../../../lib/hooks/useConfig"

import { Button } from "../../../../components/ui/button"
import { Modal } from "../../../../components/shared/modal"
import { NumPad } from "../../../../components/common/NumPad/NumPad"

import { useRefund } from "../../hooks/use-refund"

export const ModalRefund = ({ controller }) => {
	const { config } = useConfig()
	const { refundValue, setRefundValue, applyRefund, resetRefund } = useRefund()

	const handleChange = (value) => {
		let currentValue = refundValue.replace(".", "")

		let newValue = (currentValue + value).replace(/^0+/, "")

		while (newValue.length < 4) {
			newValue = "0" + newValue
		}

		newValue = newValue.slice(0, -2) + "." + newValue.slice(-2)

		setRefundValue(newValue)
	}

	const handleCorrect = () => {
		if (refundValue === "00.00") return

		let digits = refundValue.replace(".", "")
		digits = digits.slice(0, -1)
		while (digits.length < 4) {
			digits = "0" + digits
		}
		const newPrice = digits.slice(0, -2) + "." + digits.slice(-2)
		setRefundValue(newPrice)
	}

	const handleApplyRefund = () => {
		applyRefund()
		handleClose()
	}

	const handleClose = () => {
		controller.closeModal()
		resetRefund()
	}

	return (
		<Modal open={controller.open} title="Refund" handleClose={handleClose}>
			<NumPad
				display
				value={refundValue}
				unit={<config.general.currency.symbol className="w-5 h-5" />}
				onClick={handleChange}
				onCorrect={handleCorrect}
			/>
			<Button onClick={handleApplyRefund}>Apply Refund</Button>
		</Modal>
	)
}
