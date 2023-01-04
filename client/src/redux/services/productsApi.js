import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import store from "../store/store"

export const productsApi = createApi({
	reducerPath: "productsApi",
	baseQuery: fetchBaseQuery({
		baseUrl: "http://localhost:4001/",
		prepareHeaders: (headers) => {
			const token = store.getState().login?.token
			const role =
				store.getState().user?.user.user_is_admin === "true" ? "admin" : "none"

			console.log(role)
			if (token) {
				headers.set("x-access-token", token)
				headers.set("role", role)
				return headers
			}
			return headers
		},
	}),
	tagTypes: ["Products", "Product"],
	endpoints: (builder) => ({
		postProduct: builder.mutation({
			query: (payload) => ({
				url: "products",
				method: "POST",
				body: payload,
			}),
			invalidatesTags: ["Products"],
		}),
		updateProducts: builder.mutation({
			query: ({ quantity, id }) => ({
				url: `products/${id}`,
				method: "PATCH",
				body: { quantity },
			}),
			invalidatesTags: ["Products", "Product"],
		}),
		updateFullProduct: builder.mutation({
			query: ({ payload, id }) => ({
				url: `products/${id}`,
				method: "PUT",
				body: payload,
			}),
			invalidatesTags: ["Products"],
		}),
		getProducts: builder.query({
			query: () => ({
				url: "products",
			}),
			providesTags: ["Products"],
		}),
		getProduct: builder.query({
			query: ({ barcode }) => ({
				url: `products/${barcode}`,
			}),
			providesTags: ["Product"],
		}),
		deleteProduct: builder.mutation({
			query: ({ id }) => ({
				url: `products/${id}`,
				method: "DELETE",
			}),
			invalidatesTags: ["Products"],
		}),
	}),
})

export const {
	usePostProductMutation, 
    useGetProductQuery, 
    useGetProductsQuery, 
    useUpdateProductsMutation, 
	useUpdateFullProductMutation,
    useDeleteProductMutation
} = productsApi
export default productsApi
