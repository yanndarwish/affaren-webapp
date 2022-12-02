import { createSlice } from "@reduxjs/toolkit"
import { api } from "../services/api"

const initialState = {
	user: {},
	users: [],
}

const userSlice = createSlice({
	name: "user",
	initialState,
	reducers: {
		userLogout: (state) => {
			state = initialState
		},
	},
	extraReducers: (builder) => {
		builder
			.addMatcher(api.endpoints.getUser.matchFulfilled, (state, action) => {
				state.user = action.payload.user
			})
			.addMatcher(api.endpoints.getUsers.matchFulfilled, (state, action) => {
				state.users = action.payload.users
			})
	},
})

export const { userLogout } = userSlice.actions
export default userSlice.reducer
