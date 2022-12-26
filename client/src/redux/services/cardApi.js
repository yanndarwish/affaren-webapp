import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import store from "../store/store"

export const cardApi = createApi({
	reducerPath: "userApi",
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
	tagTypes: ["Cards"],
	endpoints: (builder) => ({
		getCards: builder.mutation({
			query: (payload) => ({
				url: "cards",
				method: "POST",
				body: payload,
			}),
			providesTags: ["Cards"],
		}),
		deleteCard: builder.mutation({
			query: (payload) => ({
				url: "cards",
				method: "DELETE",
				body: payload,
			}),
			invalidatesTags: ["Cards"],
		}),
		postCard: builder.mutation({
			query: (payload) => ({
				url: "cards",
				method: "POST",
				body: payload,
			}),
			invalidatesTags: ["Cards"],
		}),
	}),
})

export const {
	useDeleteCardMutation,
    useGetCardsMutation,
    usePostCardMutation
} = cardApi
export default cardApi
