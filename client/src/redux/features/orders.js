import { createSlice } from "@reduxjs/toolkit"
import orderApi from "../services/orderApi"

const initialState = {
	orders: [],
	order: [],
}

const orderSlice = createSlice({
	name: "orders",
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addMatcher(
				orderApi.endpoints.getOrders.matchFulfilled,
				(state, action) => {
					state.orders = action.payload
				}
			)
			.addMatcher(
				orderApi.endpoints.getOrder.matchFulfilled,
				(state, action) => {
					state.order = action.payload
				}
			)
	},
})

export const {} = orderSlice.actions

export default orderSlice.reducer
