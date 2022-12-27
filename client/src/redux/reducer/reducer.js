import { combineReducers } from "@reduxjs/toolkit"
import theme from "../features/theme"
import login from "../features/login"
import user from "../features/user"
import sale from "../features/sale"
import cards from "../features/cards"
import dashboard from "../features/dashboard"
import loginApi from "../services/loginApi"
import productsApi from "../services/productsApi"
import userApi from "../services/userApi"
import salesApi from "../services/salesApi"
import cardApi from "../services/cardApi"

const rootReducer = combineReducers({
	theme,
	login,
	user,
	sale,
	cards,
	dashboard,
	[loginApi.reducerPath]: loginApi.reducer,
	[productsApi.reducerPath]: productsApi.reducer,
	[userApi.reducerPath]: userApi.reducer,
	[salesApi.reducerPath]: salesApi.reducer,
	[cardApi.reducerPath]: cardApi.reducer
})

export default rootReducer