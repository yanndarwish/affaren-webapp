const baseUrl = process.env.REACT_APP_API_URL

const query = async (url, method, options) => {
	const token = localStorage.getItem("token")

	try {
		const response = await fetch(baseUrl + url, {
			method,
			headers: {
				Authorization: `Bearer ${token}`,
				"Content-Type": "application/json",
			},
			...options,
		})

		if (response.status < 200 || response.status >= 300) {
			throw new Error(response.statusText)
		}

		if (!url.includes("print")) {
			return response.json()
		} else {
			return response
		}
	} catch (error) {
		console.log(error)
		throw error
	}
}

const get = async (url, options) => {
	const response = await query(url, "GET", options)
	return response
}

const post = async (url, body, options) => {
	const response = await query(url, "POST", {
		body: JSON.stringify(body),
		...options,
	})
	return response
}

const put = async (url, body, options) => {
	const response = await query(url, "PUT", {
		body: JSON.stringify(body),
		...options,
	})
	return response
}

const patch = async (url, body, options) => {
	const response = await query(url, "PATCH", {
		body: JSON.stringify(body),
		...options,
	})
	return response
}

const del = async (url, options) => {
	const response = await query(url, "DELETE", options)
	return response
}

export const getNextSaleId = async () => {
	const response = await get("sales-period/last")
	return response
}

export const getProducts = async ({ pagination, barcode, name }) => {
	const paginationParams = getPagination(pagination)
	const barcodeParams = getBarcodeParams(barcode)
	const nameParams = getNameParams(name)

	const response = await get(
		`products?${paginationParams}&${barcodeParams}&${nameParams}`
	)
	return response
}

const getBarcodeParams = (barcode) => {
	if (!barcode || barcode === "") return ""

	return `barcode=${barcode}`
}

const getNameParams = (name) => {
	if (!name || name === "") return ""

	return `name=${name}`
}

export const getProductByBarcode = async (barcode) => {
	const response = await get(`products?barcode=${barcode}`)
	return response
}

export const deleteProduct = async (id) => {
	const response = await del(`products/${id}`)
	return response
}

export const openDrawer = async () => {
	const response = await post("print/drawer")
	console.log(response)
	return response
}

export const printTicket = async (sale) => {
	const response = await post("print", sale)
	return response
}

export const printCashTicket = async (body) => {
	const response = await post("print/cash", body)
	return response
}

export const postSale = async ({ sale }) => {
	const response = await post("sales", sale)
	return response
}

export const postSaleProducts = async ({ id, products, year, month, day }) => {
	const response = await post(`sales/${id}/products`, {
		products,
		year,
		month,
		day,
	})
	return response
}

export const patchProductTableStatus = async ({
	tableId,
	personId,
	dishId,
	status,
}) => {
	const response = await patch(
		`table-products/status/${tableId}/${personId}/${dishId}`,
		{
			status,
		}
	)
	return response
}

export const updateTableStatus = async ({ id, body }) => {
	const response = await patch(`tables/${id}`, {
		body,
	})
	return response
}

export const createProduct = async (body) => {
	const response = await post("products", body)
	return response
}

export const updateProduct = async ({ id, body }) => {
	const response = await patch(`products/${id}`, body)
	return response
}

export const putProduct = async ({ id, body }) => {
	const response = await put(`products/${id}`, body)
	return response
}

export const getDaySales = async ({ year, month, day }) => {
	const response = await get(`sales-period/${year}/${month}/${day}`)
	return response
}

export const auth = async (body) => {
	const response = await post("login", body)
	return response
}

export const getDayCash = async ({ year, month, day }) => {
	const response = await get(`cash-drawer/${year}/${month}/${day}`)
	return response
}

export const postDayCash = async (body) => {
	const response = await post("cash-drawer", body)
	return response
}

export const getProductCards = async () => {
	const response = await get("cards")
	return response
}

export const deleteCard = async (id) => {
	const response = await del(`cards/${id}`)
	return response
}

export const createProductCard = async (body) => {
	const response = await post("cards", body)
	return response
}

export const getSales = async ({ pagination, dateFilters }) => {
	const paginationParams = getPagination(pagination)
	const dateFiltersParams = getDateFilters(dateFilters)

	const response = await get(`sales?${paginationParams}&${dateFiltersParams}`)
	return response
}

export const getMonthSales = async ({ year, month }) => {
	const response = await get(`sales/month?year=${year}&month=${month}`)
	return response
}

export const getDaySalesProducts = async ({ year, month, day }) => {
	const response = await get(`sales/${year}/${month}/${day}/products`)
	return response
}

export const getMonthSalesProducts = async ({ year, month }) => {
	const response = await get(`sales/${year}/${month}/products`)
	return response
}

export const deleteSale = async (id) => {
	const response = await del(`sales/${id}`)
	return response
}

export const getSaleProducts = async (id) => {
	const response = await get(`sales/${id}/products`)
	return response
}

const getPagination = (pagination) => {
	if (!pagination) return ""

	const { pageSize, pageNumber } = pagination

	const offset = (pageNumber - 1) * pageSize
	const limit = pageSize

	return `offset=${offset}&limit=${limit}`
}

const getDateFilters = (date) => {
	const { year, month, day } = date

	return `year=${year}&month=${month}&day=${day}`
}

export const forgotPassword = async (body) => {
	const response = await post("password/forgot", body)
	return response
}
