export const useSession = () => {
	const user = JSON.parse(localStorage.getItem("user") || "null")
	const token = localStorage.getItem("token")
	const expirationDate = localStorage.getItem("expirationDate")

	const isExpired = new Date(expirationDate) < new Date()

	const logout = () => {
		localStorage.removeItem("token")
		localStorage.removeItem("expirationDate")
		localStorage.removeItem("user")
	}

	const isLoggedIn = user !== null && !isExpired && token !== null

	return { user, isLoggedIn, logout }
}
