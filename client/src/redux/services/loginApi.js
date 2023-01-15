import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

export const loginApi = createApi({
	reducerPath: "loginApi",
	baseQuery: fetchBaseQuery({
		baseUrl: "http://192.168.1.41:4001/",
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
				body: payload,
			}),
		}),
		forgotPassword: builder.mutation({
			query: (payload) => ({
				url: "forgot-password",
				method: "POST",
				body: payload,
			}),
		}),
	}),
})

export const {
	useGetAuthMutation,
	useCheckPasswordMutation,
	useForgotPasswordMutation
} = loginApi
export default loginApi
