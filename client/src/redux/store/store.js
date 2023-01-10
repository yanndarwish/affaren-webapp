import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit"
import rootReducer from "../reducer/reducer"
import loginApi from "../services/loginApi"
import userApi from "../services/userApi"
import productsApi from "../services/productsApi"
import salesApi from "../services/salesApi"
import orderApi from "../services/orderApi"
import cardApi from "../services/cardApi"
import printApi from "../services/printApi"
import dishApi from "../services/dishApi"

const store = configureStore({
	reducer: rootReducer,
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware().concat(
			loginApi.middleware,
			userApi.middleware,
			productsApi.middleware,
			salesApi.middleware,
			cardApi.middleware,
			orderApi.middleware,
			printApi.middleware,
			dishApi.middleware
		),
})

export default store
