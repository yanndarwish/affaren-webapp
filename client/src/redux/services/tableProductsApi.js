import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import store from "../store/store"
import { ip } from "../ip"

export const tableProductsApi = createApi({
	reducerPath: "tableProductsApi",
	baseQuery: fetchBaseQuery({
		baseUrl: `http://${ip}:4001/`,
		prepareHeaders: (headers) => {
			const token = store.getState().login?.token
			const role =
				store.getState().user?.user.user_is_admin === "true" ? "admin" : "none"

			if (token) {
				headers.set("x-access-token", token)
				headers.set("role", role)
				return headers
			}
			return headers
		},
	}),
	tagTypes: [
		"TableProducts",
		"TablesProducts",
		"DayTableProducts",
		"MonthTableProducts",
	],
	endpoints: (builder) => ({
		getTablesProducts: builder.query({
			query: () => ({
				url: "table-products",
			}),
			providesTags: ["TablesProducts"],
		}),
		getActiveTablesProducts: builder.query({
			query: () => ({
				url: "table-products/active",
			}),
			// providesTags: ["TablesProducts"],
		}),
		getDayTableProducts: builder.query({
			query: ({ year, month, day }) => ({
				url: `table-products/${year}/${month}/${day}`,
			}),
			providesTags: ["DayTableProducts"],
		}),
		getMonthTableProducts: builder.query({
			query: ({ year, month }) => ({
				url: `table-products/${year}/${month}`,
			}),
			providesTags: ["MonthTableProducts"],
		}),
		getTableProducts: builder.query({
			query: ({ id }) => ({
				url: `table-products/${id}`,
			}),
			providesTags: ["TableProducts"],
		}),
		patchProductTable: builder.mutation({
			query: ({ tableId, personId, dishId }) => ({
				url: `table-products/${tableId}/${personId}/${dishId}`,
				method: "PATCH",
			}),
			invalidatesTags: [
				"TableProducts",
				"TablesProducts",
				"DayTableProducts",
				"MonthTableProducts",
			],
		}),
		patchProductTableStatus: builder.mutation({
			query: ({ tableId, personId, dishId }) => ({
				url: `table-products/status/${tableId}/${personId}/${dishId}`,
				method: "PATCH",
			}),
			invalidatesTags: [
				"TableProducts",
				"TablesProducts",
				"DayTableProducts",
				"MonthTableProducts",
			],
		}),
		patchTableProductsStatus: builder.mutation({
			query: ({ tableId }) => ({
				url: `table-products/table/status/${tableId}`,
				method: "PATCH",
			}),
			invalidatesTags: [
				"TableProducts",
				"TablesProducts",
				"DayTableProducts",
				"MonthTableProducts",
			],
		}),
		deleteTableProducts: builder.mutation({
			query: ({ id }) => ({
				url: `table-products/${id}`,
				method: "DELETE",
			}),
		}),

		deleteProductTable: builder.mutation({
			query: ({ tableId, personId, dishId }) => ({
				url: `table-products/${tableId}/${personId}/${dishId}`,
				method: "DELETE",
			}),
			invalidatesTags: [
				"TableProducts",
				"TablesProducts",
				"DayTableProducts",
				"MonthTableProducts",
			],
		}),
		postTableProduct: builder.mutation({
			query: (payload) => ({
				url: "table-products",
				method: "POST",
				body: payload,
			}),
			invalidatesTags: [
				"TableProducts",
				"TablesProducts",
				"DayTableProducts",
				"MonthTableProducts",
			],
		}),
	}),
})

export const {
	useDeleteProductTableMutation,
	useDeleteTableProductsMutation,
	usePatchProductTableMutation,
	usePatchTableProductsStatusMutation,
	usePatchProductTableStatusMutation,
	useGetDayTableProductsQuery,
	useGetMonthTableProductsQuery,
	useGetActiveTablesProductsQuery,
	useGetTableProductsQuery,
	useGetTablesProductsQuery,
	usePostTableProductMutation,
} = tableProductsApi
export default tableProductsApi
