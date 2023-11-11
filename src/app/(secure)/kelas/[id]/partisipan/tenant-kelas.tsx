import React from "react";
import {
  Avatar,
  Box,
  Button,
  Flex,
  Grid,
  HStack,
  Icon,
  Input,
  InputGroup,
  InputLeftElement,
  Spacer,
  Stack,
  Text,
  VStack,
  Image,
} from "@chakra-ui/react";
import { DeleteIcon, Search2Icon, SearchIcon } from "@chakra-ui/icons";

import { IoSearchSharp } from "react-icons/io5";
import { BiDoorOpen, BiPlus } from "react-icons/bi";
import { GrMoreVertical } from "react-icons/gr";
import data from "../../../dashboard/data";

interface TenantKelasProps {
  logo?: string;
  nama?: string;
}

const TenantKelas = ({ logo, nama }: TenantKelasProps) => {
  return (
    <Stack spacing={{ base: 6, md: 8 }}>
      <Flex
        flexDirection={{ base: "column", sm: "row" }} // Arah tata letak berdasarkan layar
        justify="space-between" // Menyusun komponen pertama di kiri dan kedua di kanan
        // align={"flex-start"} // Untuk pusatkan vertikal pada mode mobile
      >
        <VStack spacing={0} align="flex-start" mr={2}>
          <Text fontWeight={"bold"} fontSize={["lg", "xl"]}>
            Partisipan Kelas
          </Text>
          <Text fontWeight="medium">Total :10 Partisipan</Text>
        </VStack>
        <HStack spacing={2} align="start">
          {/* jika butuh btn kembali, ada disinii */}

          {/* <Button
            leftIcon={<MdArrowBackIosNew />}
            colorScheme="blue"
            variant="outline"
            size={"sm"}
            mb={6}
          >
            Kembali
          </Button> */}
          <Button
            leftIcon={<BiPlus />}
            colorScheme="green"
            variant="solid"
            size={"sm"}
            mb={6}
          >
            Tambah Partisipan
          </Button>
          <Stack spacing={4}>
            <Spacer />
          </Stack>
        </HStack>
      </Flex>
      {/* konten disinii (daftar participant) */}
      <Box>
        <Stack spacing={4}>
          <InputGroup>
            <InputLeftElement pointerEvents="none">
              <Button
                // pl="1rem"

                justifyContent="center"
                leftIcon={<SearchIcon />}
                bgColor="blue.500"
                rounded="none"
              ></Button>
            </InputLeftElement>
            <Input
              maxW={60}
              pl="3rem"
              // key={option.key}
              type="text"
              placeholder={`Cari Nama Kelas`}
              // onChange={(e) => setFilter(option.key, e.target.value)}
              // onChange={(e) => {
              // //   setQueryName(e.target.value);
              // //   setCurrentPage(0);
              // }}
              mb="2"
            />
          </InputGroup>

          <Grid
            templateColumns={{
              base: "1fr",
              sm: "1fr 1fr",
              lg: "1fr 1fr 1fr",
              xl: "1fr 1fr 1fr 1fr",
            }}
            // templateColumns={["1fr 1fr", "1fr 1fr 1fr", "1fr 1fr 1fr 1fr"]}
            // flexWrap={"wrap"}
            alignItems={"center"}
            justifyItems={"center"}
            gap={{ base: 8, sm: 6, lg: 8 }}
            mb={2}
          >
            {[1, 2, 3, 4, 5, 6].map((d, index) => (
              <Stack
                // direction={"column"}
                alignItems={"center"}
                spacing={3}
                w="full"
                h="full"
                p={6}
                boxShadow={"lg"}
                rounded={"2xl"}
                bgColor={"gray.50"}
                key={index}
                // display="flex"
              >
                <Box
                // p={{ base: 4, sm: 2, lg: 4 }}
                >
                  <Image
                    maxW={{
                      base: "13rem",
                      sm: "9rem",
                      md: "10rem",
                      // lg: "11rem",
                      xl: "13rem",
                    }}
                    objectFit={"cover"}
                    src={"/img/class-avatar.png"}
                    alt="#"
                    // boxShadow={"xl"}
                  />
                </Box>

                <Text
                  as="b"
                  fontWeight={"bold"}
                  fontSize={{ base: "16px", md: "17px" }}
                  textOverflow="ellipsis"
                  // maxW={{
                  //   base: "auto",
                  //   sm: "340px",
                  //   md: "408px",
                  //   lg: "544px",
                  // }}
                  // w="auto"
                  // whiteSpace="nowrap"
                  flex="1"
                  cursor={"default"}
                  overflow="hidden"
                  // title={data.name}
                  noOfLines={2}
                >
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Dolorum aut dolor atque tempore laborum iste neque quasi
                  consequatur, aliquid enim?
                </Text>

                <Stack spacing={2} direction={"row"} w="full">
                  <Button
                    bgColor="teal.200"
                    _hover={{
                      bg: "teal.100",
                    }}
                    // color="white"
                    w="full"
                    size={"sm"}
                    alignContent={"center"}
                    // onClick={() => router.push(`/kelas/24df32`)}
                  >
                    <BiDoorOpen size="20px" />
                    &nbsp;Progress
                  </Button>
                  <Button
                    title="Hapus Data"
                    colorScheme="red"
                    // onClick={() => setIsDeleteModalOpen(true)}
                    key="hapusData"
                    size="sm"
                  >
                    <DeleteIcon />
                  </Button>
                </Stack>
              </Stack>
            ))}
          </Grid>
        </Stack>
      </Box>
    </Stack>
  );
};

export default TenantKelas;
