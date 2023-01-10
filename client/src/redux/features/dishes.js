import { createSlice } from "@reduxjs/toolkit"
import dishApi from "../services/dishApi"

const initialState = {
	dishes: [],
}

const dishSlice = createSlice({
	name: "dishes",
	initialState,
	reducers: {
		resetDishes: () => initialState,
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

export const { resetDishes } = dishSlice.actions

export default dishSlice.reducer
