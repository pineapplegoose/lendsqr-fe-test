import styles from '@/styles/nav-bar.module.scss'
import Logo from '@/assets/logos/full-logo.svg'
import { Flex, HStack, Image } from '@chakra-ui/react'
import { SearchInput } from '../ui/search-input'
import { LuBell } from 'react-icons/lu'
import { Avatar } from '../ui/avatar'
import PlaceholderPfp from '@/assets/images/user-pfp.png'
import { RiArrowDownSFill } from "react-icons/ri";


export const NavBar = () => {
    return (
        <div className={styles['nav']}>
            <div>
                <Image className={styles['logo']} src={Logo} alt="Lendsqr Logo" />
                <SearchInput width={'400px'} />
            </div>
            <Flex className={styles['user-setting']}>
                <a href="">Docs</a>
                <LuBell size={20} />
                <HStack>
                    <Avatar src={PlaceholderPfp} name='Adedeji' />
                    <p>Adedeji</p>
                    <RiArrowDownSFill />
                </HStack>

            </Flex>
        </div>
    )
}