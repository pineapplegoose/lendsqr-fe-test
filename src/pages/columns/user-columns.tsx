import { Filter, type FilterValues } from "@/components/filter";
import { Modal } from "@/components/ui/dialog";
import { Center, HStack, Menu, Portal } from "@chakra-ui/react";
import type { ColumnDef } from "@tanstack/react-table";
import { useState } from "react";
import { LuEllipsisVertical, LuEye, LuUserCheck, LuUserX } from "react-icons/lu";
import { MdFilterList } from "react-icons/md";
import { useNavigate } from "react-router";

export interface UserColumns {
    organization: string;
    username: string;
    email: string;
    phone: string;
    dateJoined: string;
    status: string;
    id: string
}

interface FilterTriggerProps {
    users: UserColumns[]
    onFilter: (values: FilterValues) => void
    onReset: () => void
}

const FilterTrigger = ({ users, onFilter, onReset }: FilterTriggerProps) => {
    const [open, setOpen] = useState(false)
    return (
        <Modal
            open={open}
            onOpenChange={setOpen}
            triggerElement={<MdFilterList cursor={'pointer'} />}
            modalContent={
                <Filter
                    users={users}
                    onFilter={(values) => { onFilter(values); setOpen(false) }}
                    onReset={() => { onReset(); setOpen(false) }}
                />
            }
        />
    )
}

export type { FilterValues }

interface UseColumnsOptions {
    users: UserColumns[]
    onFilter: (values: FilterValues) => void
    onReset: () => void
    onBlacklist?: (id: string) => Promise<void>
    onActivate?: (id: string) => Promise<void>
}

export const useColumns = ({ users, onFilter, onReset, onBlacklist, onActivate }: UseColumnsOptions): ColumnDef<UserColumns, any>[] => {
    const formatDate = (dateStr: string | undefined) => {
        if (!dateStr) return null
        const date = new Date(dateStr)
        return date.toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "long",
            year: "numeric",
        })
    }
    const navigate = useNavigate()
    const [loadingId, setLoadingId] = useState<string | null>(null)

    const handleBlacklist = async (id: string) => {
        setLoadingId(id)
        try { await onBlacklist?.(id) } finally { setLoadingId(null) }
    }

    const handleActivate = async (id: string) => {
        setLoadingId(id)
        try { await onActivate?.(id) } finally { setLoadingId(null) }
    }

    const formatDatetoTime = (dateStr: string | undefined) => {
        if (!dateStr) return ""
        const date = new Date(dateStr)
        return date.toLocaleTimeString('en-US', { hour: "2-digit", minute: "2-digit" })
    }

    const statusMap: Record<string, { title: string; text: string; bg: string }> = {
        image: { title: 'Inactive', text: '#545F7D', bg: '#545F7D1A' },
        audio: { title: 'Pending', text: '#E9B200', bg: '#E9B2001A' },
        video: { title: 'Active', text: '#39CD62', bg: '#39CD621A' },
        text: { title: 'Active', text: '#39CD62', bg: '#39CD621A' },
        application: { title: 'Blacklisted', text: '#E4033B', bg: '#E4033B1A' },
    }

    const filterTrigger = <FilterTrigger users={users} onFilter={onFilter} onReset={onReset} />

    return [
        {
            accessorKey: 'organization',
            header: () => <HStack><span>Organization</span>{filterTrigger}</HStack>,
            cell: (info) => info.getValue(),
            enableSorting: false
        },
        {
            accessorKey: 'username',
            header: () => <HStack><span>Username</span>{filterTrigger}</HStack>,
            cell: (info) => info.getValue(),
            enableSorting: false
        },
        {
            accessorKey: 'email',
            header: () => <HStack><span>Email</span>{filterTrigger}</HStack>,
            cell: (info) => info.getValue(),
            enableSorting: false
        },
        {
            accessorKey: 'phone',
            header: () => <HStack><span>Phone</span>{filterTrigger}</HStack>,
            cell: (info) => info.getValue(),
            enableSorting: false
        },
        {
            accessorKey: 'dateJoined',
            header: () => <HStack><span>Date Joined</span>{filterTrigger}</HStack>,
            cell: (info) => formatDate(info.getValue()) + ' ' + formatDatetoTime(info.getValue()),
            enableSorting: false
        },
        {
            accessorKey: 'status',
            header: () => <HStack><span>Status</span>{filterTrigger}</HStack>,
            cell: (info) => {
                const key = (info.getValue() as string)?.toLowerCase()
                const status = statusMap[key]
                return (
                    <Center style={{ backgroundColor: `${status.bg}` }} bg={status?.bg} px={3} py={1} w={'fit'} rounded={'full'}>
                        <span style={{ color: status?.text, backgroundColor: 'transparent' }}>{status?.title ?? info.getValue()}</span>
                    </Center>
                )
            },
            enableSorting: false
        },
        {
            accessorKey: 'actions',
            header: '',
            cell: ({ row }) => (
                <div style={{ background: 'transparent' }} onClick={(e) => e.stopPropagation()}>
                    <Menu.Root>
                        <Menu.Trigger bg={'transparent'}>
                            <LuEllipsisVertical size={18} cursor={'pointer'} />
                        </Menu.Trigger>
                        <Portal>
                            <Menu.Positioner shadowColor={'white'} shadow={'none'}>
                                <Menu.Content bg={'white'} h={'130px'} fontWeight={'medium'} color={'#545F7D'}>
                                    <Menu.Item value="view" h={'33%'} color={'#545F7D'} px={4} onClick={() => navigate(`/dashboard/users/${row.original.id

                                        }`, { state: { user: row.original } })} _hover={{ bg: 'gray.200' }}>
                                        <LuEye /><span> View Details</span>
                                    </Menu.Item>
                                    <Menu.Item
                                        value="blacklist"
                                        h={'33%'}
                                        px={4}
                                        _hover={{ bg: 'gray.200' }}
                                        disabled={row.original.status === 'application' || loadingId === row.original.id}
                                        color={row.original.status === 'application' ? '#ccc' : '#545F7D'}
                                        onClick={() => handleBlacklist(row.original.id)}
                                    >
                                        <LuUserX /><span>Blacklist User</span>
                                    </Menu.Item>
                                    <Menu.Item
                                        value="activate"
                                        h={'33%'}
                                        px={4}
                                        _hover={{ bg: 'gray.200' }}
                                        disabled={['video', 'text'].includes(row.original.status) || loadingId === row.original.id}
                                        color={['video', 'text'].includes(row.original.status) ? '#ccc' : '#545F7D'}
                                        onClick={() => handleActivate(row.original.id)}
                                    >
                                        <LuUserCheck /><span>Activate User</span>
                                    </Menu.Item>
                                </Menu.Content>
                            </Menu.Positioner>
                        </Portal>
                    </Menu.Root>
                </div>
            ),
            enableSorting: false
        }
    ]
}
