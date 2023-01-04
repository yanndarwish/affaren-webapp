import { createSlice } from "@reduxjs/toolkit"

const initialState = {
	date: "",
	dayArray: [],
	fullArray: [],
	detailArray: [],
}

const dashboardSlice = createSlice({
	name: "dashboard",
	initialState,
	reducers: {
		resetDashboard: () => initialState,
		setDate: (state, action) => {
			state.date = action.payload.date
		},
		setDayArray: (state, action) => {
			state.dayArray = action.payload.dayArray
		},
		setFullArray: (state, action) => {
			state.fullArray = action.payload.fullArray
		},
		setDetailArray: (state, action) => {
			state.detailArray = action.payload.detailArray
		},
	},
})

export const {
	resetDashboard,
	setDate,
	setDayArray,
	setFullArray,
	setDetailArray,
} = dashboardSlice.actions
export default dashboardSlice.reducer
