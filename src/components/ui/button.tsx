import { Icon } from "@chakra-ui/react";
import React from "react";
import { CgSpinner } from "react-icons/cg";
import styles from "@/styles/button.module.scss";

export type ButtonVariant = "primary" | "secondary" | "red" | "outlineSlim" | "outline";
export type ButtonSize = "sm" | "md" | "lg" | "xl"

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    children: React.ReactNode;
    variant?: ButtonVariant;
    size?: ButtonSize;
    fullWidth?: boolean;
    loading?: boolean;
    loadingText?: string;
    icon?: React.ReactElement;
    iconColor?: string;
    iconPosition?: 'left' | 'right';
    color?: string;
}

const variantStyles: Record<ButtonVariant, string> = {
    primary: styles.button,
    secondary: styles.buttonOutline,
    red: styles.buttonOutlineRed,
    outlineSlim: styles.buttonOutlineSm,
    outline: styles.buttonOutlines
};


export const MainButton = React.forwardRef<HTMLButtonElement, ButtonProps>(function Button({
    children,
    variant = 'primary',
    size = 'md',
    icon,
    iconColor,
    iconPosition = 'left',
    loading,
    loadingText,
    fullWidth,
    disabled,
    ...props
}, ref) {
    const base = styles.button;

    const combinedClassName = [base, variantStyles[variant], props.className]
        .filter(Boolean)
        .join(' ');

    const renderIcon = (pos: 'left' | 'right') =>
        icon && iconPosition === pos
            ? (
                <Icon className={pos === 'left' ? 'mr-1' : 'ml-1'} color={iconColor}>
                    {React.cloneElement(icon as React.ReactElement<any>, {
                        style: { color: iconColor || 'currentColor' }
                    })}
                </Icon>
            )
            : null;

    return (
        <button ref={ref} disabled={disabled} type={props.type ?? 'button'} {...props} className={combinedClassName}>

            {loading ? (
                <>
                    <CgSpinner size={12} className='mr-2 h-4 w-4 animate-spin' />
                    {loadingText}
                </>
            ) : (
                <>
                    {renderIcon('left')}
                    {children}
                    {renderIcon('right')}
                </>
            )}
        </button>
    );
});
