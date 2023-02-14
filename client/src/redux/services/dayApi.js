import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import store from "../store/store"
import { ip } from "../ip"

export const dayApi = createApi({
	reducerPath: "dayApi",
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
	tagTypes: ["Day"],
	endpoints: (builder) => ({
		getDay: builder.mutation({
			query: ({ year, month, day }) => ({
				url: `cash-drawer/${year}/${month}/${day}`,
			}),
			providesTags: ["Day"],
		}),
		postDay: builder.mutation({
			query: (payload) => ({
				url: "cash-drawer",
				method: "POST",
				body: payload,
			}),
			invalidatesTags: ["Day"],
		}),
	}),
})

export const { useGetDayMutation, usePostDayMutation } = dayApi
export default dayApi
