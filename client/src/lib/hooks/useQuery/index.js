import { useState } from "react"

export const useQuery = ({
	queryFn,
	onSuccess = () => null,
	onError = () => null,
}) => {
	const [isLoading, setIsLoading] = useState(false)

	const send = (params, options = {}) => {
		setIsLoading(true)
		queryFn(params)
			.then((data) => {
				onSuccess(data)
				if (options.onSuccess) {
					options.onSuccess(data)
				}
			})
			.catch((error) => {
				onError(error)
				if (options.onError) {
					options.onError(error)
				}
			})
			.finally(() => setIsLoading(false))
	}

	return { isLoading, send }
}
