import { useState } from "react"

export const useQuery = ({
	queryFn,
	onSuccess = () => null,
	onError = () => null,
}) => {
	const [isLoading, setIsLoading] = useState(false)

	const send = (params) => {
		setIsLoading(true)
		queryFn(params)
			.then((data) => onSuccess(data))
			.catch((error) => {
				onError(error)
			})
			.finally(() => setIsLoading(false))
	}

	return { isLoading, send }
}
