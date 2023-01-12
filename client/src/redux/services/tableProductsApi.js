import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import store from "../store/store"

export const tableProductsApi = createApi({
	reducerPath: "tableProductsApi",
	baseQuery: fetchBaseQuery({
		baseUrl: "http://localhost:4001/",
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
		"TableProducts, TablesProducts, DayTableProducts, MonthTableProducts",
	],
	endpoints: (builder) => ({
		getTablesProducts: builder.query({
			query: () => ({
				url: "table-products",
			}),
			providesTags: ["TablesProducts"],
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
		deleteTableProducts: builder.mutation({
			query: ({ id }) => ({
				url: `table-products/${id}`,
				method: "DELETE",
			}),
			invalidatesTags: [
				"TableProducts, TablesProducts, DayTableProducts, MonthTableProducts",
			],
		}),

		deleteProductTable: builder.mutation({
			query: ({ tableId, personId, dishId }) => ({
				url: `table-products/${tableId}/${personId}/${dishId}`,
				method: "DELETE",
			}),
			invalidatesTags: [
				"TableProducts, TablesProducts, DayTableProducts, MonthTableProducts",
			],
		}),
		postTableProduct: builder.mutation({
			query: (payload) => ({
				url: "table-products",
				method: "POST",
				body: payload,
			}),
			invalidatesTags: ["Tables"],
		}),
	}),
})

export const {
	useDeleteTableMutation,
	useGetTableQuery,
	useGetTablesQuery,
	usePostTableMutation,
	useUpdateTableMutation,
} = tableProductsApi
export default tableProductsApi
