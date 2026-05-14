import { Button, Flex, HStack } from "@chakra-ui/react";
import { LuChevronLeft, LuChevronRight } from "react-icons/lu";
import { useMemo } from "react";
import styles from "./paginator.module.scss";

type PaginatorProps = {
    current: number;
    total: number;
    onChange: (page: number) => void;
    maxButtons?: number;
};

const makeWindow = (
    current: number,
    total: number,
    max = 6
) => {
    if (total <= max) {
        return Array.from(
            { length: total },
            (_, i) => i + 1
        );
    }

    const half = Math.floor(max / 2);

    let start = Math.max(1, current - half);
    let end = start + max - 1;

    if (end > total) {
        end = total;
        start = Math.max(1, end - max + 1);
    }

    return Array.from(
        { length: end - start + 1 },
        (_, i) => start + i
    );
};

export function Paginator({
    current,
    total,
    onChange,
    maxButtons = 6,
}: PaginatorProps) {
    if (!total || total <= 1) return null;

    const pages = useMemo(
        () => makeWindow(current, total, maxButtons),
        [current, total, maxButtons]
    );

    const safeChange = (page: number) => {
        const next = Math.min(
            Math.max(page, 1),
            total
        );

        if (next !== current) {
            onChange(next);
        }
    };

    return (
        <Flex
            align="center"
            justify="center"
            gap={{ base: 2, lg: 4 }}
            mt={10}
            aria-label="Pagination"
        >
            <Button
                disabled={current <= 1}
                onClick={() => safeChange(current - 1)}
                variant="outline"
                className={styles.navButton}
            >
                <LuChevronLeft size={6} />
            </Button>

            <HStack gap={{ base: 2, lg: 4 }}>
                {pages.map((p) => (
                    <Button
                        key={p}
                        onClick={() => safeChange(p)}
                        className={
                            p === current
                                ? `${styles.pageButton} ${styles.active}`
                                : `${styles.pageButton} ${styles.inactive}`
                        }
                        aria-current={
                            p === current
                                ? "page"
                                : undefined
                        }
                    >
                        {p}
                    </Button>
                ))}
            </HStack>

            <Button
                disabled={current >= total}
                onClick={() => safeChange(current + 1)}
                variant="outline"
                className={styles.navButton}
            >
                <LuChevronRight size={6} />
            </Button>
        </Flex>
    );
}