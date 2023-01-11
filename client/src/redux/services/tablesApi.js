import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import store from "../store/store"

export const tableApi = createApi({
	reducerPath: "tableApi",
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
	tagTypes: ["Tables"],
	endpoints: (builder) => ({
		getTables: builder.query({
			query: () => ({
				url: "tables",
			}),
			providesTags: ["Tables"],
		}),
		getTable: builder.query({
			query: ({ id }) => ({
				url: `tables/${id}`,
			}),
		}),
		updateTable: builder.mutation({
			query: ({ id, payload }) => ({
				url: `tables/${id}`,
				method: "PUT",
				body: payload,
			}),
			invalidatesTags: ["Tables"],
		}),
		deleteTable: builder.mutation({
			query: ({ id }) => ({
				url: `tables/${id}`,
				method: "DELETE",
			}),
			invalidatesTags: ["Tables"],
		}),
		postTable: builder.mutation({
			query: (payload) => ({
				url: "tables",
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
    useUpdateTableMutation
} = tableApi
export default tableApi
