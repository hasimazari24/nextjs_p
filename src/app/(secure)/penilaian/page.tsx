"use client";
import {
  Box,
  Flex,
  Grid,
  Heading,
  Stack,
  Text,
  Image,
  SimpleGrid,
  Center,
} from "@chakra-ui/react";
import dynamic from "next/dynamic";
import React from "react";
import Loading from "./loading";

function PagePenilaian() {
  return (
    <Stack spacing={{ base: 4, md: 6 }}>
      <Flex
        justifyContent={"space-between"}
        pb="2"
        direction={["column", "row"]}
      >
        <Heading fontSize={"2xl"}>DATA PENILAIAN</Heading>
      </Flex>
      <Center>
        <SimpleGrid
          // templateColumns={{
          //   base: "1fr",
          //   sm: "1fr 1fr",
          //   xl: "1fr 1fr 1fr",
          //   //   xl: "1fr 1fr 1fr",
          // }}
          columns={{ base: 1, sm: 2, xl: 3 }}
          alignItems={"center"}
          justifyItems={"center"}
          // maxW="700px"
          w="fit-content"
          spacing={{ base: 6, sm: 8, lg: 10 }}
        >
          <Stack
            alignItems={"center"}
            justifyContent={"center"}
            spacing={3}
            maxW={{
              base: "17rem",
              sm: "15rem",
              md: "17rem",
              xl: "19rem",
            }}
            w="full"
            h="full"
            p={6}
            boxShadow={"lg"}
            rounded={"2xl"}
            bgColor={"gray.50"}
          >
            <Box>
              <Image
                maxW={{
                  base: "13rem",
                  sm: "9rem",
                  md: "11rem",
                  lg: "13rem",
                  xl: "15rem",
                }}
                objectFit={"cover"}
                src={"/img/class-avatar.png"}
                alt="#"
              />
            </Box>
            <Text
              as="b"
              fontWeight={"bold"}
              fontSize={{ base: "lg", md: "xl" }}
              textAlign={"center"}
            >
              NILAI TENANT
            </Text>
            <Text
              // as="b"
              // fontWeight={"bold"}
              fontSize={{ base: "md", md: "lg" }}
              textAlign={"center"}
            >
              Penilaian Mentor terhadap Tenant.
            </Text>
          </Stack>

          <Stack
            alignItems={"center"}
            spacing={3}
            maxW={{
              base: "17rem",
              sm: "15rem",
              md: "17rem",
              xl: "19rem",
            }}
            h="full"
            p={6}
            boxShadow={"lg"}
            rounded={"2xl"}
            bgColor={"gray.50"}
          >
            <Box>
              <Image
                maxW={{
                  base: "13rem",
                  sm: "9rem",
                  md: "11rem",
                  lg: "13rem",
                  xl: "15rem",
                }}
                objectFit={"cover"}
                src={"/img/class-avatar.png"}
                alt="#"
              />
            </Box>
            <Text
              as="b"
              fontWeight={"bold"}
              fontSize={{ base: "lg", md: "xl" }}
              textAlign={"center"}
            >
              NILAI TUGAS TENANT
            </Text>
            <Text
              // as="b"
              // fontWeight={"bold"}
              fontSize={{ base: "md", md: "lg" }}
              textAlign={"center"}
            >
              Penilaian Tugas Tenant dari Kelas.
            </Text>
          </Stack>
          <Stack
            alignItems={"center"}
            spacing={3}
            maxW={{
              base: "17rem",
              sm: "15rem",
              md: "17rem",
              xl: "19rem",
            }}
            h="full"
            p={6}
            boxShadow={"lg"}
            rounded={"2xl"}
            bgColor={"gray.50"}
          >
            <Box>
              <Image
                maxW={{
                  base: "13rem",
                  sm: "9rem",
                  md: "11rem",
                  lg: "13rem",
                  xl: "15rem",
                }}
                objectFit={"cover"}
                src={"/img/class-avatar.png"}
                alt="#"
              />
            </Box>
            <Text
              as="b"
              fontWeight={"bold"}
              fontSize={{ base: "lg", md: "xl" }}
              textAlign={"center"}
            >
              NILAI MENTOR
            </Text>
            <Text
              // as="b"
              // fontWeight={"bold"}
              fontSize={{ base: "md", md: "lg" }}
              textAlign={"center"}
            >
              Penilaian Tenant terhadap Mentor.
            </Text>
          </Stack>
        </SimpleGrid>
      </Center>
    </Stack>
  );
}

export default dynamic(() => Promise.resolve(PagePenilaian), {
  ssr: false,
  // suspense: true,
  loading: () => <Loading />,
});
