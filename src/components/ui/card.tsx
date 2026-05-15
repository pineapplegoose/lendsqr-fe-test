import { Grid, Image, Text } from "@chakra-ui/react"

export interface CardData {
    title: string
    data: string | number
    icon?: string
}

interface CardProps {
    data: CardData[]
}

export const DashboardCard = ({ data }: CardProps) => {
    return (
        <Grid
            templateColumns={{ base: '1fr 1fr', lg: 'repeat(4, 1fr)' }}
            gap={4}
            w="full"
            backgroundColor={'transparent'}
            mb={8}
        >
            {data.map((item, index) => (
                <Grid
                    key={index}
                    templateRows="auto auto auto"
                    px={{ base: 4, md: 6 }}
                    py={{ base: 4, md: 6 }}
                    bg="white"
                    rounded="4px"
                    boxShadow="3px 5px 20px 0px #0000000a"
                    border="1px solid #213F7D0F"
                >
                    <Image src={item.icon} boxSize="40px" alt={item.title} />
                    <Text color="#545F7D" mt="10px" fontWeight="medium" fontSize={{ base: '11px', md: '14px' }} textTransform="uppercase">
                        {item.title}
                    </Text>
                    <Text fontSize={{ base: '20px', md: '24px' }} color="#213F7D" fontWeight="bold">
                        {item.data.toString().padStart(2, '0')}
                    </Text>
                </Grid>
            ))}
        </Grid>
    )
}
