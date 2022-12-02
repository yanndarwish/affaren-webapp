import { combineReducers } from "@reduxjs/toolkit"
import theme from "../features/theme"
import login from "../features/login"
import user from "../features/user"
import sale from "../features/sale"
import loginApi from "../services/loginApi"
import productsApi from "../services/productsApi"
import userApi from "../services/userApi"
import salesApi from "../services/salesApi"

const rootReducer = combineReducers({
	theme,
	login,
	user,
	sale,
	[loginApi.reducerPath]: loginApi.reducer,
	[productsApi.reducerPath]: productsApi.reducer,
	[userApi.reducerPath]: userApi.reducer,
	[salesApi.reducerPath]: salesApi.reducer
})

export default rootReducer