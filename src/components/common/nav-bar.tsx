import styles from '@/styles/nav-bar.module.scss'
import Logo from '@/assets/logos/full-logo.svg'
import { Flex, HStack, Image } from '@chakra-ui/react'
import { SearchInput } from '../ui/search-input'
import { LuBell, LuMenu } from 'react-icons/lu'
import { Avatar } from '../ui/avatar'
import PlaceholderPfp from '@/assets/images/user-pfp.png'
import { RiArrowDownSFill } from "react-icons/ri";

export const NavBar = ({ onMenuToggle }: { onMenuToggle?: () => void }) => {
    return (
        <div className={styles['nav']}>
            <div>
                <button className={styles['hamburger']} onClick={onMenuToggle} aria-label="Open menu">
                    <LuMenu size={22} />
                </button>
                <Image className={styles['logo']} src={Logo} alt="Lendsqr Logo" />
                <div className={styles['search-wrapper']}>
                    <SearchInput width={'400px'} />
                </div>
            </div>
            <Flex className={styles['user-setting']}>
                <a href="">Docs</a>
                <LuBell size={20} />
                <HStack>
                    <Avatar src={PlaceholderPfp} name='Adedeji' />
                    <p className={styles['user-name']}>Adedeji</p>
                    <RiArrowDownSFill />
                </HStack>
            </Flex>
        </div>
    )
}
