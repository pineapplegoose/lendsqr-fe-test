import { Filter, type FilterValues } from "@/components/filter";
import { Modal } from "@/components/ui/dialog";
import { Center, HStack, Menu, Portal } from "@chakra-ui/react";
import type { ColumnDef } from "@tanstack/react-table";
import { useState } from "react";
import { LuEllipsisVertical, LuEye, LuUserCheck, LuUserX } from "react-icons/lu";
import { MdFilterList } from "react-icons/md";

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
}

export const useColumns = ({ users, onFilter, onReset }: UseColumnsOptions): ColumnDef<UserColumns, any>[] => {
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
            cell: () => (
                <div style={{ background: 'transparent' }} onClick={(e) => e.stopPropagation()}>
                    <Menu.Root>
                        <Menu.Trigger bg={'red'}>
                            <LuEllipsisVertical size={18} cursor={'pointer'} />
                        </Menu.Trigger>
                        <Portal>
                            <Menu.Positioner shadowColor={'white'} shadow={'none'}>
                                <Menu.Content bg={'white'} h={'130px'} fontWeight={'medium'} color={'#545F7D'}>
                                    <Menu.Item value="view" h={'33%'} color={'#545F7D'} px={4} _hover={{ bg: 'gray.200' }}>
                                        <LuEye /><span> View Details</span>
                                    </Menu.Item>
                                    <Menu.Item value="delete" h={'33%'} color={'#545F7D'} px={4} _hover={{ bg: 'gray.200' }}>
                                        <LuUserX /><span>Blacklist User</span>
                                    </Menu.Item>
                                    <Menu.Item value="edit" h={'33%'} color={'#545F7D'} px={4} _hover={{ bg: 'gray.200' }}>
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
