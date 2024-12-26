import { configureStore } from "@reduxjs/toolkit"
import rootReducer from "../reducer/reducer"
import orderApi from "../services/orderApi"
import dishApi from "../services/dishApi"
import tableApi from "../services/tablesApi"
import tableProductsApi from "../services/tableProductsApi"

const store = configureStore({
	reducer: rootReducer,
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware().concat(
			orderApi.middleware,
			dishApi.middleware,
			tableApi.middleware,
			tableProductsApi.middleware
		),
})

export default store
