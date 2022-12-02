import { combineReducers } from "@reduxjs/toolkit"
import theme from "../features/theme"
import login from "../features/login"
import user from "../features/user"
import { api } from "../services/api"
import productsApi from "../services/productsApi"

const rootReducer = combineReducers({
	theme,
	login,
	user,
	[api.reducerPath]: api.reducer,
	[productsApi.reducerPath]: productsApi.reducer
})

export default rootReducer