import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import store from "../store/store"

export const printApi = createApi({
	reducerPath: "printApi",
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
	endpoints: (builder) => ({
		postPrint: builder.mutation({
			query: (payload) => ({
				url: "print",
				method: "POST",
				body: payload
			}),
		}),
	}),
})

export const {
usePostPrintMutation
} = printApi
export default printApi
