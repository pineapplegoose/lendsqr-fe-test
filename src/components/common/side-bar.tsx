import { sideBarLinks } from "@/utils/data"
import { Image, Tabs } from "@chakra-ui/react"
import { useLocation, useNavigate } from "react-router"
import styles from "@/styles/side-bar.module.scss"

export const Sidebar = ({ onClose }: { onClose?: () => void }) => {
    const pathname = useLocation().pathname
    const navigate = useNavigate()
    //const { logoutUser } = useAuthStore()

    const getActiveTab = () => {
        if (pathname.includes("dashboard/users")) return "users"
        return "users"
    }

    const activeTab = getActiveTab()

    /* const handleLogout = () => {
         logoutUser()
         console.log('logged out')
         router.push('/auth')
     }*/

    return (
        <Tabs.Root
            variant={"subtle"}
            orientation="vertical"
            defaultValue={activeTab}
            lazyMount
            unmountOnExit
            value={activeTab}
            colorPalette={'transparent'}
            zIndex={10}
            bg="white"
            overflow="auto"
            position="fixed"
            top={'6rem'}
        >
            <Tabs.List h={"100vh"} w={"280px"} >
                <div>
                    {sideBarLinks.home.map((link) => (
                        <Tabs.Trigger
                            w={"full"}
                            value={link.tag}
                            p={"30px 30px"}
                            onClick={() => {
                                navigate(`/dashboard/${link.tag}`)
                                onClose && onClose()
                            }}
                            _selected={{ bg: 'white', color: '#213F7D' }}
                            key={link.tag}
                        >
                            <Image alt="image" src={link.icon} /> {link.name}
                        </Tabs.Trigger>
                    ))}
                    <Tabs.Indicator _dark={{ bg: '#39CDCC' }} bg={"#39CDCC"} opacity={'60%'} rounded={'none'} />
                </div>
                <div>
                    <p className={styles['subheader-text']}>Customers</p>
                    {sideBarLinks.customers.map((link) => (
                        <Tabs.Trigger
                            w={"full"}
                            value={link.tag}
                            className=""
                            bg={'white'}
                            _selected={{ borderLeft: '4px solid #39CDCC', bg: 'white', color: '#213F7D' }}
                            px={"30px"}
                            onClick={() => {
                                navigate(`/dashboard/${link.tag}`)
                                onClose && onClose()
                            }}
                            key={link.tag}
                        >
                            <Image alt="image" src={link.icon} /> {link.name}
                        </Tabs.Trigger>
                    ))}
                    <Tabs.Indicator _dark={{ bg: '#39CDCC' }} bg={"#39CDCC"} opacity={'60%'} />
                </div>
                <div>
                    <p className={styles['subheader-text']}>Businesses</p>
                    {sideBarLinks.businesses.map((link) => (
                        <Tabs.Trigger
                            w={"full"}
                            value={link.tag}
                            bg={'white'}
                            _selected={{ borderLeft: '4px solid #39CDCC', bg: 'white', color: '#213F7D' }}
                            p={2}
                            px={"30px"}
                            onClick={() => {
                                navigate(`/dashboard/${link.tag}`)
                                onClose && onClose()
                            }}
                            key={link.tag}
                        >
                            <Image alt="image" src={link.icon} /> {link.name}
                        </Tabs.Trigger>
                    ))}
                    <Tabs.Indicator _dark={{ bg: '#39CDCC' }} bg={"#39cdcd2c"} />
                </div>
                <div>
                    <p className={styles['subheader-text']}>Settings</p>
                    {sideBarLinks.settings.map((link) => (
                        <Tabs.Trigger
                            w={"full"}
                            value={link.tag}
                            bg={'white'}
                            _selected={{ borderLeft: '4px solid #39CDCC', bg: 'white', color: '#213F7D' }}
                            p={2}
                            px={"30px"}
                            onClick={() => {
                                navigate(`/dashboard/${link.tag}`)
                                onClose && onClose()
                            }}
                            key={link.tag}
                        >
                            <Image alt="image" src={link.icon} /> {link.name}
                        </Tabs.Trigger>
                    ))}
                    <Tabs.Indicator _dark={{ bg: '#39CDCC' }} bg={"#39CDCC"} />
                </div>
            </Tabs.List>
        </Tabs.Root>
    )
}
