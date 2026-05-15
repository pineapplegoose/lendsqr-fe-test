import { useEffect, useState } from "react"
import { useLocation, Outlet } from "react-router"
import { Box, Flex } from "@chakra-ui/react"
import { NavBar } from "@/components/common/nav-bar"
import { Sidebar } from "@/components/common/side-bar"

export const Layout = () => {
    const { pathname } = useLocation()
    const [sidebarOpen, setSidebarOpen] = useState(false)

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: "smooth" })
        setSidebarOpen(false)
    }, [pathname])

    const isDashboard = pathname.includes("dashboard")

    return (
        <Box position={'relative'}>
            {isDashboard ? (
                <>
                    <NavBar onMenuToggle={() => setSidebarOpen(o => !o)} />

                    {sidebarOpen && (
                        <Box
                            display={{ base: 'block', lg: 'none' }}
                            position="fixed"
                            inset={0}
                            bg="blackAlpha.600"
                            zIndex={15}
                            onClick={() => setSidebarOpen(false)}
                        />
                    )}

                    <Flex position={{ md: 'absolute' }} top={{ base: '4rem', lg: '5rem' }} >
                        <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
                        <Flex
                            className='main-page'
                            position="absolute"
                            top={{ base: '4rem', lg: '0rem' }}
                            color="blue.900"
                            left={{ base: 0, lg: '18rem' }}
                            p={{ base: 4, md: 6, lg: 8 }}
                            w={{ base: '100%', lg: `calc(100vw - 18rem)` }}
                        >
                            <Outlet />
                        </Flex>
                    </Flex>
                </>
            ) : (
                <Outlet />
            )}
        </Box>
    )
}
