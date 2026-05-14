import { Box, Flex, Image, InputGroup } from "@chakra-ui/react";
import Logo from '@/assets/logos/full-logo.svg'
import LoginHeroImage from '@/assets/images/auth-page-img.png'
import styles from '@/styles/login.module.scss'
import { MainButton } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { CustomInput } from "@/components/ui/custom-form-components/custom-input";
import { useNavigate } from "react-router";

export default function Login() {
    const { control } = useForm()
    const navigate = useNavigate()
    return (
        <Flex>
            <Box className={styles['login-container']}>
                <Image className={styles['logo']} src={Logo} alt="Lendsqr Logo" />
                <Image className={styles['hero-img']} src={LoginHeroImage} alt="Login Hero Image" />
            </Box>
            <Box className={styles['login-form']}>
                <div>
                    <h3>Welcome.</h3>
                    <p>Enter details to login.</p>
                    <form>
                        <CustomInput control={control} name='email' type='email' placeholder="Email" />
                        <InputGroup endElement={<p className={styles['show-password']}>show</p>}><CustomInput control={control} name='password' type='password' placeholder="Password" /></InputGroup>
                    </form>
                    <p className={styles['forgot-password']}>Forgot PASSWORD?</p>
                    <MainButton onClick={() => navigate('/dashboard')} variant='primary' size='lg'>Log in</MainButton>
                </div>

            </Box>

        </Flex>
    );
}