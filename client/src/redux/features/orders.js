import { createSlice } from "@reduxjs/toolkit"
import orderApi from "../services/orderApi"

const initialState = {
	orders: [],
	order: [],
	ordersUpdate: 0,
	statusFilter: "all",
	locationFilter: "all",
}

const orderSlice = createSlice({
	name: "orders",
	initialState,
	reducers: {
		resetOrders: () => initialState,
		setStatusFilter: (state, action) => {
			state.statusFilter = action.payload
		},
		setLocationFilter: (state, action) => {
			state.locationFilter = action.payload
		},
		setUpdate: (state, action) => {
			state.ordersUpdate += 1
		},
	},
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

export const { resetOrders, setStatusFilter, setLocationFilter, setUpdate } =
	orderSlice.actions

export default orderSlice.reducer
