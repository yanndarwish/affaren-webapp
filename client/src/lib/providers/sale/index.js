import { createContext, useState, useContext, useEffect } from "react"
import { getAmount, updateTaxes } from "../../pos"
import { getNextSaleId } from "../../api"
import { useQuery } from "../../hooks/useQuery"
import { useSession } from "../../hooks/useSession"
import { useNotify } from "../../hooks/useNotify"
import { v4 as uuidv4 } from "uuid"

const SaleContext = createContext()

const initialState = {
	id: 0,
	products: [],
	table: "",
	amount: "00.00",
	paymentMethods: {},
	taxes: {},
	discount: [],
	user: "",
	bookmarkId: "",
	selectedProducts: [],
	paidProducts: [],
	isRefund: false,
	isActiveDiscount: true,
}

// Helper function to get products to calculate
const getProductsToCalculate = (sale) => {
	const baseProducts =
		sale.selectedProducts.length > 0 ? sale.selectedProducts : sale.products

	return baseProducts.filter(
		(product) => !sale.paidProducts.some((p) => p.id === product.id)
	)
}

const SaleProvider = ({ children }) => {
	const [sale, setSale] = useState(() => {
		const storedSale = JSON.parse(localStorage.getItem("sale") || "null")
		if (storedSale) {
			const productsToCalculate = getProductsToCalculate(storedSale)
			return {
				...storedSale,
				date: storedSale.date || new Date().toISOString(),
				amount: getAmount(productsToCalculate),
				taxes: updateTaxes(productsToCalculate),
			}
		}
		return {
			...initialState,
			date: new Date().toISOString(),
		}
	})

	const [bookmarks, setBookmarks] = useState(() => {
		return JSON.parse(localStorage.getItem("bookmarks") || "{}")
	})

	const { isLoggedIn, user: sessionUser } = useSession()
	const { notifyError } = useNotify()

	const queryGetNextSaleId = useQuery({
		queryFn: getNextSaleId,
		onSuccess: (data) => {
			updateSale({ id: data.nextSaleId })
		},
		onError: () => {
			updateSale({ id: 0 })
			notifyError("An error occurred while getting the next sale id")
		},
	})

	// Master update function
	const updateSale = (updates) => {
		setSale((current) => {
			const newSale = { ...current, ...updates }

			// Automatically update amount and taxes when products change
			if (
				updates.products ||
				updates.selectedProducts ||
				updates.paidProducts
			) {
				const productsToCalculate = getProductsToCalculate(newSale)
				newSale.amount = getAmount(productsToCalculate)
				newSale.taxes = updateTaxes(productsToCalculate)
			}

			localStorage.setItem("sale", JSON.stringify(newSale))
			return newSale
		})
	}

	// Sale Management
	const resetSale = () => {
		const resetState = {
			...initialState,
			date: new Date().toISOString(),
			user: sessionUser?.firstName || "",
		}
		setSale(resetState)
		localStorage.removeItem("sale")
		if (isLoggedIn) {
			queryGetNextSaleId.send()
		}
	}

	// Bookmark Management
	const saveToBookmarks = ({ name, number }) => {
		const newBookmark = { sale: sale, name: name, number: number }
		const newBookmarks = { ...bookmarks, [uuidv4()]: newBookmark }
		setBookmarks(newBookmarks)
		localStorage.setItem("bookmarks", JSON.stringify(newBookmarks))
		return newBookmarks
	}

	const removeBookmark = (bookmarkId) => {
		const newBookmarks = { ...bookmarks }
		delete newBookmarks[bookmarkId]
		setBookmarks(newBookmarks)
		localStorage.setItem("bookmarks", JSON.stringify(newBookmarks))
	}

	const clearBookmarks = () => {
		setBookmarks({})
		localStorage.removeItem("bookmarks")
	}

	const applyBookmark = (bookmarkId) => {
		const bookmark = bookmarks[bookmarkId]
		if (bookmark) {
			updateSale({ ...bookmark.sale, id: sale.id, bookmarkId })
		}
		removeBookmark(bookmarkId)
	}

	// UI Helper
	const refocus = () => {
		document.getElementById("barcode-input")?.focus()
	}

	// Setup and cleanup
	useEffect(() => {
		if (isLoggedIn && sale.id === 0) {
			queryGetNextSaleId.send()
		}
	}, [isLoggedIn])

	useEffect(() => {
		if (sale.paidProducts.length) {
			queryGetNextSaleId.send()
		}
	}, [sale.paidProducts])

	return (
		<SaleContext.Provider
			value={{
				...sale,
				bookmarks,
				updateSale,
				resetSale,
				saveToBookmarks,
				removeBookmark,
				clearBookmarks,
				applyBookmark,
				refocus,
			}}
		>
			{children}
		</SaleContext.Provider>
	)
}

export const useSale = () => {
	const context = useContext(SaleContext)
	if (!context) {
		throw new Error("useSale must be used within a SaleProvider")
	}
	return context
}

export default SaleProvider
