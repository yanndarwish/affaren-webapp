import { createSlice } from "@reduxjs/toolkit"
import tableProductsApi from "../services/tableProductsApi"

const initialState = {
    dayTablesProducts: [],
    monthTablesProducts: [],
    allTablesProducts: [],
	activeTablesProducts: [],
	targetTable: "",
	tableProducts: [],
	lunchUpdate: 0, 
	updateLunch: false
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
		setUpdateLunch: (state, action) => {
			state.updateLunch = action.payload.update
		},
		setLunchUpdate: (state, action) => {
			state.lunchUpdate += 1
		},
		setTargetTable: (state, action) => {
			state.targetTable = action.payload
		},
		updateActiveTablesProducts: (state, action) => {
			state.activeTablesProducts = action.payload
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
			.addMatcher(
				tableProductsApi.endpoints.getActiveTablesProducts.matchFulfilled,
				(state, action) => {
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

export const { resetTablesProducts, updateTableProducts, addTableProducts, setUpdateLunch, setLunchUpdate, setTargetTable, updateActiveTablesProducts } = tableProductsSlice.actions

export default tableProductsSlice.reducer
