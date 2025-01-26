import {
	createContext,
	useContext,
	useState,
	useEffect,
	useCallback,
} from "react"

const SessionContext = createContext(null)

export const SessionProvider = ({ children }) => {
	const [user, setUser] = useState(() => {
		// Initialize from localStorage on first render
		return JSON.parse(localStorage.getItem("user") || "null")
	})

	const [token, setToken] = useState(() => {
		// Initialize from localStorage on first render
		return localStorage.getItem("token")
	})

	const [expirationDate, setExpirationDate] = useState(() => {
		// Initialize from localStorage on first render
		return localStorage.getItem("expirationDate")
	})

	// Add isLoggedIn as a state value that updates when dependencies change
	const [isLoggedIn, setIsLoggedIn] = useState(() => {
		const storedToken = localStorage.getItem("token")
		const storedUser = JSON.parse(localStorage.getItem("user") || "null")
		const storedExpiration = localStorage.getItem("expirationDate")
		return (
			storedToken !== null &&
			storedUser !== null &&
			storedExpiration !== null &&
			new Date(storedExpiration) > new Date()
		)
	})

	// Update isLoggedIn whenever dependencies change
	useEffect(() => {
		setIsLoggedIn(
			token !== null &&
				user !== null &&
				expirationDate !== null &&
				new Date(expirationDate) > new Date()
		)
	}, [token, user, expirationDate])

	const login = useCallback((user, token, expirationDate) => {
		// Update localStorage
		localStorage.setItem("user", JSON.stringify(user))
		localStorage.setItem("token", token)
		localStorage.setItem("expirationDate", expirationDate)

		// Update state
		setUser(user)
		setToken(token)
		setExpirationDate(expirationDate)
		setIsLoggedIn(true)
	}, [])

	const logout = useCallback(() => {
		// Clear localStorage
		localStorage.removeItem("token")
		localStorage.removeItem("expirationDate")
		localStorage.removeItem("user")

		// Clear state
		setUser(null)
		setToken(null)
		setExpirationDate(null)
		setIsLoggedIn(false)
	}, [])

	return (
		<SessionContext.Provider value={{ user, isLoggedIn, login, logout }}>
			{children}
		</SessionContext.Provider>
	)
}

export const useSession = () => {
	const context = useContext(SessionContext)
	if (!context) {
		throw new Error("useSession must be used within a SessionProvider")
	}
	return context
}
