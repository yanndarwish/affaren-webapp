import { createSlice } from "@reduxjs/toolkit"
import tableProductsApi from "../services/tableProductsApi"

const initialState = {
    dayTablesProducts: [],
    monthTablesProducts: [],
    allTablesProducts: [],
	activeTablesProducts: [],
	tableProducts: [],
	updateOrder: false
}

const tableProductsSlice = createSlice({
	name: "tableProducts",
	initialState,
	reducers: {
		resetTablesProducts: () => initialState,
		updateTableProducts: (state, action) => {
			state.tableProducts = action.payload
		},
		addTableProducts: (state, action) => {
			state.tableProducts.push(action.payload) 
		},
		setUpdateOrder: (state, action) => {
			state.updateOrder = action.payload.order
		}
	},
	extraReducers: (builder) => {
		builder
			.addMatcher(
				tableProductsApi.endpoints.getDayTableProducts.matchFulfilled,
				(state, action) => {
					state.dayTablesProducts = action.payload
				}
			)
			.addMatcher(
				tableProductsApi.endpoints.getMonthTableProducts.matchFulfilled,
				(state, action) => {
					state.monthTablesProducts = action.payload
				}
			)
			.addMatcher(
				tableProductsApi.endpoints.getTablesProducts.matchFulfilled,
				(state, action) => {
					state.allTablesProducts = action.payload
				}
			)
			.addMatcher(
				tableProductsApi.endpoints.getActiveTablesProducts.matchFulfilled,
				(state, action) => {
					console.log("updating")
					state.activeTablesProducts = action.payload
				}
			)
			.addMatcher(
				tableProductsApi.endpoints.getTableProducts.matchFulfilled,
				(state, action) => {
					state.tableProducts = action.payload
				}
			)
	},
})

export const { resetTablesProducts, updateTableProducts, addTableProducts, setUpdateOrder } = tableProductsSlice.actions

export default tableProductsSlice.reducer
