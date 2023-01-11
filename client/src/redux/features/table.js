import { createSlice } from "@reduxjs/toolkit"
import tableApi from "../services/tablesApi"

const initialState = {
	tables: [],
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
	},
})

export const { resetTables } =
	tableSlice.actions

export default tableSlice.reducer
