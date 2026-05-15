import { sideBarLinks } from "@/utils/data"
import { HStack, Image, Tabs, Text } from "@chakra-ui/react"
import { useLocation, useNavigate } from "react-router"
import styles from "@/styles/side-bar.module.scss"
import { CgChevronDown } from "react-icons/cg"
import { logout } from "@/services/auth"

export const Sidebar = ({ onClose, isOpen }: { onClose?: () => void; isOpen?: boolean }) => {
    const pathname = useLocation().pathname
    const navigate = useNavigate()

    const getActiveTab = () => {
        if (pathname.includes("dashboard/users")) return "users"
        return "users"
    }

    const activeTab = getActiveTab()

    const handleLogout = () => {
        logout()
        navigate('/')
    }

    return (
        <Tabs.Root
            variant={'plain'}
            orientation="vertical"
            defaultValue={activeTab}
            lazyMount
            unmountOnExit
            value={activeTab}
            colorPalette={'transparent'}
            zIndex={20}
            bg="white"
            overflow="auto"
            position="fixed"
            transform={{ base: isOpen ? 'translateX(0)' : 'translateX(-100%)', lg: 'translateX(0)' }}
            transition="transform 0.3s ease-in-out"
        >
            <Tabs.List _dark={{ bg: 'white' }} h={{ base: '100vh', md: '92vh' }} maxH={"100vh"} w={"280px"} >
                <div>
                    <HStack p={"30px 30px"} >
                        <Image src={'/icons/briefcase.svg'} alt="logo" />
                        <Text fontSize={'14px'} fontWeight={'normal'}>Switch Organization</Text>
                        <CgChevronDown />
                    </HStack>
                    {sideBarLinks.home.map((link) => (
                        <Tabs.Trigger
                            className={styles['tabs']}
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
                    <Tabs.Indicator _dark={{ bg: '#39CDCC0F' }} bg={"#39CDCC0F"} rounded={'none'} />
                </div>
                <div>
                    <p className={styles['subheader-text']}>Customers</p>
                    {sideBarLinks.customers.map((link) => (
                        <Tabs.Trigger
                            className={styles['tabs']}
                            w={"full"}
                            value={link.tag}
                            bg={'transparent'}
                            rounded={'none'}
                            _selected={{ borderLeft: '4px solid #39CDCC', opacity: 1, bg: '#39CDCC0F', color: '#213F7D' }}
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
                    <Tabs.Indicator opacity={1} _dark={{ bg: '#39CDCC0F' }} bg={"transparent"} />
                </div>
                <div>
                    <p className={styles['subheader-text']}>Businesses</p>
                    {sideBarLinks.businesses.map((link) => (
                        <Tabs.Trigger
                            className={styles['tabs']}
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
                            className={styles['tabs']}
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
                <div style={{ borderTop: '1px solid #213F7D1A', marginTop: '16px', paddingTop: '16px' }}>
                    <Tabs.Trigger
                        className={styles['tabs']}
                        w={"full"}
                        value="logout"
                        bg={'white'}
                        px={"30px"}
                        onClick={handleLogout}
                    >
                        <Image alt="logout" src={'/icons/sign-out.svg'} /> Logout
                    </Tabs.Trigger>
                </div>
            </Tabs.List>
        </Tabs.Root>
    )
}
