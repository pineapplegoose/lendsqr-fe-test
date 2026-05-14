import { Flex, Image, Span, Text } from "@chakra-ui/react"

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
        <Flex gap={4} w={{ base: "auto", md: "full" }} h={"160px"} maxH={"400px"} justify="start">
            {data.map((item, index) => (
                <Flex
                    key={index}
                    direction={'column'}
                    px={6}
                    py={6}
                    w={"full"}
                    minW={'240px'}
                    justify={'center'}
                    bg={'white'}
                    h={"full"}
                    rounded={"4px"}
                    border={'1px solid #213F7D0F'}
                >
                    <Image src={item.icon} boxSize={'40px'} alt={item.title} />
                    <Text color={"#545F7D"} mt={'10px'} fontWeight={'medium'} fontSize={'14px'} textTransform={'uppercase'} >{item.title}</Text>
                    <Text fontSize={"24px"} color={'#213F7D'} fontWeight={'bold'} >
                        {item.data.toString().padStart(2, '0')}
                    </Text>
                </Flex>
            ))}
        </Flex>
    )
}
