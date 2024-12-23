import { createSlice } from "@reduxjs/toolkit"
import loginApi from "../services/loginApi"

const initialState = {
	loggedIn: false,
	token: false,
}

const getAuth = () => {
	const token = localStorage.getItem("token")
	const expirationDate = localStorage.getItem("expirationDate")

	if (token && expirationDate && new Date(expirationDate) > new Date()) {
		return {
			token,
			loggedIn: true,
		}
	}

	return initialState
}

const loginSlice = createSlice({
	name: "login",
	initialState: getAuth(),
	reducers: {
		logout: () => initialState,
	},
	extraReducers: (builder) => {
		builder.addMatcher(
			loginApi.endpoints.getAuth.matchFulfilled,
			(state, action) => {
				state.token = action.payload.token
				state.loggedIn = true
			}
		)
	},
})

export const { login, logout } = loginSlice.actions
export default loginSlice.reducer
