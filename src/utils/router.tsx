import { lazy } from "react"
import { Layout } from "@/utils/layout"
import { Navigate } from "react-router"

const Login = lazy(() => import("@/pages/login"))
const Dashboard = lazy(() => import("@/pages/dashboard"))

const routes = [
    {
        path: "/",
        element: <Layout />,
        children: [
            { index: true, element: <Login /> },
            { path: "dashboard", element: <Dashboard /> },
        ],
    },
    { path: "*", element: <Navigate to="/" /> },
]
export default routes

