import * as React from 'react';
import { Field, Input, Box, } from '@chakra-ui/react';
import { useController, type Control, type FieldPath, type FieldValues, type RegisterOptions } from 'react-hook-form';


type BaseProps<T extends FieldValues> = {
    name: FieldPath<T>;
    control: Control<T>;
    label?: string;
    placeholder?: string;
    disabled?: boolean;
    fieldProps?: React.ComponentProps<typeof Field.Root>;
    trimOnBlur?: boolean;
    description?: string;
    readOnly?: boolean;
    width?: string | number;
    orientation?: 'horizontal' | 'vertical';
    bg?: string
    required?: boolean
};

type InputProps<T extends FieldValues> = BaseProps<T> & {
    type?: React.InputHTMLAttributes<HTMLInputElement>['type'];
    rules?: RegisterOptions<T>
    inputProps?: Omit<
        React.ComponentProps<typeof Input>,
        'name' | 'value' | 'onChange' | 'onBlur' | 'ref'
    >;
    height?: string | number;
    readOnly?: boolean;
    value?: any;
    description?: string;
    labelWidth?: string | number;
    labelBold?: boolean
    setValue?: (value: any) => void
    pattern?: RegisterOptions<T>['pattern']
    onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void
    borderColor?: string
    rounded?: string
};


export function CustomInput<T extends FieldValues>({
    name,
    control,
    rules,
    label,
    placeholder,
    disabled,
    fieldProps,
    trimOnBlur,
    required,
    type = 'text',
    inputProps,
    height = '50px',
    width,
    readOnly,
    value,
    setValue,
    pattern,
    orientation = 'vertical', onKeyDown, rounded
}: InputProps<T>) {
    const { field, fieldState, } = useController({
        name, control, rules: {
            ...rules,
            required: required ? `${label ?? name} is required` : false,
            pattern: pattern
        },
    });
    return (
        <Field.Root orientation={orientation} justifyContent={'start'} invalid={!!fieldState.error} {...fieldProps}>
            {label && <Box>
                <Field.Label>
                    {label}{label && required && '*'}
                </Field.Label>
            </Box>}
            <Input
                {...inputProps}
                type={type}
                name={field.name}
                ref={field.ref}
                value={field.value ?? value}
                onClick={(e: React.MouseEvent<HTMLInputElement>) => {
                    e.currentTarget.showPicker()
                }}
                onChange={(e) => {
                    field.onChange(e.target.value);
                    setValue && setValue?.(e.target.value)
                }}
                onBlur={(e) => {
                    if (trimOnBlur) {
                        const v = (e.target.value ?? '').trim();
                        if (v !== field.value) field.onChange(v);
                    }
                    field.onBlur();
                }}
                onKeyDown={onKeyDown}
                disabled={disabled}
                placeholder={placeholder}
                color={'black'}
                bg={readOnly ? '#F9FAFB' : 'white'}
                p={3}
                h={height}
                w={width}
                border={'2px solid #545F7D26'}
                rounded={rounded ?? '5px'}
                readOnly={readOnly}
                fontSize={"14px"}
                _active={{
                    border: 'none',
                }}
                _focus={{
                    border: '2px solid #545F7D26'
                }}
            />
            {fieldState.error?.message && <Field.ErrorText>{fieldState.error.message}</Field.ErrorText>}
        </Field.Root>
    );
}
