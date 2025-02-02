import React, { createContext, useContext, useState } from "react"
import { useNotify } from "../useNotify"
import { useQuery } from "../useQuery"
import { getNextSaleId } from "../../api"

const TestContext = createContext()

const TestProvider = ({ children }) => {
	const { notifyError } = useNotify()

	const [saleId, setSaleId] = useState(0)

	const queryGetSaleId = useQuery({
		queryFn: getNextSaleId,
		onError: () => {
			setSaleId(0)
			notifyError("An error occurred while getting the next sale id")
		},
	})

	const getSaleId = (customOnSuccess) => {
		queryGetSaleId.send(undefined, {
			onSuccess: (data) => {
				if (customOnSuccess) {
					customOnSuccess(data)
				}
			},
		})
	}

	return (
		<TestContext.Provider
			value={{
				saleId,
				getSaleId,
				isLoading: queryGetSaleId.isLoading,
			}}
		>
			{children}
		</TestContext.Provider>
	)
}

export const useTest = () => {
	const context = useContext(TestContext)
	if (!context) {
		throw new Error("useTest must be used within a TestProvider")
	}
	return context
}

export default TestProvider
