import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import store from "../store/store"
import { ip } from "../ip"


export const cardApi = createApi({
	reducerPath: "cardApi",
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
	tagTypes: ["Cards"],
	endpoints: (builder) => ({
		getCards: builder.query({
			query: () => ({
				url: "cards",
			}),
			providesTags: ["Cards"],
		}),
		deleteCard: builder.mutation({
			query: ({ id }) => ({
				url: `cards/${id}`,
				method: "DELETE",
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
	useGetCardsQuery,
	usePostCardMutation,
} = cardApi
export default cardApi
