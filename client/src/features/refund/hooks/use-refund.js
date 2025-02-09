import { useState } from "react"
import { useSale } from "../../../lib/providers/sale"
import { useModal } from "../../../components/shared/modal"

export const useRefund = () => {
	const sale = useSale()
	const modalRefund = useModal()
	const [refundValue, setRefundValue] = useState("00.00")

	const applyRefund = () => {
		const newProduct = {
			id: "refund",
			name: "Refund",
			quantity: 1,
			price: -refundValue,
			taxe: 5.5,
			category: 1,
		}
		sale.updateSale({
			products: [...sale.products, newProduct],
			isRefund: true,
		})
	}

	const resetRefund = () => {
		setRefundValue("00.00")
	}

	return { refundValue, setRefundValue, applyRefund, resetRefund, modalRefund }
}
