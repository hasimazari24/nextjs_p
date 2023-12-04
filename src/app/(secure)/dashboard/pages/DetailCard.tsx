"use client";
import { ChevronDownIcon } from "@chakra-ui/icons";
import {
  Popover,
  PopoverTrigger,
  Button,
  PopoverContent,
  PopoverArrow,
  PopoverCloseButton,
  PopoverHeader,
  PopoverBody,
  SimpleGrid,
  Flex,
  Text,
  VStack,
  Box,
} from "@chakra-ui/react";
import React, { ReactNode } from "react";

const DetailCard = ({
  title,
  btnColor,
  content,
  cols,
}: {
  title: string;
  btnColor: { bcolor: string; bhover: string };
  content: { icon: ReactNode; title_heading: string; title_content: string }[];
  cols: Record<string, number>;
}) => {
  return (
    <Popover isLazy>
      <PopoverTrigger>
        <Button
          fontWeight={"normal"}
          borderTopRadius={"none"}
          borderBottomRadius={"lg"}
          w="full"
          color={"white"}
          bgColor={btnColor.bcolor}
          _hover={{ bgColor: btnColor.bhover }}
        >
          View Details&nbsp;
          <ChevronDownIcon fontSize={"19px"} />
        </Button>
      </PopoverTrigger>
      <PopoverContent _focus={{ boxShadown: "none" }} w={"fit-content"} pb={2}>
        <PopoverArrow />
        <PopoverCloseButton />
        <PopoverHeader fontWeight="bold">{title}</PopoverHeader>
        <PopoverBody w="full">
          <SimpleGrid
            spacing={2}
            columns={cols}
            // ml="-0.5"
            maxH={{ base: "250px", md: "195px" }}
            overflowY={"auto"}
            css={{
              // For Chrome
              "&::-webkit-scrollbar": {
                width: "4px",
              },
              "&::-webkit-scrollbar-track": {
                background: "#E2E8F0",
              },
              "&::-webkit-scrollbar-thumb": {
                background: "#A0AEC0",
                borderRadius: "4px",
              },
              // For Firefox
              scrollbarColor: "#A0AEC0",
              scrollbarWidth: "thin",
            }}
            pr="1"
          >
            {content.map((d, index) => (
              <Flex
                p={{ base: 2, md: 4 }}
                h="full"
                flexDirection={"row"}
                shadow={"lg"}
                border={"1px solid"}
                backgroundColor={"gray.50"}
                borderColor={"gray.200"}
                rounded={"md"}
                key={index}
              >
                <Box
                  my={"auto"}
                  pr="3"
                  alignContent={"center"}
                  color={"gray.500"}
                >
                  {d.icon}
                </Box>
                <VStack spacing={0} align={"start"}>
                  <Text fontSize={"md"} color={"gray.500"}>
                    {d.title_heading}
                  </Text>
                  <Text
                    fontSize={{ base: "lg", md: "xl" }}
                    fontWeight={"bold"}
                    mt="-5px"
                  >
                    {d.title_content}
                  </Text>
                </VStack>
              </Flex>
            ))}
          </SimpleGrid>
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
};

export default DetailCard;
