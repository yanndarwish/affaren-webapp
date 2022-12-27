import { createSlice } from "@reduxjs/toolkit"
import userApi from "../services/userApi"

const initialState = {
	user: {},
	users: [],
}

const userSlice = createSlice({
	name: "user",
	initialState,
	reducers: {
		userLogout: () => initialState,
	},
	extraReducers: (builder) => {
		builder
			.addMatcher(userApi.endpoints.getUser.matchFulfilled, (state, action) => {
				state.user = action.payload.user
			})
			.addMatcher(
				userApi.endpoints.getUsers.matchFulfilled,
				(state, action) => {
					state.users = action.payload.users
				}
			)
	},
})

export const { userLogout } = userSlice.actions
export default userSlice.reducer
