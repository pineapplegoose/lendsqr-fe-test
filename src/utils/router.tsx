import { lazy } from "react"
import { Layout } from "@/utils/layout"
import { Navigate } from "react-router"
import { ProtectedRoute } from "@/components/common/protected-route"

const Login = lazy(() => import("@/pages/login"))
const HomePage = lazy(() => import("@/pages/home-page"))
const Users = lazy(() => import("@/pages/users"))
const UserDetails = lazy(() => import("@/pages/user-details"))

const routes = [
    {
        path: "/",
        element: <Layout />,
        children: [
            { index: true, element: <Login /> },
            {
                element: <ProtectedRoute />,
                children: [
                    {
                        path: "dashboard",
                        children: [
                            { index: true, element: <HomePage /> },
                            { path: "users", element: <Users /> },
                            { path: "users/:id", element: <UserDetails /> },
                        ]
                    },
                ]
            }
        ],
    },
    { path: "*", element: <Navigate to="/" /> },
]
export default routes
