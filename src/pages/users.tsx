import { DashboardCard, type CardData } from "@/components/ui/card";
import { DataTable } from "@/components/ui/table/data-table";
import styles from '@/styles/user.module.scss'
import { useColumns, type UserColumns } from "./columns/user-columns";
import { useEffect, useState } from "react";
import http from "@/services/https";
import { useNavigate } from "react-router";

export default function Users() {
    const columns = useColumns()
    const [user, setUser] = useState<UserColumns[]>([])
    const navigate = useNavigate()
    const data: CardData[] = [
        {
            title: 'Users',
            data: 100,
            icon: '/icons/users-pink.svg'
        },
        {
            title: 'Active Users',
            data: 100,
            icon: '/icons/users-purple.svg'
        },
        {
            title: 'Users with Loans',
            data: 100,
            icon: '/icons/coin-sheet.svg'
        },
        {
            title: 'Users with Savings',
            data: 100,
            icon: '/icons/coins-red.svg'
        }

    ]
    useEffect(() => {
        const fetchUsers = async () => {
            const res = await http.get<UserColumns[]>("/users")
            setUser(res.data)
        }
        fetchUsers()
    }, [])

    return (
        <div className={styles['user-page-container']} >
            <h2>Users</h2>
            <DashboardCard data={data} />
            <DataTable tableName={'Users'} onRowClick={(row) => {
                navigate(`/dashboard/users/${row.id}`, { state: { user: row } })
            }} data={user} columns={columns} />
        </div>
    )
}
