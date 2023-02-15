import { createSlice } from "@reduxjs/toolkit"
import dayApi from "../services/dayApi"

const initialState = {
	cash: 0,
	todayCash: 0,
	todayCard: 0,
	todayCheck: 0
}

const daySlice = createSlice({
	name: "day",
	initialState,
	reducers: {
		resetCash: () => initialState,
		setCash: (state, action) => {
			state.cash = action.payload.cash
		},
		setTodayCash: (state, action) => {
			state.todayCash = action.payload.cash
		},
		setTodayCard: (state, action) => {
			state.todayCard = action.payload.card
		},
		setTodayCheck: (state, action) => {
			state.todayCheck = action.payload.check
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

export const {resetCash, setCash, setTodayCash, setTodayCard, setTodayCheck } = daySlice.actions
export default daySlice.reducer
