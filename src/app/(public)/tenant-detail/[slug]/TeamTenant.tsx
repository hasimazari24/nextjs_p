"use client";
import * as React from "react";
import {
  Box,
  Text,
  Flex,
  HStack,
  Stack,
  VStack,
  Icon,
  Button,
  Spacer,
  Tag,
  SimpleGrid,
  Center,
  Image,
  Heading,
  IconButton,
} from "@chakra-ui/react";
import ContactInfo from "./ContactTenant";
import { motion } from "framer-motion";
import {
  FaFacebook,
  FaInstagram,
  FaTwitter,
  FaYoutube,
  FaLinkedin,
  FaGlobe,
} from "react-icons/fa";//

const TeamTenant = () => {
    const MotionSimpleGrid = motion(SimpleGrid);
    const MotionBox = motion(Box);

    const name: string = "Muhammad Alexandre Potter Azari";

  return (
    <>
      <Stack spacing={4}>
        <Text
          fontWeight="bold"
          color="gray.900"
          fontSize={["20px", "2xl", "3xl"]}
          // fontSize={["xl", "2xl", "3xl"]}
        >
          Team
        </Text>
        <Stack
          spacing={8}
          flexDirection={"row"}
          flexWrap={"wrap"}
          alignItems={"space-between"}
          justifyContent={"space-between"}
        >
          <Box
            w="340px"
            h="432px"
            role={"group"}
            p={8}
            boxShadow={"lg"}
            rounded={"2xl"}
            bgColor={"gray.50"}
          >
            <Center>
              <Stack direction={"column"} alignItems={"center"} spacing={1}>
                <Image
                  rounded={"3xl"}
                  height={"250px"}
                  width={"250px"}
                  objectFit={"cover"}
                  src="/img/avatar-default.jpg"
                  alt="#"
                  boxShadow={"xl"}
                  mb={6}
                />
                <Text fontSize={"md"}>Executive Officer</Text>
                <Text
                  as="b"
                  fontWeight={"bold"}
                  fontSize={["lg", "xl", "2xl"]}
                  overflow="hidden"
                  whiteSpace="nowrap" // Convert string dadi tipe WhiteSpace
                  textOverflow="ellipsis"
                  maxW="300px"
                  cursor={"pointer"}
                  title="Muhammad Alexandre Potter Azari"
                >
                  Muhammad Alexandre Potter Azari
                </Text>
                <HStack spacing={3} pt="2px">
                  <IconButton
                    color="blue.300"
                    aria-label="web"
                    size="sm"
                    icon={<FaGlobe size="sm" />}
                    _hover={{
                      color: "blue.500", // Ganti dengan warna saat hover
                    }}
                    title={""}
                    backgroundColor="rgba(0, 0, 0, 0)"
                  />

                  <IconButton
                    color="blue.600"
                    aria-label="web"
                    icon={<FaFacebook size="sm" />}
                    size="sm"
                    title={""}
                    _hover={{
                      color: "blue.900", // Ganti dengan warna saat hover
                    }}
                    backgroundColor="rgba(0, 0, 0, 0)"
                  />

                  <IconButton
                    color="pink.500"
                    aria-label="web"
                    icon={<FaInstagram size="sm" />}
                    size="sm"
                    title={""}
                    _hover={{
                      color: "pink.700",
                    }}
                    backgroundColor="rgba(0, 0, 0, 0)"
                  />
                </HStack>
              </Stack>
            </Center>
          </Box>
        </Stack>
      </Stack>
    </>
  );
};

export default TeamTenant;
