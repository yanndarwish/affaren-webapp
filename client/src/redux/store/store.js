import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit"
import rootReducer from "../reducer/reducer"
import loginApi from "../services/loginApi"
import userApi from "../services/userApi"
import productsApi from "../services/productsApi"
import salesApi from "../services/salesApi"
import cardApi from "../services/cardApi"

const store = configureStore({
	reducer: rootReducer,
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware().concat(loginApi.middleware, userApi.middleware, productsApi.middleware, salesApi.middleware, cardApi.middleware),
})

export default store
