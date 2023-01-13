import { createSlice } from "@reduxjs/toolkit"
import salesApi from "../services/salesApi"
import userApi from "../services/userApi"

const initialState = {
	id: 0,
	date: 0,
	products: [],
	amount: "",
	paymentMethods: {},
	taxes: {},
	discount: [],
	user: "",
	table:""
}

const saleSlice = createSlice({
	name: "sale",
	initialState,
	reducers: {
		resetSale: () => initialState,
		setSaleId: (state, action) => {
			state.id = action.payload.id
		},
		setSaleDate: (state, action) => {
			state.date = action.payload.date
		},
		setSaleTable: (state, action) => {
			state.table = action.payload.table
		},
		addProduct: (state, action) => {
			state.products.push(action.payload.products)
		},
		updateProducts: (state, action) => {
			state.products = action.payload.products
		},
		setSaleAmount: (state, action) => {
			state.amount = action.payload.amount
		},
		setSalePaymentMethods: (state, action) => {
			state.paymentMethods = action.payload.paymentMethods
		},
		setTaxes: (state, action) => {
			state.taxes = action.payload.taxes
		},
		setDiscount: (state, action) => {
			state.discount.push(action.payload.discount)
		},
		setUser: (state, action) => {
			state.user = action.payload.user
		},
		setSale: (state, action) => {
			state = action.payload
		},
	},
	extraReducers: (builder) => {
		builder
			.addMatcher(
				salesApi.endpoints.getNextSaleId.matchFulfilled,
				(state, action) => {
					state.id = action.payload.nextSaleId
				}
			)
			.addMatcher(userApi.endpoints.getUser.matchFulfilled, (state, action) => {
				state.user = action.payload.user.user_first_name
			})
	},
})

export const {
	resetSale,
	setSale,
	setSaleId,
	setSaleDate,
	setSaleTable,
	addProduct,
	updateProducts,
	setSaleAmount,
	setSalePaymentMethods,
	setTaxes,
	setDiscount,
	setUser,
} = saleSlice.actions

export default saleSlice.reducer
