import { Stack } from "@mui/material"
import { Button } from "../../ui/button"
import { useQuery } from "../../../lib/hooks/useQuery"
import { getSaleProducts, printTicket } from "../../../lib/api"
import { useNotify } from "../../../lib/hooks/useNotify"
import ReceiptIcon from "@mui/icons-material/Receipt"
import { SaleProductSummary } from "./saleProductSummary"
import { SaleTaxeSummary } from "./saleTaxeSummary"
import { SaleTotalSummary } from "./saleTotalSummary"
import { useEffect, useState } from "react"
import { formatSaleProducts } from "../../../lib/sales"

export const SaleDetails = ({ sale, readOnly = false }) => {
	const { notifySuccess, notifyError } = useNotify()
	const [products, setProducts] = useState()

	const queryGetProducts = useQuery({
		queryFn: getSaleProducts,
		onSuccess: (data) => {
			setProducts(data)
		},
		onError: () => {
			notifyError("An error occured while fetching the sale's products")
		},
	})

	const queryPrintTicket = useQuery({
		queryFn: printTicket,
		onSuccess: () => {
			notifySuccess("Ticket printed")
		},
		onError: () => {
			notifyError("An error occured while printing the ticket")
		},
	})

	const handlePrintTicket = () => {
		const formatedSale = formatSale(sale)
		queryPrintTicket.send(formatedSale)
	}

	const formatSale = (sale) => {
		return sale
	}

	useEffect(() => {
		if (sale.id) {
			if (sale.paidProducts?.length > 0) {
				setProducts(formatSaleProducts(sale.paidProducts))
			} else if (sale.products) {
				setProducts(formatSaleProducts(sale.products))
			} else {
				queryGetProducts.send(sale.id)
			}
		}
	}, [sale?.id])

	return (
		<Stack className="space-y-4">
			{!readOnly && <SaleTotalSummary sale={sale} />}
			<Stack
				className={`space-y-4 overflow-scroll max-h-[calc(100vh-400px)] ${
					!readOnly ? "p-4 border border-gray-100 rounded-lg" : ""
				}`}
			>
				<SaleProductSummary products={products} readOnly={readOnly} />
				{!readOnly && <SaleTaxeSummary taxes={sale.taxes} detailed />}
			</Stack>
			{!readOnly && (
				<Button className="bg-orange-400" onClick={handlePrintTicket}>
					<ReceiptIcon />
				</Button>
			)}
		</Stack>
	)
}
