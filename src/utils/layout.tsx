import { useEffect } from "react"
import { useLocation, Outlet } from "react-router"
import { Box } from "@chakra-ui/react"

export const Layout = () => {
    const { pathname } = useLocation()
    useEffect(() => {
        window.scrollTo({ top: 0, behavior: "smooth" })
    }, [pathname])
    return (
        <Box>
            <Outlet />
        </Box>
    )
}
