import { Input, InputGroup } from '@chakra-ui/react';
import { FiSearch } from 'react-icons/fi';
import styles from '@/styles/search-bar.module.scss'

type SearchInputProps = {
    width?: string | number
    value?: string
    onChange?: (value: string) => void
    onSearch?: (value: string) => void
    placeholder?: string
}

export const SearchInput = ({ width, value, onChange, onSearch, placeholder }: SearchInputProps) => {
    return (
        <InputGroup w={width} position='relative'>
            <div className={styles['search-bar']}>
                <Input
                    h='40px'
                    rounded='8px'
                    border='1px solid #545F7D26'
                    borderRight={'none'}
                    roundedRight={'none'}
                    bg='transparent'
                    value={value}
                    placeholder={placeholder ?? 'Search for anything'}
                    onChange={(e) => onChange?.(e.target.value)}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter') onSearch?.(value ?? '')
                    }}
                    w={'80%'}
                />
                <button>
                    <FiSearch size={14} color='white' />
                </button>
            </div>
        </InputGroup>
    );
};