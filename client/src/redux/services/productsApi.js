import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import store from "../store/store"
import { ip } from "../ip"

export const productsApi = createApi({
	reducerPath: "productsApi",
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
			query: ({ name, barcode, page }) => ({
				url: `products?${name ? `name=${name}` : ""}${
					barcode ? `&barcode=${barcode}` : ""
				}${page ? "&page=" + page + "&limit=25" : ""}`,
			}),
			providesTags: ["Products"],
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
    useGetProductsQuery,
    useUpdateProductsMutation, 
	useUpdateFullProductMutation,
    useDeleteProductMutation
} = productsApi
export default productsApi
