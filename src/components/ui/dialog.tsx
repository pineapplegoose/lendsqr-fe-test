import { Popover, Portal, type PopoverRootProps } from "@chakra-ui/react"
import { MainButton, type ButtonVariant } from "./button";
import React from "react";

type ModalProps = {
    className?: string;
    triggerVariant?: ButtonVariant
    triggerContent?: string
    triggerElement?: React.ReactNode
    triggerIcon?: React.ReactElement
    triggerClassName?: string
    modalContent: React.ReactNode
    open?: boolean;
    onOpenChange?: (open: boolean) => void;
    size?: PopoverRootProps['size']
    placement?: "bottom" | "top" | "center"
}

export const Modal = ({
    className,
    triggerClassName,
    triggerVariant = 'primary',
    triggerContent,
    triggerElement,
    triggerIcon,
    modalContent,
    open,
    onOpenChange,
    size = 'lg',
}: ModalProps) => {
    return (
        <Popover.Root size={size} open={open} onOpenChange={(e) => onOpenChange?.(e.open)} >
            <Popover.Trigger asChild>
                {triggerElement ? triggerElement : triggerContent && <MainButton className={`satoshi ${triggerClassName}`} variant={triggerVariant} icon={triggerIcon}>
                    {triggerContent}
                </MainButton>}
            </Popover.Trigger>
            <Portal>
                <Popover.Positioner>
                    <Popover.Content w={'fit'} bg={'white'} rounded={'12px'} shadow={'xs'} className={` ${className ?? ''}`}>
                        {modalContent}
                    </Popover.Content>
                </Popover.Positioner>
            </Portal>
        </Popover.Root>
    )
}