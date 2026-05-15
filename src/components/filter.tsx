import { useForm } from 'react-hook-form'
import styles from '@/styles/filter.module.scss'
import type { UserColumns } from '@/pages/columns/user-columns'
import { createListCollection, HStack } from '@chakra-ui/react'
import { CustomSelect } from './ui/custom-form-components/custom-select'
import { CustomInput } from './ui/custom-form-components/custom-input'
import { MainButton } from './ui/button'

export interface FilterValues {
    organization?: string[]
    username?: string
    email?: string
    date?: string
    phone?: string
    status?: string[]
}

interface FilterProps {
    users: UserColumns[]
    onFilter: (values: FilterValues) => void
    onReset: () => void
}

export const Filter = ({ users, onFilter, onReset }: FilterProps) => {
    const { control, handleSubmit, reset } = useForm<FilterValues>()

    const uniqueOrgs = Array.from(new Set(users.map(u => u.organization).filter(Boolean)))
    const Organization = createListCollection({
        items: uniqueOrgs.map(org => ({ label: org, value: org }))
    })

    const Status = createListCollection({
        items: [
            { label: 'Active', value: 'video' },
            { label: 'Inactive', value: 'image' },
            { label: 'Pending', value: 'audio' },
            { label: 'Blacklisted', value: 'application' },
        ]
    })

    const handleReset = () => {
        reset()
        onReset()
    }

    return (
        <div className={styles['filter-container']}>
            <form onSubmit={handleSubmit(onFilter)}>
                <CustomSelect
                    control={control}
                    name='organization'
                    label='Organization'
                    placeholder='Select'
                    collection={Organization}
                />
                <CustomInput
                    control={control}
                    name='username'
                    type='text'
                    placeholder='User'
                    label='Username'
                />
                <CustomInput
                    control={control}
                    name='email'
                    type='email'
                    placeholder='Email'
                    label='Email'
                />
                <CustomInput
                    control={control}
                    name='date'
                    type='date'
                    placeholder='Date'
                    label='Date'
                />
                <CustomInput
                    control={control}
                    name='phone'
                    type='text'
                    placeholder='Phone Number'
                    label='Phone Number'
                />
                <CustomSelect
                    control={control}
                    name='status'
                    label='Status'
                    placeholder='Select'
                    collection={Status}
                />
                <HStack>
                    <MainButton
                        type='button'
                        variant='outline'
                        size='md'
                        onClick={handleReset}
                        style={{ textTransform: 'capitalize' }}
                    >
                        Reset
                    </MainButton>
                    <MainButton
                        type='submit'
                        variant='primary'
                        size='md'
                        style={{ textTransform: 'capitalize' }}
                    >
                        Filter
                    </MainButton>
                </HStack>
            </form>
        </div>
    )
}
