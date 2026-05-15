
import { useMemo, useState } from 'react';
import {
    type ColumnDef,
    flexRender,
    getCoreRowModel,
    useReactTable,
} from '@tanstack/react-table';
import {
    Table,
    TableBody,
    TableCell,
    TableEmpty,
    TableHead,
    TableHeader,
    TableRow,
} from './index';

import { Paginator } from './paginator';
import { Box, Flex, HStack, Skeleton, Text } from '@chakra-ui/react';
import styles from './table.module.scss';
import { CgChevronDown } from 'react-icons/cg';

export type EmptyDetails = {
    icon: string;
    title: string;
    description: string;
};

export type PaginationMeta = {
    total: number;
    currentPage: number;
    totalPages: number;
    pageSize?: number;
};

export type stageProps<TData> = {
    title: string;
    data: TData[];
    emptyMessage?: string;
};

interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[];
    data: TData[] | null;
    onRowClick?: (row: TData) => void;
    pagination?: PaginationMeta;
    onPage?: (page: number) => void;
    loading?: boolean;
    tableName?: string;
    emptyDetails?: EmptyDetails;
    stages?: stageProps<TData>[];
    showStages?: boolean;
    headerColor?: string;
    borderRadius?: any;
    px?: any;
    my?: any;
}

export function DataTable<TData, TValue>({
    columns,
    data,
    onRowClick,
    pagination,
    loading = false,
    tableName,
    emptyDetails,
    px,
}: DataTableProps<TData, TValue>) {
    const pageSize = pagination?.pageSize || 10;
    const totalPages = Math.ceil((data?.length ?? 0) / pageSize);
    const [currentPage, setCurrentPage] = useState(1);

    const currentData = useMemo(() => {
        if (!Array.isArray(data)) return [];

        return data.slice((currentPage - 1) * pageSize, currentPage * pageSize);
    }, [data, currentPage, pageSize]);

    const tableData = currentData ?? [];

    const table = useReactTable({
        data: tableData,
        columns,
        getCoreRowModel: getCoreRowModel(),
    });

    const isDataEmpty = !data || data.length === 0;

    const skeletonData = new Array(5).fill(null);

    return (
        <div
            style={{
                height: '100%',
                width: '100%',
                paddingInline: px,
            }}
            className={styles.tableContainer}
        >
            <div className={styles.tableScroll}>
                <Table>
                    <TableHeader className={styles.tableHeader}>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={tableName + headerGroup.id}>
                                {headerGroup.headers.map((header) => (
                                    <TableHead
                                        key={tableName + header.id}
                                        className={styles.tableHead}
                                    >
                                        {!header.isPlaceholder &&
                                            flexRender(
                                                header.column.columnDef.header,
                                                header.getContext()
                                            )}
                                    </TableHead>
                                ))}
                            </TableRow>
                        ))}
                    </TableHeader>

                    <TableBody>
                        {loading ? (
                            skeletonData.map((_, rowIndex) => (
                                <TableRow key={rowIndex}>
                                    {columns.map((_, cellIndex) => (
                                        <TableCell key={cellIndex}>
                                            <Skeleton className={styles.skeleton} />
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : (
                            <>
                                {isDataEmpty ? (
                                    <TableEmpty colSpan={columns.length}>
                                        <div className={styles.emptyState}>
                                            <div className={styles.emptyIconWrapper}>
                                                {emptyDetails?.icon ? (
                                                    <img src={emptyDetails.icon} alt="" />
                                                ) : (
                                                    <Box
                                                        rounded={'full'}
                                                        className={styles.emptyFallbackIcon}
                                                        boxSize={'40px'}
                                                    />
                                                )}
                                            </div>

                                            <div className={styles.emptyTextWrapper}>
                                                <h4 className={styles.emptyTitle}>
                                                    {emptyDetails?.title ||
                                                        `No ${tableName} found`}
                                                </h4>

                                                <p className={styles.emptyDescription}>
                                                    {emptyDetails?.description ||
                                                        `No ${tableName} found`}
                                                </p>
                                            </div>
                                        </div>
                                    </TableEmpty>
                                ) : (
                                    table.getRowModel().rows.map((row) => (
                                        <TableRow
                                            key={row.id}
                                            onClick={() =>
                                                onRowClick?.(row.original)
                                            }
                                            data-state={
                                                row.getIsSelected() && 'selected'
                                            }
                                            className={styles.tableRow}
                                        >
                                            {row.getVisibleCells().map((cell) => (
                                                <TableCell
                                                    key={tableName + cell.id}
                                                    className={styles.tableCell}
                                                >
                                                    {flexRender(
                                                        cell.column.columnDef.cell,
                                                        cell.getContext()
                                                    )}
                                                </TableCell>
                                            ))}
                                        </TableRow>
                                    ))
                                )}
                            </>
                        )}
                    </TableBody>
                </Table>
            </div>

            <div className={styles.paginationWrapper}>
                <Flex align={'center'}>
                    <Text fontSize={'14px'}>
                        Showing
                    </Text>
                    <HStack p={1} px={2} fontSize={'14px'} h={'30px'} bg={'#213F7D1A'} mx={2}>{data?.findIndex(currentData => currentData === tableData[0])}<CgChevronDown /></HStack>  <Text fontSize={'14px'}>out of {data?.length}{' '}
                        {tableName}
                    </Text>
                </Flex>

                <Paginator
                    current={currentPage}
                    total={totalPages}
                    onChange={(page) => setCurrentPage(page)}
                />
            </div>
        </div>
    );
}
