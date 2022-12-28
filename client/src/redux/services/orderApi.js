import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import store from "../store/store"

export const orderApi = createApi({
	reducerPath: "orderApi",
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
	tagTypes: ["Orders, Order"],
	endpoints: (builder) => ({
		getOrders: builder.query({
			query: () => ({
				url: "orders",
			}),
			providesTags: ["Orders"],
		}),
		getOrder: builder.query({
			query: ({ id }) => ({
				url: `orders/${id}`,
			}),
			providesTags: ["Order"],
		}),
		updateOrder: builder.mutation({
			query: ({ id, payload }) => ({
				url: `orders/${id}`,
				method: "PUT",
				body: payload,
			}),
			invalidatesTags: ["Orders"],
		}),
		deleteOrder: builder.mutation({
			query: ({ id }) => ({
				url: `orders/${id}`,
				method: "DELETE",
			}),
			invalidatesTags: ["Orders"],
		}),
		postOrder: builder.mutation({
			query: (payload) => ({
				url: "orders",
				method: "POST",
				body: payload,
			}),
			invalidatesTags: ["Orders"],
		}),
	}),
})

export const {
	useGetOrdersQuery,
    useGetOrderQuery,
    useUpdateOrderMutation,
    useDeleteOrderMutation,
    usePostOrderMutation
} = orderApi
export default orderApi
