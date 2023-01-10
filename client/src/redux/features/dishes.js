import { createSlice } from "@reduxjs/toolkit"
import dishApi from "../services/dishApi"

const initialState = {
	dishes: [],
	statusFilter: "true",
	typeFilter: "all",
}

const dishSlice = createSlice({
	name: "dishes",
	initialState,
	reducers: {
		resetDishes: () => initialState,
		setMenuStatusFilter: (state, action) => {
			state.statusFilter = action.payload
		},
		setMenuTypeFilter: (state, action) => {
			state.typeFilter = action.payload
		}
	},
	extraReducers: (builder) => {
		builder.addMatcher(
			dishApi.endpoints.getDishes.matchFulfilled,
			(state, action) => {
				state.dishes = action.payload
			}
		)
	},
})

export const { resetDishes, setMenuStatusFilter, setMenuTypeFilter } = dishSlice.actions

export default dishSlice.reducer
