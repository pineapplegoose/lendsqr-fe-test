import { useEffect } from "react"
import { useLocation, Outlet } from "react-router"
import { Box, Flex } from "@chakra-ui/react"
import { NavBar } from "@/components/common/nav-bar"
import { Sidebar } from "@/components/common/side-bar"

export const Layout = () => {
    const { pathname } = useLocation()
    useEffect(() => {
        window.scrollTo({ top: 0, behavior: "smooth" })
    }, [pathname])

    const isDashboard = pathname.includes("dashboard")
    return (
        <Box>
            {isDashboard ? <> < NavBar />
                <Flex h={'full'} minH={'150vh'}>
                    <Sidebar />
                    <Flex
                        position="absolute"
                        //justify={'center'}
                        color="blue.900"
                        top="6rem"
                        left="18rem"
                        p={{ base: 4, md: 8 }}
                        w={`calc(100vw - 18rem)`}>
                        <Outlet />
                    </Flex>
                </Flex></> : <Outlet />}
        </Box>
    )
}
