import { useEffect, useState } from "react";
import { Box, Flex, Image } from "@chakra-ui/react";
import Logo from '@/assets/logos/full-logo.svg'
import LoginHeroImage from '@/assets/images/auth-page-img.png'
import styles from '@/styles/login.module.scss'
import { MainButton } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { CustomInput } from "@/components/ui/custom-form-components/custom-input";
import { useNavigate, Navigate } from "react-router";
import { loginUser, storeAuthSession, isAuthenticated } from "@/services/auth";

interface LoginFormValues {
    email: string
    password: string
}

export default function Login() {
    const { control, handleSubmit, reset } = useForm<LoginFormValues>()
    const navigate = useNavigate()
    const [showPassword, setShowPassword] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [loading, setLoading] = useState(false)

    if (isAuthenticated()) {
        return <Navigate to="/dashboard/users" replace />
    }
    useEffect(() => {
        reset({
            email: 'Carolanne_Reynolds96@yahoo.com',
            password: 'uMA3p15vmmlbWHU'
        })
    }, [])

    const onSubmit = async (data: LoginFormValues) => {
        setLoading(true)
        setError(null)
        try {
            const user = await loginUser({ email: data.email, password: data.password })
            storeAuthSession(user.email)
            navigate('/dashboard/users')
        } catch {
            setError('Invalid email or password. Please try again.')
        } finally {
            setLoading(false)
        }
    }

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
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <CustomInput
                            control={control}
                            name='email'
                            type='email'
                            placeholder="Email"
                            rules={{ required: 'Email is required' }}
                        />
                        <div style={{ position: 'relative' }}>
                            <CustomInput
                                control={control}
                                name='password'
                                type={showPassword ? 'text' : 'password'}
                                placeholder="Password"
                                rules={{ required: 'Password is required' }}
                            />
                            <p
                                className={styles['show-password']}
                                onClick={() => setShowPassword(p => !p)}
                                style={{ position: 'absolute', top: '50%', right: '16px', transform: 'translateY(-50%)', cursor: 'pointer', userSelect: 'none', margin: 0 }}
                            >
                                {showPassword ? 'hide' : 'show'}
                            </p>
                        </div>
                        {error && <p style={{ color: '#E4033B', fontSize: '14px', marginTop: '8px' }}>{error}</p>}
                        <p className={styles['forgot-password']}>Forgot PASSWORD?</p>
                        <MainButton type='submit' variant='primary' size='lg' disabled={loading}>
                            {loading ? 'Logging in...' : 'Log in'}
                        </MainButton>
                    </form>
                </div>
            </Box>
        </Flex>
    );
}
