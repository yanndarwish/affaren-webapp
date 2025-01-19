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
	date: "",
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
}

// Helper function to get products to calculate
const getProductsToCalculate = (sale) => {
	if (sale.selectedProducts.length > 0) {
		return sale.selectedProducts
	}

	const baseProducts = sale.products

	return baseProducts.reduce((acc, product) => {
		// Find the original product to get total quantity
		const originalProduct = sale.products.find((p) => p.id === product.id)
		const paidProduct = sale.paidProducts.find((p) => p.id === product.id)

		// If not paid at all, include the selected product as is
		if (!paidProduct) {
			return [...acc, product]
		}

		// If fully paid (compared to original quantity), don't include
		if (paidProduct.quantity >= originalProduct.quantity) {
			return acc
		}

		// For partially paid, include the selected product
		// (the quantity is already adjusted in the selection)
		return [
			...acc,
			{ ...product, quantity: originalProduct.quantity - paidProduct.quantity },
		]
	}, [])
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
	const [tables, setTables] = useState(() => {
		return JSON.parse(localStorage.getItem("tables") || "{}")
	})

	const { isLoggedIn, user: sessionUser } = useSession()

	const getNextSaleId = () => {
		updateSale({ id: uuidv4() })
	}

	// Master update function
	const updateSale = (updates) => {
		setSale((current) => {
			const newSale = { ...current, ...updates }

			const totalProductsQuantity = newSale.products.reduce(
				(total, product) => total + product.quantity,
				0
			)

			const totalPaidQuantity = newSale.paidProducts.reduce(
				(total, product) => total + product.quantity,
				0
			)

			if (
				totalPaidQuantity === totalProductsQuantity &&
				newSale.amount !== "00.00"
			) {
				resetSale()
			}
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
			date: "",
			user: sessionUser?.firstName || "",
		}
		setSale(resetState)
		localStorage.removeItem("sale")
		if (isLoggedIn) {
			getNextSaleId()
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

	const addTable = (id, people) => {
		const newTable = {
			id,
			people,
			products: [],
		}

		const newTables = { ...tables, [uuidv4()]: newTable }
		setTables(newTables)
		localStorage.setItem("tables", JSON.stringify(newTables))
	}

	const removeTable = (uuid) => {
		const newTables = { ...tables }
		delete newTables[uuid]
		setTables(newTables)
		localStorage.setItem("tables", JSON.stringify(newTables))
	}

	const addPerson = (uuid) => {
		const newTables = { ...tables }
		newTables[uuid].people++

		setTables(newTables)
		localStorage.setItem("tables", JSON.stringify(newTables))
	}

	const removePerson = (uuid) => {
		const newTables = { ...tables }
		newTables[uuid].people--
		setTables(newTables)
		localStorage.setItem("tables", JSON.stringify(newTables))
	}

	const addTableProduct = (uuid, product) => {
		const newTables = { ...tables }

		// check if product already exists
		const productExists = newTables[uuid].products.find(
			(p) => p.id === product.id
		)
		if (productExists) {
			productExists.quantity++
		} else {
			newTables[uuid].products.push({ ...product, quantity: 1 })
		}
		setTables(newTables)
		localStorage.setItem("tables", JSON.stringify(newTables))
	}

	const updateTableProductQty = (uuid, productId, qty) => {
		const newTables = { ...tables }
		const product = newTables[uuid].products.find((p) => p.id === productId)
		product.quantity += qty

		if (product.quantity <= 0) {
			newTables[uuid].products = newTables[uuid].products.filter(
				(p) => p.id !== productId
			)
		}

		setTables(newTables)
		localStorage.setItem("tables", JSON.stringify(newTables))
	}

	const applyTable = (uuid) => {
		const table = tables[uuid]
		if (table) {
			updateSale({
				products: table.products,
				table: uuid,
			})
		}
	}

	// UI Helper
	const refocus = () => {
		document.getElementById("barcode-input")?.focus()
	}

	// Setup and cleanup
	useEffect(() => {
		if (isLoggedIn && sale.id === 0) {
			getNextSaleId()
		}
	}, [isLoggedIn])

	useEffect(() => {
		if (sale.paidProducts.length) {
			getNextSaleId()
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
				getNextSaleId,
				addTable,
				removeTable,
				addPerson,
				removePerson,
				addTableProduct,
				updateTableProductQty,
				applyTable,
				tables,
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
