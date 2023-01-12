import { combineReducers } from "@reduxjs/toolkit"
import theme from "../features/theme"
import login from "../features/login"
import user from "../features/user"
import sale from "../features/sale"
import orders from "../features/orders"
import cards from "../features/cards"
import dashboard from "../features/dashboard"
import dishes from "../features/dishes"
import table from "../features/table"
import tableProducts from "../features/tableProducts"
import loginApi from "../services/loginApi"
import productsApi from "../services/productsApi"
import userApi from "../services/userApi"
import salesApi from "../services/salesApi"
import orderApi from "../services/orderApi"
import cardApi from "../services/cardApi"
import printApi from "../services/printApi"
import dishApi from "../services/dishApi"
import tableApi from "../services/tablesApi"
import tableProductsApi from "../services/tableProductsApi"

const rootReducer = combineReducers({
	theme,
	login,
	user,
	sale,
	orders,
	cards,
	dashboard,
	dishes,
	table,
	tableProducts,
	[loginApi.reducerPath]: loginApi.reducer,
	[productsApi.reducerPath]: productsApi.reducer,
	[userApi.reducerPath]: userApi.reducer,
	[salesApi.reducerPath]: salesApi.reducer,
	[orderApi.reducerPath]: orderApi.reducer,
	[cardApi.reducerPath]: cardApi.reducer,
	[printApi.reducerPath]: printApi.reducer,
	[dishApi.reducerPath] : dishApi.reducer,
	[tableApi.reducerPath] : tableApi.reducer,
	[tableProductsApi.reducerPath]: tableProductsApi.reducer
})

export default rootReducer