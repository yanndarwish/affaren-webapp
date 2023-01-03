import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

export const loginApi = createApi({
	reducerPath: "loginApi",
	baseQuery: fetchBaseQuery({
		baseUrl: "http://localhost:4001/",
	}),
	tagTypes: ["Sales"],
	endpoints: (builder) => ({
		getAuth: builder.mutation({
			query: (payload) => ({
				url: "login",
				method: "POST",
				body: payload,
			}),
		}),
		checkPassword: builder.mutation({
			query: (payload) => ({
				url: "password",
				method: "POST",
				body: payload
			})
		})
	}),
})

export const {
	useGetAuthMutation,
	useCheckPasswordMutation
} = loginApi
export default loginApi
