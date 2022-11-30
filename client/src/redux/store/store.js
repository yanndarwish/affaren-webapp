import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit"
import rootReducer from "../reducer/reducer"
import { api } from "../services/api"

const store = configureStore({
	reducer: rootReducer,
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware().concat(api.middleware),
})

export default store
