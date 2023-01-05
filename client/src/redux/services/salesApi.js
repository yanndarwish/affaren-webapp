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
		getYearSales: builder.query({
			query: ({ year }) => ({
				url: `sales-period/${year}`,
			}),
			providesTags: ["Sales"],
		}),
		getMonthSales: builder.query({
			query: ({ year, month }) => ({
				url: `sales-period/${year}/${month}`,
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
			query: ({ id, products, year, month }) => ({
				url: `sales/${id}/products`,
				method: "POST",
				body: { products, year, month },
			}),
		}),
		getSaleProducts: builder.query({
			query: ({ id }) => ({
				url: `sales/${id}/products`,
			}),
		}),
		getSalesProducts: builder.query({
			query: ({ month, year }) => ({
				url: `sales/${year}/${month}/products`,
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
	useGetYearSalesQuery,
	useGetMonthSalesQuery,
	useGetNextSaleIdQuery,
	useGetSaleQuery,
	useDeleteSaleMutation,
	usePostSaleProductsMutation,
	useGetSaleProductsQuery,
	useGetSalesProductsQuery,
	useDeleteSaleProductsMutation,
} = salesApi
export default salesApi
