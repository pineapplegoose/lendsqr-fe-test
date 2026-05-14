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

    const Info: { personalInfo: { label: string, value: string }[], education: { label: string, value: string }[], socials: { label: string, value: string }[], guarantor: { label: string, value: string }[] } = {
        personalInfo: [
            {
                label: 'Full Name',
                value: user?.username ?? ''
            },
            {
                label: 'Phone Number',
                value: user?.phone ?? ''
            },
            {
                label: 'Email address',
                value: user?.email ?? ''
            },
            {
                label: 'BVN',
                value: user?.bvn ?? ''
            },
            {
                label: 'Gender',
                value: user?.gender ?? ''
            },
            {
                label: 'Marital Status',
                value: 'Single'
            },
            {
                label: 'Children',
                value: 'None'
            },
            {
                label: 'Type of residence',
                value: 'Parent\'s Apartment'
            },

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
            <HStack cursor={'pointer'} onClick={() => window.history.back()}>
                <FaArrowLeftLong />
                <p >Back to Users</p>
            </HStack>
            <HStack className={styles['header']} >
                <h2> User Details</h2>
                <Flex gap={'20px'} w={'370px'} >
                    <MainButton size='lg' variant='red' >Blacklist User</MainButton>
                    <MainButton size='lg' variant='outlineSlim' >Activate User</MainButton>
                </Flex>
            </HStack>
            <Tabs.Root color={'#39CDCC'} defaultValue={'general'} variant={'plain'}>
                <Box className={styles['user-id-container']}>

                    <Flex>
                        <HStack >
                            <Flex w={'100px'}>
                                <Avatar size={'full'} src={user?.avatar} name={user?.username} />
                            </Flex>
                            <span className={styles['user-id']}>
                                <h3>{user?.username}</h3>
                                <p>{user?.id}</p>
                            </span>
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
                        </HStack>
                    </Flex>

                    <Tabs.List mt={'41px'} w={'full'} gap={16} >
                        <Tabs.Trigger w={'full'} justifyContent={'center'} fontSize={'16px'} _selected={{
                            color: "#39CDCC",

                        }} value="general">General Details</Tabs.Trigger>
                        <Tabs.Trigger w={'full'} justifyContent={'center'} fontSize={'16px'} _selected={{
                            color: "#39CDCC"
                        }} value="documents">Documents</Tabs.Trigger>
                        <Tabs.Trigger w={'full'} justifyContent={'center'} fontSize={'16px'} _selected={{
                            color: "#39CDCC"
                        }} value="bank-details">Bank Details</Tabs.Trigger>
                        <Tabs.Trigger w={'full'} justifyContent={'center'} fontSize={'16px'} _selected={{
                            color: "#39CDCC"
                        }} value="loans">Loans</Tabs.Trigger>
                        <Tabs.Trigger w={'full'} justifyContent={'center'} fontSize={'16px'} _selected={{
                            color: "#39CDCC"
                        }} value="savings">Savings</Tabs.Trigger>
                        <Tabs.Trigger w={'full'} justifyContent={'center'} _selected={{
                            color: "#39CDCC"
                        }} value="apps">App and System</Tabs.Trigger>
                        <Tabs.Indicator color={'#39CDCC'} borderBottom={'2px solid #39CDCC'} rounded={'none'} shadow={'none'} bg={'transparent'} />
                    </Tabs.List>

                </Box>
                <Tabs.Content className={styles['general-info-content']} value="general">
                    <div className={styles['info-grid']}>
                        <h4>Personal Information</h4>
                        <Grid templateColumns='repeat(5, 1fr)' w={'full'} gapY={'30px'} gapX={'100px'}>
                            {Info.personalInfo.map((info, index) => (
                                <GridItem key={index} w={'full'} className={styles['grid-item']}>
                                    <p className={styles["grid-label"]}>{info.label}</p>
                                    <p>{info.value}</p>
                                </GridItem>
                            ))}
                        </Grid>
                    </div>
                    <div className={styles['info-grid']}>
                        <h4>Education and Employment</h4>
                        <Grid templateColumns='repeat(4, 1fr)' w={'full'} gapY={'30px'} gapX={'100px'}>
                            {Info.education.map((info, index) => (
                                <GridItem key={index} w={'full'} className={styles['grid-item']}>
                                    <p className={styles["grid-label"]}>{info.label}</p>
                                    <p>{info.value}</p>
                                </GridItem>
                            ))}
                        </Grid>
                    </div>
                    <div className={styles['info-grid']}>
                        <h4>Guarantor</h4>
                        <Grid templateColumns='repeat(4, 1fr)' w={'full'} gapY={'30px'} >
                            {Info.guarantor.map((info, index) => (
                                <GridItem key={index} w={'full'} className={styles['grid-item']}>
                                    <p className={styles["grid-label"]}>{info.label}</p>
                                    <p>{info.value}</p>
                                </GridItem>
                            ))}
                        </Grid>
                    </div>
                    <div className={styles['info-grid']}><Grid templateColumns='repeat(4, 1fr)' w={'full'} gapY={'30px'} >
                        {Info.guarantor.map((info, index) => (
                            <GridItem key={index} w={'full'} className={styles['grid-item']}>
                                <p className={styles["grid-label"]}>{info.label}</p>
                                <p>{info.value}</p>
                            </GridItem>
                        ))}
                    </Grid></div>
                </Tabs.Content>
            </Tabs.Root>
        </div >
    )
}