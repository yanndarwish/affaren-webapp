import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import store from "../store/store"

export const salesApi = createApi({
	reducerPath: "salesApi",
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
	tagTypes: ["Sales", "NextId"],
	endpoints: (builder) => ({
		postSale: builder.mutation({
			query: ({ sale }) => ({
				url: "sales",
				method: "POST",
				body: sale,
			}),
			invalidatesTags: ["Sales", "NextId"],
		}),
		updateSale: builder.mutation({
			query: ({ id, payload }) => ({
				url: `sales/${id}`,
				method: "PUT",
				body: payload,
			}),
			invalidatesTags: ["Sales"],
		}),
		getMonthSales: builder.query({
			query: ({ date }) => ({
				url: `sales-month/${date}`,
			}),
			providesTags: ["Sales"],
		}),
		getNextSaleId: builder.query({
			query: () => ({
				url: "sales-last",
			}),
			providesTags: ["NextId"],
		}),
		getSales: builder.query({
			query: () => ({
				url: "sales",
			}),
			providesTags: ["Sales"],
		}),
		getSale: builder.query({
			query: ({ id }) => ({
				url: `sales/${id}`,
			}),
		}),
		deleteSale: builder.mutation({
			query: ({ id }) => ({
				url: `sales/${id}`,
				method: "DELETE",
			}),
			invalidatesTags: ["Sales"],
		}),
		// sales_products
		postSaleProducts: builder.mutation({
			query: ({ id, products }) => ({
				url: `sales/${id}/products`,
				method: "POST",
				body: {products},
			}),
		}),
		getSalesProducts: builder.query({
			query: ({ id }) => ({
				url: `sales/${id}/products`,
			}),
		}),
		deleteSaleProducts: builder.mutation({
			query: ({ id }) => ({
				url: `sales/${id}/products`,
				method: "DELETE",
			}),
		}),
	}),
})

export const {
	usePostSaleMutation,
	useUpdateSaleMutation,
	useGetSalesQuery,
	useGetMonthSalesQuery,
	useGetNextSaleIdQuery,
	useGetSaleQuery,
	useDeleteSaleMutation,
	usePostSaleProductsMutation,
	useGetSalesProductsQuery,
	useDeleteSaleProductsMutation,
} = salesApi
export default salesApi
