import { createSlice } from "@reduxjs/toolkit"
import tableApi from "../services/tablesApi"

const initialState = {
	tables: [],
	activeTables: []
}

const tableSlice = createSlice({
	name: "table",
	initialState,
	reducers: {
		resetTables: () => initialState,
	},
	extraReducers: (builder) => {
		builder.addMatcher(
			tableApi.endpoints.getTables.matchFulfilled,
			(state, action) => {
				state.tables = action.payload
			}
		)
		.addMatcher(
			tableApi.endpoints.getActiveTables.matchFulfilled,
			(state, action) => {
				state.activeTables = action.payload
			}
		)
	},
})

export const { resetTables } =
	tableSlice.actions

export default tableSlice.reducer
