import { useEffect } from "react"

import { useSale } from "../../../lib/providers/sale"
import { useNotify } from "../../../lib/hooks/useNotify"

import { Card } from "../../../components/ui/card"
import { ModalRefund } from "../../refund/components/modals"
import { ModalBookmark } from "../../bookmarks/components/modals/add"

import { CartHeader } from "./header"
import { CartContent } from "./content"

import { useCart } from "../hooks/use-cart"
import { useRefund } from "../../refund/hooks/use-refund"
import { useBookmarks } from "../../bookmarks/hooks/use-bookmarks"

export const Cart = ({ onDiscount, onBookmark }) => {
	const sale = useSale()
	const { modalRefund } = useRefund()
	const { notifySuccess } = useNotify()
	const {
		handleSelect,
		removeProduct,
		handleClearCart,
		handleQuantityUpdate,
		handleSelectedQuantityUpdate,
	} = useCart()
	const { modalBookmark, handleSaveToBookmarks } = useBookmarks({
		onBookmark,
	})

	// Discount Management
	const handleAddToDiscountList = (products) => {
		const alreadyInDiscountList = sale.discount.filter((p) =>
			products.some((product) => product.id === p.productId)
		)

		const newList = products.filter(
			(product) =>
				!alreadyInDiscountList.some((p) => p.productId === product.id)
		)

		const newDiscount = newList.map((product) => ({
			productId: product.id,
			productName: product.name,
			discountType: "percent",
			discountAmount: "0",
			originalPrice: product.price,
			reduction: 0,
			newPrice: product.price,
		}))

		sale.updateSale({ discount: [...sale.discount, ...newDiscount] })
		notifySuccess("Product added to discount list")
		onDiscount()
	}

	const handleBookmark = () => {
		modalBookmark.openModal()
	}

	const handleRefund = () => {
		modalRefund.openModal()
	}

	// Effects
	useEffect(() => {
		const updatedSelectedProducts = sale.selectedProducts.filter(
			(product) => !sale.paidProducts.some((p) => p.id === product.id)
		)
		sale.updateSale({ selectedProducts: updatedSelectedProducts })
	}, [sale.paidProducts])

	return (
		<Card className="h-full flex flex-col relative">
			<CartHeader
				sale={sale}
				onRefund={handleRefund}
				onBookmark={handleBookmark}
				onDiscount={() => handleAddToDiscountList(sale.products)}
				onClear={handleClearCart}
			/>
			<CartContent
				sale={sale}
				onSelect={handleSelect}
				onQuantityUpdate={handleQuantityUpdate}
				onSelectedQuantityUpdate={handleSelectedQuantityUpdate}
				onRemove={removeProduct}
				onAddToDiscount={handleAddToDiscountList}
			/>
			<ModalRefund controller={modalRefund} />
			<ModalBookmark
				controller={modalBookmark}
				onSubmit={handleSaveToBookmarks}
			/>
		</Card>
	)
}
