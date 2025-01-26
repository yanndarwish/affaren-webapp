import { Navigate, useLocation, Outlet } from "react-router-dom"
import { useSession } from "../lib/hooks/useSession"

const ProtectedRoute = () => {
	const { isLoggedIn } = useSession()
	const location = useLocation()

	// Add public routes to an array
	const publicRoutes = ["/login", "/forgot-password"]
	const isPublicRoute = publicRoutes.includes(location.pathname)

	if (!isLoggedIn && !isPublicRoute) {
		return <Navigate to="/login" replace />
	}

	// If logged in and trying to access login page, redirect to POS
	if (isLoggedIn && isPublicRoute) {
		return <Navigate to="/pos" replace />
	}

	return <Outlet />
}

export default ProtectedRoute
