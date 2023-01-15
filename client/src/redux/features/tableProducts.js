import { createSlice } from "@reduxjs/toolkit"
import tableProductsApi from "../services/tableProductsApi"

const initialState = {
    dayTablesProducts: [],
    monthTablesProducts: [],
    allTablesProducts: [],
	tableProducts: [],
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
	},
})

export const { resetTablesProducts, updateTableProducts, addTableProducts } = tableProductsSlice.actions

export default tableProductsSlice.reducer
