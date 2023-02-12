import { createSlice } from "@reduxjs/toolkit"

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
        } 
	},
})

export const {resetCash, setCash } = daySlice.actions
export default daySlice.reducer
