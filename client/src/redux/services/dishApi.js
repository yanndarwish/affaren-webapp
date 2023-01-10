import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import store from "../store/store"

export const dishApi = createApi({
	reducerPath: "dishApi",
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
	tagTypes: ["Dishes"],
	endpoints: (builder) => ({
		getDishes: builder.query({
			query: () => ({
				url: "dishes",
			}),
			providesTags: ["Dishes"],
		}),
		getDish: builder.query({
			query: ({ id }) => ({
				url: `dishes/${id}`,
			}),
		}),
		updateDish: builder.mutation({
			query: ({ id, payload }) => ({
				url: `dishes/${id}`,
				method: "PUT",
				body: payload,
			}),
			invalidatesTags: ["Dishes"],
		}),
		deleteDish: builder.mutation({
			query: ({ id }) => ({
				url: `dishes/${id}`,
				method: "DELETE",
			}),
			invalidatesTags: ["Dishes"],
		}),
		postDish: builder.mutation({
			query: (payload) => ({
				url: "dishes",
				method: "POST",
				body: payload,
			}),
			invalidatesTags: ["Dishes"],
		}),
	}),
})

export const {
	useDeleteDishMutation,
    useGetDishQuery,
    useGetDishesQuery,
    useUpdateDishMutation,
    usePostDishMutation
} = dishApi
export default dishApi
