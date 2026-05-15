import { Box, Flex, Grid, GridItem, HStack, Tabs } from "@chakra-ui/react";
import { FaArrowLeftLong } from "react-icons/fa6";
import styles from '@/styles/user-details.module.scss'
import { MainButton } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import http from "@/services/https";
import { Avatar } from "@/components/ui/avatar";
import { IoStar, IoStarOutline } from "react-icons/io5";

interface User {
    organization: string,
    username: string,
    email: string,
    phone: string,
    dateJoined: string,
    status: string
    id: string
    password: string
    employment: string
    officeEmail: string
    guarantorName: string
    guarantorEmail: string
    guarantorPhone: string
    gender: string
    bank: string
    avatar: string
    bvn: string
}

export default function UserDetails() {
    const { id } = useParams();
    const [user, setUser] = useState<User>()
    const isMobile = window.innerWidth < 768

    const Info = {
        personalInfo: [
            { label: 'Full Name', value: user?.username ?? '' },
            { label: 'Phone Number', value: user?.phone ?? '' },
            { label: 'Email address', value: user?.email ?? '' },
            { label: 'BVN', value: user?.bvn ?? '' },
            { label: 'Gender', value: user?.gender ?? '' },
            { label: 'Marital Status', value: 'Single' },
            { label: 'Children', value: 'None' },
            { label: 'Type of residence', value: "Parent's Apartment" },
        ],
        education: [
            { label: 'Level of Education', value: 'Bsc' },
            { label: 'Employment Status', value: 'Self Employed' },
            { label: 'Sector of Employment', value: 'Agriculture' },
            { label: 'Duration of Employment', value: '2 years' },
            { label: 'Office Email', value: user?.officeEmail ?? '' },
            { label: 'Monthly Income', value: 'N200,000-N400,000' },
            { label: 'Loan Repayment', value: 'N20,000' },
        ],
        socials: [
            { label: 'Twitter', value: `@${user?.username}` },
            { label: 'Facebook', value: `@${user?.username}` },
            { label: 'Instagram', value: `@${user?.username}` },
        ],
        guarantor: [
            { label: 'Full Name', value: user?.guarantorName ?? '' },
            { label: 'Phone Number', value: user?.guarantorPhone ?? '' },
            { label: 'Email address', value: user?.guarantorEmail ?? '' },
            { label: 'Relationship', value: 'Sister' },
        ]
    }

    useEffect(() => {
        const fetchUser = async (id: string) => {
            const res = await http.get<User>(`/users/${id}`)
            setUser(res.data)
        }
        fetchUser(id as string)
    }, [id])

    return (
        <div className={styles['user-details-container']}>
            <HStack cursor={'pointer'} bg={'transparent'} onClick={() => window.history.back()}>
                <FaArrowLeftLong />
                <p>Back to Users</p>
            </HStack>

            <HStack align={'center'} className={styles['header']}>
                <h2>User Details</h2>
                <Flex gap="16px" w={{ base: '100%', md: '370px' }}>
                    <MainButton size='lg' variant='red'>Blacklist User</MainButton>
                    <MainButton size='lg' variant='outlineSlim'>Activate User</MainButton>
                </Flex>
            </HStack>

            <Tabs.Root defaultValue={'general'} variant={'plain'}>
                <Box className={styles['user-id-container']}>
                    <Flex direction={{ base: 'column', md: 'row' }} className={styles['user-profile-row']}>
                        <Flex w={{ base: '64px', md: '100px' }} flexShrink={0}>
                            <Avatar size={'full'} src={user?.avatar} name={user?.username} />
                            {isMobile && <span className={styles['user-id']}>
                                <h3>{user?.username}</h3>
                                <p>{user?.id}</p>
                            </span>}
                        </Flex>
                        {!isMobile && <span className={styles['user-id']}>
                            <h3>{user?.username}</h3>
                            <p>{user?.id}</p>
                        </span>}
                        <span className={styles['user-id']}>
                            <h5>User's Tier</h5>
                            <div className={styles['tier']}>
                                <IoStar color="#E9B200" />
                                <IoStarOutline color="#E9B200" />
                                <IoStarOutline color="#E9B200" />
                            </div>
                        </span>
                        <span className={styles['user-id']}>
                            <h3>₦200,000.00</h3>
                            <p>9912345678/Providus Bank</p>
                        </span>
                    </Flex>

                    <Tabs.List
                        className={styles['tabs-list']}
                        mt={'41px'}
                        w={'full'}
                        gap={{ base: 6, md: 16 }}
                        flexShrink={0}
                    >
                        {[
                            { value: 'general', label: 'General Details' },
                            { value: 'documents', label: 'Documents' },
                            { value: 'bank-details', label: 'Bank Details' },
                            { value: 'loans', label: 'Loans' },
                            { value: 'savings', label: 'Savings' },
                            { value: 'apps', label: 'App and System' },
                        ].map(tab => (
                            <Tabs.Trigger
                                key={tab.value}
                                value={tab.value}
                                justifyContent="center"
                                fontSize={{ base: '13px', md: '16px' }}
                                whiteSpace="nowrap"
                                flexShrink={0}
                                _selected={{ color: '#39CDCC' }}
                            >
                                {tab.label}
                            </Tabs.Trigger>
                        ))}
                        <Tabs.Indicator borderBottom="2px solid #39CDCC" rounded="none" shadow="none" bg="transparent" />
                    </Tabs.List>
                </Box>

                <Tabs.Content className={styles['general-info-content']} value="general">
                    <div className={styles['info-grid']}>
                        <h4>Personal Information</h4>
                        <Grid
                            templateColumns={{ base: 'repeat(2, 1fr)', md: 'repeat(3, 1fr)', lg: 'repeat(5, 1fr)' }}
                            w="full"
                            gapY="30px"
                            gapX={{ base: '2px', lg: '60px' }}
                        >
                            {Info.personalInfo.map((info, index) => (
                                <GridItem key={index} w={{ base: '80%', md: "full" }} className={styles['grid-item']}>
                                    <p className={styles["grid-label"]}>{info.label}</p>
                                    <p >{info.value}</p>
                                </GridItem>
                            ))}
                        </Grid>
                    </div>

                    <div className={styles['info-grid']}>
                        <h4>Education and Employment</h4>
                        <Grid
                            templateColumns={{ base: 'repeat(2, 1fr)', md: 'repeat(3, 1fr)', lg: 'repeat(4, 1fr)' }}
                            w="full"
                            gapY="30px"
                            gapX={{ base: '16px', lg: '60px' }}
                        >
                            {Info.education.map((info, index) => (
                                <GridItem key={index} w="full" className={styles['grid-item']}>
                                    <p className={styles["grid-label"]}>{info.label}</p>
                                    <p>{info.value}</p>
                                </GridItem>
                            ))}
                        </Grid>
                    </div>

                    <div className={styles['info-grid']}>
                        <h4>Socials</h4>
                        <Grid
                            templateColumns={{ base: 'repeat(2, 1fr)', md: 'repeat(3, 1fr)' }}
                            w="full"
                            gapY="30px"
                            gapX={{ base: '16px', lg: '60px' }}
                        >
                            {Info.socials.map((info, index) => (
                                <GridItem key={index} w="full" className={styles['grid-item']}>
                                    <p className={styles["grid-label"]}>{info.label}</p>
                                    <p>{info.value}</p>
                                </GridItem>
                            ))}
                        </Grid>
                    </div>

                    <div className={styles['info-grid']}>
                        <h4>Guarantor</h4>
                        <Grid
                            templateColumns={{ base: 'repeat(2, 1fr)', md: 'repeat(3, 1fr)', lg: 'repeat(4, 1fr)' }}
                            w="full"
                            gapY="30px"
                            gapX={{ base: '16px', lg: '60px' }}
                        >
                            {Info.guarantor.map((info, index) => (
                                <GridItem key={index} w="full" className={styles['grid-item']}>
                                    <p className={styles["grid-label"]}>{info.label}</p>
                                    <p>{info.value}</p>
                                </GridItem>
                            ))}
                        </Grid>
                    </div>
                </Tabs.Content>
            </Tabs.Root>
        </div>
    )
}
