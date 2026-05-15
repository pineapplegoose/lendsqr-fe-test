import { isAuthenticated } from "@/services/auth"
import { Navigate, Outlet } from "react-router"

export const ProtectedRoute = () => {
    return isAuthenticated() ? <Outlet /> : <Navigate to="/" replace />
}
