import { createSlice } from "@reduxjs/toolkit"
import dayApi from "../services/dayApi"

const initialState = {
	cash: 0,
}

const daySlice = createSlice({
	name: "day",
	initialState,
	reducers: {
		resetCash: () => initialState,
		setCash: (state, action) => {
			state.cash = action.payload.cash
		},
	},
	extraReducers: (builder) => {
		builder.addMatcher(
			dayApi.endpoints.getDay.matchFulfilled,
			(state, action) => {
				state.cash = action.payload.drawer
			}
		)
	},
})

export const {resetCash, setCash } = daySlice.actions
export default daySlice.reducer
