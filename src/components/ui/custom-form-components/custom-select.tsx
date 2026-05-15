import * as React from 'react';
import { type Control, type FieldPath, type FieldValues, Controller } from 'react-hook-form';
import { Field, Select, Portal, Text, useSelectContext, Flex, type SelectRootProps, Icon, HStack } from '@chakra-ui/react';
import { Avatar } from '@/components/ui/avatar';

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

export type Option = { label: string; value: string, description?: string } & Record<string, any>;

type CustomSelectProps<T extends FieldValues> = BaseProps<T> & {
    collection: any;
    isLoading?: boolean;
    multiple?: boolean;
    arrayValue?: boolean;
    renderItem?: (item: Option) => React.ReactNode;
    triggerHeight?: string;
    errorTextFallback?: string;
    avatar?: boolean;
    value?: any;
    labelBold?: boolean
    labelWidth?: string | number;
    icon?: React.ElementType
    alignCenter?: boolean
    size?: SelectRootProps['size']
    borderColor?: string
    onChange?: (value?: any) => void
};
export function CustomSelect<T extends FieldValues>({
    name,
    control,
    label,
    collection,
    placeholder,
    isLoading = false,
    multiple = false,
    arrayValue = true,
    disabled = false,
    renderItem,
    triggerHeight = '40px',
    fieldProps,
    errorTextFallback,
    alignCenter,
    readOnly,
    width,
    required,
    orientation = 'vertical',
    avatar,
    size,
    bg = 'white',
    value,
    icon,
    borderColor,
    onChange
}: CustomSelectProps<T>) {
    const SelectValue = () => {
        const select = useSelectContext();
        const items = select.selectedItems as Array<{
            label: string;
            avatar: string;
            name: string;
            image: string;
        }>;

        const [selectedItems, setSelectedItems] = React.useState<
            Array<{ label: string; avatar: string; name: string; image: string }>
        >([]);

        React.useEffect(() => {
            if (items) {
                setSelectedItems(items);
            }
        }, [items]);

        if (!items || items.length === 0) {
            return (
                <Select.ValueText
                    fontSize="14px"
                    placeholder={placeholder}
                    p={2}
                    _placeholder={{ color: "#667085" }}
                    color="#101828"
                >
                    {placeholder}
                </Select.ValueText>
            );
        }

        return (
            <Flex gap={2} h={'fit'} wrap="wrap" p={2}>
                {selectedItems.map((item, index) => (
                    <Flex
                        key={index}
                        align="center"
                        border={'1px solid #D0D5DD'}
                        borderRadius="md"
                        p="4px 8px"
                    >
                        <Avatar className='size-6' src={item.avatar || item.image} name={item.label || item.name} />
                        <Text ml={2} fontWeight={'medium'} fontSize="14px">
                            {item.label || item.name}
                        </Text>
                    </Flex>
                ))}
            </Flex>
        );
    };

    return (
        <Controller
            name={name}
            control={control}
            rules={{ required: required ? `${label ?? name} is required` : false }}
            render={({ field, fieldState }) => {
                const errorMsg = (fieldState.error?.message as string | undefined) ?? errorTextFallback;

                const currentValue = field.value ?? [value];

                const valueForSelect = multiple
                    ? (currentValue ?? [])
                    : arrayValue
                        ? (currentValue ?? [])
                        : [currentValue ?? ''];

                return (
                    <Field.Root orientation={orientation} justifyContent={'start'} invalid={!!fieldState.error} {...fieldProps}>

                        <Field.Label
                        >{label}
                        </Field.Label>

                        <Select.Root
                            multiple={multiple}
                            collection={collection}
                            name={field.name}
                            value={valueForSelect}
                            border={borderColor ? '1px solid ' + borderColor : '1px solid #213F7D33'}
                            rounded={'md'}
                            width={width}
                            disabled={disabled}
                            readOnly={readOnly}
                            color={'black'}
                            _focus={{ border: '1px solid #213F7D33' }}
                            _active={{ border: '1px solid #213F7D33' }}
                            bg={bg}
                            size={size}
                            onInteractOutside={() => field.onBlur()}
                            onValueChange={(event) => {
                                if (multiple) {
                                    field.onChange(event.value);

                                } else {
                                    const v = event.value[0] ?? '';
                                    field.onChange(arrayValue ? [v] : v);
                                    onChange?.(arrayValue ? [v] : v);
                                }
                            }}
                        >
                            {multiple && <Select.HiddenSelect />}
                            <Select.Control >
                                <HStack>
                                    <Select.Trigger border={'none'} rounded={'md'} h={avatar ? 'fit' : triggerHeight}>
                                        {icon && <Icon color='fg.muted' size='xs' as={icon} />}
                                        {isLoading ? (
                                            <Text>Loading...</Text>
                                        ) : (
                                            avatar ? <SelectValue /> : <Select.ValueText p={icon ? 1 : 2} mr={4} textAlign={alignCenter ? 'center' : 'start'} w={'full'} placeholder={placeholder} fontSize={'14px'} _placeholder={{ color: '#545F7D99' }} color={'#545F7D99'} />
                                        )}
                                    </Select.Trigger>
                                    <Select.IndicatorGroup>
                                        <Select.Indicator />
                                    </Select.IndicatorGroup></HStack>
                            </Select.Control>

                            <Portal >
                                <Select.Positioner w={width} >
                                    <Select.Content p={2} w={'96%'} zIndex='9999' bg='white'>
                                        {(collection.items ?? []).map((item: Option) => (
                                            <Select.Item
                                                justifyContent={'start'}
                                                item={item as any}
                                                key={item.value ?? item.label ?? item.title ?? item.name}
                                                p={1}
                                                mb={1}
                                                w={'full'}
                                                _hover={{ bg: '#213F7D0F' }}
                                                color='#101828'
                                            >
                                                {avatar &&
                                                    <Avatar
                                                        name={item.label || item.title || item.name}
                                                        src={item.avatar || item.image}
                                                        size='xs'
                                                    />
                                                }
                                                {renderItem ? renderItem(item) : item.label || item.title || item.name}
                                                <Select.ItemIndicator />
                                            </Select.Item>
                                        ))}
                                    </Select.Content>
                                </Select.Positioner>
                            </Portal>
                        </Select.Root>
                        {errorMsg && <Field.ErrorText>{errorMsg}</Field.ErrorText>}
                    </Field.Root>

                );
            }}
        />
    );
}
