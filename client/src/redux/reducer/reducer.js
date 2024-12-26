import { combineReducers } from "@reduxjs/toolkit"
import orders from "../features/orders"
import dishes from "../features/dishes"
import table from "../features/table"
import tableProducts from "../features/tableProducts"
import orderApi from "../services/orderApi"
import dishApi from "../services/dishApi"
import tableApi from "../services/tablesApi"
import tableProductsApi from "../services/tableProductsApi"

const rootReducer = combineReducers({
	orders,
	dishes,
	table,
	tableProducts,
	[orderApi.reducerPath]: orderApi.reducer,
	[dishApi.reducerPath] : dishApi.reducer,
	[tableApi.reducerPath] : tableApi.reducer,
	[tableProductsApi.reducerPath]: tableProductsApi.reducer,
})

export default rootReducer