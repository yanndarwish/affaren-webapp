import { combineReducers } from "@reduxjs/toolkit"
import theme from "../features/theme"
import login from "../features/login"
import user from "../features/user"
import { api } from "../services/api"

const rootReducer = combineReducers({
	theme,
	login,
	user,
	[api.reducerPath]: api.reducer,
})

export default rootReducer