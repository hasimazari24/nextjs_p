import * as React from "react";
import { VStack, Stack, HStack, Text, Icon, Link, Tag, useBreakpointValue, Flex, Box } from "@chakra-ui/react";
import { ReactElement } from "react";
import { AiOutlineGlobal, AiOutlineLink } from "react-icons/ai";
import { IconType } from "react-icons";



interface SocialInfoProps {
    icon: IconType;
    title: string;
    content: string;
    label: string;
    size?: number;
    href? : string;
}

const SocialInfo = ({icon, title, href, content, label, size = 24}: SocialInfoProps) => {

    const contentStyles = {
        overflow: "hidden",
        whiteSpace: "nowrap" as any, // Mengonversi string menjadi tipe WhiteSpace
        textOverflow: "ellipsis",
        maxWidth: "150px", // Atur lebar maksimum sesuai kebutuhan
    };

    return (
        <HStack
        spacing={["4","6"]} align={"center"}>
            <Icon as= {icon} fontSize={size} pt={"1px"} color={"white"}/>
            <VStack align={"start"} spacing={"5px"} color={"white"}>
                <Text fontSize="xl" fontWeight={"bold"}>
                    {title}
                </Text>
                <HStack spacing={2}>
                <Link href={href} color={"blue.400"}>
                    <Text fontSize="md" fontWeight={"regular"} style={contentStyles}>
                        {content}
                    </Text>
                </Link>
                <Icon as={AiOutlineLink} color="blue.400" boxSize={4} />
                </HStack>
            </VStack>
        </HStack>

    );
};

export default SocialInfo;