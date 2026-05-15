import { DashboardCard, type CardData } from "@/components/ui/card";
import { DataTable } from "@/components/ui/table/data-table";
import styles from '@/styles/user.module.scss'
import { useColumns, type UserColumns, type FilterValues } from "./columns/user-columns";
import { useEffect, useMemo, useState } from "react";
import http from "@/services/https";
import { useNavigate } from "react-router";
import { Box, Center, Flex, HStack, Text } from "@chakra-ui/react";
import { Paginator } from "@/components/ui/table/paginator";
import { CgChevronDown } from "react-icons/cg";

export default function Users() {
    const [users, setUsers] = useState<UserColumns[]>([])
    const [filters, setFilters] = useState<FilterValues>({})
    const navigate = useNavigate()
    const isMobile = window.innerWidth < 768

    const data: CardData[] = [
        { title: 'Users', data: 100, icon: '/icons/users-pink.svg' },
        { title: 'Active Users', data: 100, icon: '/icons/users-purple.svg' },
        { title: 'Users with Loans', data: 100, icon: '/icons/coin-sheet.svg' },
        { title: 'Users with Savings', data: 100, icon: '/icons/coins-red.svg' },
    ]

    useEffect(() => {
        const fetchUsers = async () => {
            const res = await http.get<UserColumns[]>("/users")
            setUsers(res.data)
        }
        fetchUsers()
    }, [])

    const filteredUsers = useMemo(() => {
        const org = filters.organization?.[0]
        const status = filters.status?.[0]
        return users.filter(user => {
            if (org && user.organization !== org) return false
            if (filters.username && !user.username.toLowerCase().includes(filters.username.toLowerCase())) return false
            if (filters.email && !user.email.toLowerCase().includes(filters.email.toLowerCase())) return false
            if (filters.phone && !user.phone.includes(filters.phone)) return false
            if (status && user.status !== status) return false
            if (filters.date) {
                const filterDay = new Date(filters.date).toDateString()
                const userDay = new Date(user.dateJoined).toDateString()
                if (filterDay !== userDay) return false
            }
            return true
        })
    }, [users, filters])

    const handleBlacklist = async (id: string) => {
        await http.put(`/users/${id}`, { status: 'application' })
        setUsers(prev => prev.map(u => u.id === id ? { ...u, status: 'application' } : u))
    }

    const handleActivate = async (id: string) => {
        await http.put(`/users/${id}`, { status: 'video' })
        setUsers(prev => prev.map(u => u.id === id ? { ...u, status: 'video' } : u))
    }

    const columns = useColumns({
        users,
        onFilter: setFilters,
        onReset: () => setFilters({}),
        onBlacklist: handleBlacklist,
        onActivate: handleActivate,
    })

    return (
        <div className={styles['user-page-container']} >
            <h2>Users</h2>
            <DashboardCard data={data} />
            {isMobile ? <MobileTable data={filteredUsers} /> : <DataTable
                tableName={'Users'}
                onRowClick={(row) => navigate(`/dashboard/users/${row.id}`, { state: { user: row } })}
                data={filteredUsers}
                columns={columns}
            />}
        </div>
    )
}

const MobileTable = ({ data }: { data: UserColumns[] }) => {
    const statusMap: Record<string, { title: string; text: string; bg: string }> = {
        image: { title: 'Inactive', text: '#545F7D', bg: '#545F7D1A' },
        audio: { title: 'Pending', text: '#E9B200', bg: '#E9B2001A' },
        video: { title: 'Active', text: '#39CD62', bg: '#39CD621A' },
        text: { title: 'Active', text: '#39CD62', bg: '#39CD621A' },
        application: { title: 'Blacklisted', text: '#E4033B', bg: '#E4033B1A' },
    }
    const navigate = useNavigate()
    const formatDate = (dateStr: string | undefined) => {
        if (!dateStr) return null
        const date = new Date(dateStr)
        return date.toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "long",
            year: "numeric",
        })
    }

    const formatDatetoTime = (dateStr: string | undefined) => {
        if (!dateStr) return ""
        const date = new Date(dateStr)
        return date.toLocaleTimeString('en-US', { hour: "2-digit", minute: "2-digit" })
    }
    const pageSize = 10;
    const totalPages = Math.ceil((data?.length ?? 0) / pageSize);
    const [currentPage, setCurrentPage] = useState(1);

    const currentData = useMemo(() => {
        if (!Array.isArray(data)) return [];

        return data.slice((currentPage - 1) * pageSize, currentPage * pageSize);
    }, [data, currentPage, pageSize]);

    const tableData = currentData ?? [];


    return (
        <Box style={{
            backgroundColor: 'transparent',
        }}>
            <Box style={{
                backgroundColor: 'white',
                border: '1px solid #213f7d0f',
                borderRadius: '4px',
                padding: '20px',
                boxShadow: '3px 5px 20px 0px #0000000a'
            }}>
                {tableData.map((row) => {
                    const key = (row.status as string)?.toLowerCase()
                    const status = statusMap[key]
                    return (
                        <Box cursor={'pointer'} onClick={() => navigate(`/dashboard/users/${row.id}`, { state: { user: row } })} _hover={{ bg: 'blackAlpha.100' }} py={'10px'} px={'5px'} borderBottom={'1px solid #213F7D1A'} fontSize={'14px'} bg={'white'} color={'#545F7D'}>
                            <HStack bg={'transparent'} justify={'space-between'}>
                                <Text fontWeight={'medium'} fontSize={'16px'}>{row.username}</Text>
                                <Center style={{ backgroundColor: `${status.bg}` }} bg={status?.bg} px={3} py={1} w={'fit'} rounded={'full'}>
                                    <span style={{ color: status?.text, backgroundColor: 'transparent' }}>{status?.title ?? ''}</span>
                                </Center>
                            </HStack>
                            <Text w={'73%'}>{row.email}</Text>
                            <Text w={'73%'}>{row.phone}</Text>
                            <Text w={'73%'}>{formatDate(row.dateJoined) + ' ' + formatDatetoTime(row.dateJoined)}</Text>
                        </Box>)
                })}
            </Box>
            <div style={{ backgroundColor: 'transparent' }} className={styles.paginationWrapper}>
                <Flex mt={4} px={2} style={{ backgroundColor: 'transparent' }} align={'center'}>
                    <Text fontSize={'14px'}>
                        Showing
                    </Text>
                    <HStack p={1} px={2} fontSize={'14px'} h={'30px'} bg={'#213F7D1A'} mx={2}>{data?.findIndex(currentData => currentData === tableData[0])}<CgChevronDown /></HStack>  <Text fontSize={'14px'}>out of {data?.length}{' '}
                        Users
                    </Text>
                </Flex>

                <Paginator
                    current={currentPage}
                    total={totalPages}
                    onChange={(page) => setCurrentPage(page)}
                />
            </div>
        </Box>
    )
}