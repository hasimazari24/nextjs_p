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
} from "react-icons/fa"; //

const AwardTenant = () => {
  const MotionSimpleGrid = motion(SimpleGrid);
  const MotionBox = motion(Box);

  return (
    <>
      <Stack spacing={4}>
        <Text
          fontWeight="bold"
          color="gray.900"
          fontSize={["20px", "2xl", "3xl"]}
          // fontSize={["xl", "2xl", "3xl"]}
        >
          Prestasi
        </Text>
        <Stack
          spacing={8}
          flexDirection={"row"}
          flexWrap={"wrap"}
          alignItems={"space-between"}
          justifyContent={"space-between"}
        >
          <Box
            w="250px"
            h="full"
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
                  height={"200px"}
                  width={"200px"}
                  objectFit={"cover"}
                  src="/img/avatar-default.jpg"
                  alt="#"
                  boxShadow={"xl"}
                  mb={6}
                />
                <Text
                  as="b"
                  fontWeight={"bold"}
                  fontSize={["lg", "xl", "2xl"]}
                  whiteSpace="nowrap" // Convert string dadi tipe WhiteSpace
                  textOverflow="ellipsis"
                  maxW="190px"
                  cursor={"pointer"}
                  title="jan lupaa tambahi nyuk"
                >
                  Juara 1
                </Text>
                <Text
                  align="center"
                  fontSize={"md"} // Convert string dadi tipe WhiteSpace
                  textOverflow="ellipsis"
                  overflow={"hidden"}
                  maxW="190px"
                  cursor={"pointer"}
                  title="jan lupaa tambahi nyuk"
                  noOfLines={2}
                >
                  Best Performance Tenant Award 2023 sdyfghjsadhfksadhfkj sdfkjshdkfjhsd jdfjasgdksa
                </Text>
              </Stack>
            </Center>
          </Box>
        </Stack>
      </Stack>
    </>
  );
};

export default AwardTenant;
