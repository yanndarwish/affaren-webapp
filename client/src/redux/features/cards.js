import { createSlice } from "@reduxjs/toolkit"
import cardApi from "../services/cardApi"

const initialState = {
	cards: [],
}

const cardSlice = createSlice({
	name: "card",
	initialState,
	reducers: {
		resetCards : () => initialState
	},
	extraReducers: (builder) => {
		builder.addMatcher(
			cardApi.endpoints.getCards.matchFulfilled,
			(state, action) => {
				state.cards = action.payload
			}
		)
	},
})

export const { updateCards, resetCards } = cardSlice.actions
export default cardSlice.reducer
