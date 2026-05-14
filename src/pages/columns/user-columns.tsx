import { HStack, Menu } from "@chakra-ui/react";
import type { ColumnDef } from "@tanstack/react-table";
import { LuEllipsisVertical } from "react-icons/lu";
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

export const useColumns = (): ColumnDef<UserColumns, any>[] => {
    return [
        {
            accessorKey: 'organization',
            header: () => <HStack>
                <span>Organization</span>
                <MdFilterList />
            </HStack>,
            cell: (info) => info.getValue(),
            enableSorting: false
        },
        {
            accessorKey: 'username',
            header: () => <HStack>
                <span>Username</span>
                <MdFilterList />
            </HStack>,
            cell: (info) => info.getValue(),
            enableSorting: false
        },
        {
            accessorKey: 'email',
            header: () => <HStack>
                <span>Email</span>
                <MdFilterList />
            </HStack>,
            cell: (info) => info.getValue(),
            enableSorting: false
        },
        {
            accessorKey: 'phone',
            header: () => <HStack>
                <span>Phone</span>
                <MdFilterList />
            </HStack>,
            cell: (info) => info.getValue(),
            enableSorting: false
        },
        {
            accessorKey: 'dateJoined',
            header: () => <HStack>
                <span>Date Joined</span>
                <MdFilterList />
            </HStack>,
            cell: (info) => info.getValue(),
            enableSorting: false
        },
        {
            accessorKey: 'status',
            header: () => <HStack>
                <span>Status</span>
                <MdFilterList />
            </HStack>,
            cell: (info) => info.getValue(),
            enableSorting: false
        },
        {
            accessorKey: 'actions',
            header: '',
            cell: (info) => <>
                <Menu.Root>
                    <Menu.Trigger>
                        <LuEllipsisVertical />
                    </Menu.Trigger>
                    <Menu.Content>
                        <Menu.Item value="view">
                            <span>View</span>
                        </Menu.Item>
                    </Menu.Content>
                </Menu.Root>
            </>,
            enableSorting: false
        }

    ]
}