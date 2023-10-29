import * as React from "react";
import { VStack, Stack, HStack, Text, Icon, Link, Tag, useBreakpointValue, Flex, Box } from "@chakra-ui/react";
import { ReactElement } from "react";
import { IconType } from "react-icons";
import { ExternalLinkIcon } from "@chakra-ui/icons";



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
        whiteSpace: "nowrap" as any, // Convert string dadi tipe WhiteSpace
        textOverflow: "ellipsis",
        // maxWidth: "150px", // Jembar e tulisan
        fontSize : "md",
        fontWeight: "regular",
    };

    return (
      <HStack spacing={["4", "6"]} align={"center"}>
        <Icon as={icon} fontSize={size} pt={"1px"} color={"black"} />
        <VStack
          align={"start"}
          spacing={"0"}
          color={"black"}
          overflow={"hidden"}
          //   alignSelf={"stretch"}
          w={{ base: "auto", sm: "230px", md: "auto" }}
        >
          <Text fontSize={["lg", "xl"]} fontWeight={"bold"}>
            {title}
          </Text>

          <Link href={href} color={"blue.400"} isExternal>
            <HStack spacing={2}>
              <Text
                overflow={"hidden"}
                whiteSpace={"nowrap"}
                textOverflow="ellipsis"
                fontSize={"md"}
                fontWeight={"reguler"}
                maxW={{ base: "200px", md: "150px" }}
                // style={contentStyles}
              >
                {content}
              </Text>
              <ExternalLinkIcon mx="2px" />
            </HStack>
          </Link>
        </VStack>
      </HStack>
    );
};

export default SocialInfo;