import { createSlice } from "@reduxjs/toolkit"
import { api } from "../services/api"

const initialState = {
	loggedIn: false,
	token: false,
}

const loginSlice = createSlice({
	name: "login",
	initialState,
	reducers: {
		logout: (state) => {
			state.loggedIn = false
		},
	},
	extraReducers: (builder) => {
		builder.addMatcher(
			api.endpoints.getAuth.matchFulfilled,
			(state, action) => {
				state.token = action.payload.token
				state.loggedIn = true
			}
		)
	},
})

export const { login, logout } = loginSlice.actions
export default loginSlice.reducer
