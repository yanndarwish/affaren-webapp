import { ShoppingCart } from "lucide-react"

export const EmptyCart = () => (
	<div className="flex flex-col items-center justify-center space-y-8 h-full">
		<ShoppingCart className="w-10 h-10 text-gray-200" />
		<p className="text-md text-gray-500">No products in cart</p>
	</div>
)
